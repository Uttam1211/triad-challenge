import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/lib/prisma";
import { startOfDay, endOfDay } from "date-fns";

async function handleGet(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { date, gpId } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date is required" });
    }

    const whereClause = {
      isBooked: false,
      startTime: {
        gte: startOfDay(new Date(date as string)),
        lte: endOfDay(new Date(date as string)),
      },
      ...(gpId && { gpId: Number(gpId) }),
    };

    const slots = await prisma.freeSlot.findMany({
      where: whereClause,
      include: {
        gp: true,
      },
      orderBy: {
        startTime: "asc",
      },
    });

    // Group slots by GP
    const groupedSlots = slots.reduce((acc, slot) => {
      const gpId = slot.gp.id;
      if (!acc[gpId]) {
        acc[gpId] = {
          gp: slot.gp,
          slots: [],
          count: 0,
        };
      }
      acc[gpId].slots.push(slot);
      acc[gpId].count++;
      return acc;
    }, {} as Record<number, { gp: any; slots: any[]; count: number }>);

    return res.status(200).json(Object.values(groupedSlots));
  } catch (error) {
    console.error("Error fetching available slots:", error);
    return res.status(500).json({ message: "Failed to fetch available slots" });
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      return handleGet(req, res);
    default:
      res.setHeader("Allow", ["GET"]);
      return res
        .status(405)
        .json({ message: `Method ${req.method} not allowed` });
  }
}
