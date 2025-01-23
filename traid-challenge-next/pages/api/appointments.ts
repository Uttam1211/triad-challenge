import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const NHS_NUMBER = "1234567890"; // Hardcoded for now

const RescheduleSchema = z.object({
  newSlotId: z.number({
    required_error: "New slot ID is required",
    invalid_type_error: "New slot ID must be a number",
  }),
});

const CreateAppointmentSchema = z.object({
  slotId: z.number({
    required_error: "Slot ID is required",
    invalid_type_error: "Slot ID must be a number",
  }),
  notes: z.string().optional(),
  gpId: z.number({
    required_error: "GP ID is required",
    invalid_type_error: "GP ID must be a number",
  }),
});

async function handlePost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const result = CreateAppointmentSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid request data",
        errors: result.error.flatten(),
      });
    }

    const { slotId, notes, gpId } = result.data;

    // Check if slot exists and is available
    const slot = await prisma.freeSlot.findFirst({
      where: {
        id: slotId,
        isBooked: false,
        startTime: {
          gte: new Date(), // Only future slots
        },
      },
    });

    if (!slot) {
      return res
        .status(400)
        .json({ message: "This slot is no longer available" });
    }

    const user = await prisma.user.findUnique({
      where: { nhsNumber: NHS_NUMBER },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if user already has an appointment at this time
    const userExistingAppointment = await prisma.appointment.findFirst({
      where: {
        userId: user.id,
        freeSlot: {
          startTime: slot.startTime,
          endTime: slot.endTime,
        },
        status: {
          in: ["SCHEDULED", "RESCHEDULED"],
        },
      },
    });

    if (userExistingAppointment) {
      return res
        .status(400)
        .json({ message: "You already have an appointment at this time" });
    }

    // Check for any existing cancelled appointment for this slot
    const cancelledAppointment = await prisma.appointment.findFirst({
      where: {
        freeSlotId: slotId,
        status: "CANCELLED",
      },
      orderBy: {
        updatedAt: "desc",
      },
    });

    // Use transaction to ensure data consistency
    const appointment = await prisma.$transaction(async (tx) => {
      // If there's a cancelled appointment, update it with new user data
      if (cancelledAppointment) {
        return tx.appointment.update({
          where: { id: cancelledAppointment.id },
          data: {
            userId: user.id,
            gpId,
            notes,
            status: "SCHEDULED",
            updatedAt: new Date(),
          },
          include: {
            gp: true,
            freeSlot: true,
          },
        });
      }

      // If no cancelled appointment exists, create a new one
      return tx.appointment.create({
        data: {
          userId: user.id,
          gpId,
          freeSlotId: slotId,
          notes,
          status: "SCHEDULED",
        },
        include: {
          gp: true,
          freeSlot: true,
        },
      });
    });

    // Mark slot as booked
    await prisma.freeSlot.update({
      where: { id: slotId },
      data: { isBooked: true },
    });

    return res.status(200).json(appointment);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error creating appointment:", error.message);
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Failed to create appointment" });
  }
}

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await prisma.user.findUnique({
      where: { nhsNumber: NHS_NUMBER },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: user.id,
        status: "SCHEDULED",
      },
      include: {
        gp: true,
        freeSlot: true,
      },
      orderBy: {
        freeSlot: {
          startTime: "asc",
        },
      },
    });

    return res.status(200).json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return res.status(500).json({ message: "Failed to fetch appointments" });
  }
}

async function handleDelete(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    if (!id)
      return res.status(400).json({ message: "Appointment ID is required" });

    // Use transaction to ensure both operations succeed or fail together
    await prisma.$transaction(async (tx) => {
      const appointment = await tx.appointment.findUnique({
        where: { id: Number(id) },
        include: { freeSlot: true },
      });

      if (!appointment) {
        throw new Error("Appointment not found");
      }

      // Release the slot first
      await tx.freeSlot.update({
        where: { id: appointment.freeSlotId },
        data: { isBooked: false },
      });

      // Then cancel the appointment
      await tx.appointment.update({
        where: { id: Number(id) },
        data: { status: "CANCELLED" },
      });
    });

    return res
      .status(200)
      .json({ message: "Appointment cancelled successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error cancelling appointment:", error.message);
      return res.status(500).json({ message: error.message });
    }
    return res.status(500).json({ message: "Failed to cancel appointment" });
  }
}

async function handlePatch(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { id } = req.query;
    if (!id)
      return res.status(400).json({ message: "Appointment ID is required" });

    // Validate request body
    const result = RescheduleSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        message: "Invalid request data",
        errors: result.error.flatten(),
      });
    }

    const { newSlotId } = result.data;

    // Check if new slot is available
    const newSlot = await prisma.freeSlot.findUnique({
      where: { id: newSlotId },
    });

    if (!newSlot || newSlot.isBooked) {
      return res
        .status(400)
        .json({ message: "Selected slot is not available" });
    }

    // Use transaction to ensure data consistency
    const updatedAppointment = await prisma.$transaction(async (tx) => {
      const appointment = await tx.appointment.findUnique({
        where: { id: Number(id) },
        include: { freeSlot: true },
      });

      if (!appointment) {
        throw new Error("Appointment not found");
      }

      // Release old slot
      await tx.freeSlot.update({
        where: { id: appointment.freeSlotId },
        data: { isBooked: false },
      });

      // Book new slot
      await tx.freeSlot.update({
        where: { id: newSlotId },
        data: { isBooked: true },
      });

      // Update appointment with new slot
      return tx.appointment.update({
        where: { id: Number(id) },
        data: {
          freeSlotId: newSlotId,
          status: "RESCHEDULED",
        },
        include: {
          gp: true,
          freeSlot: true,
        },
      });
    });

    return res.status(200).json(updatedAppointment);
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error rescheduling appointment:", error.message);
      return res.status(500).json({ message: error.message });
    }
    return res
      .status(500)
      .json({ message: "Failed to reschedule appointment" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    case "POST":
      return handlePost(req, res);
    case "DELETE":
      return handleDelete(req, res);
    case "PATCH":
      return handlePatch(req, res);
    default:
      res.setHeader("Allow", ["GET", "POST", "DELETE", "PATCH"]);
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }
}
