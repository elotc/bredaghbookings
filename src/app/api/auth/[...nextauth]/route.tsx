import { handlers } from "@/lib/auth/authConfig" 
import { NextRequest, NextResponse } from "next/server";

export const { GET, POST } = handlers;

// export async function GET(request:NextRequest) {
//     return NextResponse.json({message: "Hello World"});
// }

// export async function PUT(request:NextRequest) {
//     const data = await request.json();
//     return NextResponse.json({message: "Data Received", data});
// }