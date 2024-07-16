import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const match = await prisma.match.findUnique({
    where: { id: Number(id) },
  });

  if (match) {
    const parsedMatch = {
      ...match,
      matchData: match.matchData ? JSON.parse(match.matchData) : null,
    };
    return NextResponse.json(parsedMatch);
  } else {
    return NextResponse.json({ error: "Match not found" }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const data = await request.json();

  try {
    const updatedMatch = await prisma.match.update({
      where: { id: Number(id) },
      data: {
        startTime: data.startTime ? new Date(data.startTime) : undefined,
        endTime: data.endTime ? new Date(data.endTime) : undefined,
        isStarted: data.isStarted ?? undefined,
        isEnd: data.isEnd ?? undefined,
        matchData: data.matchData ? JSON.stringify(data.matchData) : undefined,
      },
    });

    const parsedUpdatedMatch = {
      ...updatedMatch,
      matchData: updatedMatch.matchData
        ? JSON.parse(updatedMatch.matchData)
        : null,
    };

    return NextResponse.json(parsedUpdatedMatch);
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    await prisma.match.delete({
      where: { id: Number(id) },
    });
    return NextResponse.json({ message: "Match deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}