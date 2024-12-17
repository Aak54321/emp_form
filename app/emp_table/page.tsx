"use client";
import "../globals.css";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { supabase } from "@/lib/supabase"; // Import the Supabase client

type Employee = {
  id: string;
  employeeID: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  department: string;
  dateOfJoining: string;
  role: string;
};

export default function EmployeeListPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch employees from Supabase
  useEffect(() => {
    async function fetchEmployees() {
      try {
        const { data, error } = await supabase
          .from("Employee") // Assuming the table is called "Employee"
          .select("*");

        if (error) {
          console.error("Error fetching employees:", error);
        } else {
          setEmployees(data || []);
        }
      } catch (error) {
        console.error("Unexpected error fetching employees:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchEmployees();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Employee List</h1>

      {isLoading ? (
        <p>Loading employees...</p>
      ) : employees.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date of Joining</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.employeeID}</TableCell>
                <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.phoneNumber}</TableCell>
                <TableCell>{employee.role}</TableCell>
                <TableCell>
                  {new Date(employee.dateOfJoining).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No employees found.</p>
      )}

      <Button className="mt-4" onClick={() => (window.location.href = "/")}>
        Add New Employee
      </Button>
    </div>
  );
}
