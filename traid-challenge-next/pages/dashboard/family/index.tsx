import { motion } from "framer-motion";
import { ChevronRight, Users, UserPlus, AlertCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { DashboardLayout } from "../../../components/layouts/DashboardLayout";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Breadcrumbs } from "@/components/Breadcrumbs";

interface FamilyMember {
  id: string;
  name: string;
  relationship: string;
  status: "pending" | "approved" | "rejected";
  nhsNumber: string;
}

const FamilyMembersPage = () => {
  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      relationship: "Spouse",
      status: "approved",
      nhsNumber: "123 456 7890",
    },
    {
      id: "2",
      name: "Tommy Johnson",
      relationship: "Child",
      status: "pending",
      nhsNumber: "234 567 8901",
    },
  ]);

  const [isAddingMember, setIsAddingMember] = useState(false);
  const [newMember, setNewMember] = useState({
    name: "",
    relationship: "",
    nhsNumber: "",
  });

  const handleAddMember = () => {
    // Handle adding new family member
    setIsAddingMember(false);
    // Reset form
    setNewMember({ name: "", relationship: "", nhsNumber: "" });
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <DashboardLayout>
      <div className="p-8 bg-white">
        <Breadcrumbs
          items={[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Family Members" },
          ]}
        />
        <h1 className="text-3xl font-bold mb-8 text-[#003087]">
          Family Members
        </h1>

        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-[#005eb8]" />
            </div>
            <Dialog open={isAddingMember} onOpenChange={setIsAddingMember}>
              <DialogTrigger asChild>
                <Button className="bg-[#005eb8] hover:bg-[#003087]">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Family Member
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Family Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={newMember.name}
                      onChange={(e) =>
                        setNewMember({ ...newMember, name: e.target.value })
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="relationship">Relationship</Label>
                    <Select
                      value={newMember.relationship}
                      onValueChange={(value) =>
                        setNewMember({ ...newMember, relationship: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select relationship" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="spouse">Spouse</SelectItem>
                        <SelectItem value="child">Child</SelectItem>
                        <SelectItem value="parent">Parent</SelectItem>
                        <SelectItem value="guardian">Guardian</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="nhsNumber">NHS Number</Label>
                    <Input
                      id="nhsNumber"
                      value={newMember.nhsNumber}
                      onChange={(e) =>
                        setNewMember({
                          ...newMember,
                          nhsNumber: e.target.value,
                        })
                      }
                      placeholder="XXX XXX XXXX"
                    />
                  </div>
                  <div className="bg-blue-50 border-l-4 border-[#005eb8] p-4 rounded-r-md">
                    <p className="text-sm text-gray-700">
                      A request will be sent to your GP for approval. The family
                      member will need to confirm this connection.
                    </p>
                  </div>
                  <div className="flex justify-end space-x-3">
                    <Button
                      variant="outline"
                      onClick={() => setIsAddingMember(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-[#005eb8] hover:bg-[#003087]"
                      onClick={handleAddMember}
                    >
                      Send Request
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {familyMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white border-2 rounded-lg p-6 flex items-center justify-between"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-[#003087]">
                    {member.name}
                  </h3>
                  <p className="text-gray-600">{member.relationship}</p>
                  <p className="text-sm text-gray-500">
                    NHS Number: {member.nhsNumber}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 rounded-full border ${getStatusBadgeColor(
                      member.status
                    )} text-sm capitalize`}
                  >
                    {member.status}
                  </span>
                  {member.status === "approved" && (
                    <Button
                      variant="outline"
                      className="border-[#005eb8] text-[#005eb8] hover:bg-[#005eb8] hover:text-white"
                    >
                      Book Appointment
                    </Button>
                  )}
                </div>
              </div>
            ))}

            {familyMembers.length === 0 && (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-600">No family members added yet</p>
              </div>
            )}
          </motion.div>

          <div className="mt-8 bg-blue-50 border-l-4 border-[#005eb8] p-4 rounded-r-md">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-[#005eb8] mt-0.5" />
              <div>
                <h3 className="font-bold text-[#003087] mb-1">
                  Important Information
                </h3>
                <p className="text-sm text-gray-700">
                  Adding family members requires consent and verification from
                  both parties and your GP. This allows you to book appointments
                  and access basic health information for family members.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default FamilyMembersPage;
