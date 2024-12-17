import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
export async function GET() {
  try {
    const { data, error } = await supabase.from("Employee").select("*");

    if (error) {
      throw new Error(error.message);
    }
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error occured",
      },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  const body = await req.json();

  const birthDate = new Date(body.dob);
  const age = new Date().getFullYear() - birthDate.getFullYear();

  if (age < 18) {
    return NextResponse.json(
      { error: "Employee must be at the age of 18 or greater" },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase.from("Employee").insert([
      {
        employeeID: body.employeeID,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phoneNumber: body.phoneNumber,
        dateOfJoining: body.dateOfJoining,
        role: body.role,
        dob: body.dob,
      },
    ]);

    if (error) {
      throw new Error(error.message);
    }
    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error occured",
      },
      { status: 400 }
    );
  }
}
