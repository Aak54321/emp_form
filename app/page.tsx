"use client";

import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {supabase} from "@/lib/supabase"; // Import the Supabase client

export default function HomePage() {
  const [formData, setFormData] = useState({
    employeeID: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "",
    dateOfJoining: "",
    role: "",
    dob: "",
  });

  const { toast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateDOB = (dob: string): boolean => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age >= 18;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate Date of Birth (DOB)
    if (!validateDOB(formData.dob)) {
      toast({
        title: "Error",
        description: "Employee must be at least 18 years old.",
        variant: "destructive",
      });
      return;
    }

    const formattedData = {
      ...formData,
      dateOfJoining: new Date(formData.dateOfJoining).toISOString(),
      dob: new Date(formData.dob).toISOString(),
    };

    try {
      // Insert the employee data into Supabase
      const { error } = await supabase
        .from("Employee") // Make sure the table name is correct
        .insert([
          {
            employeeID: formattedData.employeeID,
            firstName: formattedData.firstName,
            lastName: formattedData.lastName,
            email: formattedData.email,
            phoneNumber: formattedData.phoneNumber,
            dateOfJoining: formattedData.dateOfJoining,
            role: formattedData.role,
            dob: formattedData.dob,
          },
        ]);

      if (error) {
        toast({
          title: "Error",
          description: error.message || "Something went wrong.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Employee added successfully!",
          variant: "default",
        });

        // Clear the form data
        setFormData({
          employeeID: "",
          firstName: "",
          lastName: "",
          email: "",
          phoneNumber: "",
          department: "",
          dateOfJoining: "",
          role: "",
          dob: "",
        });
      }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add Employee</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="employeeID">Employee ID</Label>
          <Input
            id="employeeID"
            name="employeeID"
            placeholder="Enter Employee ID"
            value={formData.employeeID}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="firstName">First Name</Label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="Enter First Name"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="lastName">Last Name</Label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Enter Last Name"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="phoneNumber">Phone Number</Label>
          <Input
            id="phoneNumber"
            name="phoneNumber"
            placeholder="Enter Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="dateOfJoining">Date of Joining</Label>
          <Input
            id="dateOfJoining"
            type="date"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input
            id="role"
            name="role"
            placeholder="Enter Role"
            value={formData.role}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="dob">Date of Birth</Label>
          <Input
            id="dob"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-half mr-1">
          Submit
        </Button>
        <Button className="mt-4" onClick={() => (window.location.href = "/emp_table")}>
          View Employee List
        </Button>
      </form>
    </div>
  );
}
