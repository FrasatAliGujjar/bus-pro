import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";

// ===========================================================================

// // Get Api
export async function GET() {
  try {
    const data = await prisma.reservation.findMany();
    return NextResponse.json(data);
  } catch (error) {
    // -------------------------------------------------
    return NextResponse.json(
      { error: "Failed to fetch users", details: error.message },
      { status: 500 }
    );
  }
}

// ===============================================================================
// POST API--
export async function POST(req) {
  try {
    const {
      pName,
      pEmail,
      pPhone,
      pAltPhone,
      pIdCard,
      Bid,
      busname,
      dprtrCity,
      arvlCity,
      dprtrTme,
      seats,
      totalFare,
    } = await req.json();

    const passengerData = await prisma.reservation.create({
      data: {
        pName,
        pEmail,
        pPhone,
        pAltPhone,
        pIdCard,
        Bid,
        busname,
        dprtrCity,
        arvlCity,
        dprtrTme,
        seats,
        totalFare,
      },
    });

    return NextResponse.json(passengerData, { status: 201 });
  } catch (error) {
    // Log error internally for server-side tracking, without exposing details
    console.error("Error adding Passenger:", error);

    return NextResponse.json(
      { error: "Failed to add Passenger. Please try again later." },
      { status: 500 }
    );
  }
}
// _______________________________________________________________________________

// // ======================= DELETE  =======================

export async function DELETE(request) {
  const { id } = await request.json();

  await prisma.reservation.delete({
    where: { Rid: id },
  });

  return NextResponse.json(
    { message: "Passenger deleted successfully" },
    { status: 200 }
  );
}

// ======================= UPDATE  =======================
export async function PATCH(request) {
  try {
    const { id, pName, pEmail, pPhone, pAltPhone, pIdcard } =
      await request.json();

    const updatedPassenger = await prisma.reservation.update({
      where: { Rid: id },
      data: {
        pName,
        pEmail,
        pPhone,
        pAltPhone,
        pIdcard,
      },
    });

    return NextResponse.json(updatedPassenger, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update user", details: error.message },
      { status: 500 }
    );
  }
}
