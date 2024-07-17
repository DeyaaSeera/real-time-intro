import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { createServerSentEvent } from "@/app/utils/server-push.utils";

const prisma = new PrismaClient();

// GET /api/match
export async function GET() {
  const matches = await prisma.match.findMany();

  const parsedMatches = matches.map((match) => ({
    ...match,
    matchData: match.matchData ? JSON.parse(match.matchData) : null,
  }));
  return NextResponse.json(parsedMatches);
}

// Data example
// const dataShape = {
//   startTime: "2024-07-16T13:34:00.000Z",
//   matchData: {
//     teams: [
//       {
//         name: "Real Madrid",
//         country: "Spain",
//         flag: "🇵🇹",
//       },
//       {
//         name: "Barcelona",
//         country: "Spain",
//         flag: "🇪🇸",
//       },
//     ],
//     location: {
//       staduim: "Campno",
//       country: "Spain",
//     },
//     scores: [
//       {
//         team: "Real Madrid",
//         player: "Cristiano Ronaldo",
//         time: "50",
//         isPelenty: false,
//         isOwnGoal: false,
//       },
//       {
//         team: "Real Madrid",
//         player: "Cristiano Ronaldo",
//         time: "70",
//         isPelenty: true,
//         isOwnGoal: false,
//       },
//       {
//         team: "Barcelona",
//         player: "Messi",
//         time: "88",
//         isPelenty: false,
//         isOwnGoal: false,
//       },
//     ],
//     result: { "Real Madrid": 2, Barcelona: 1 },
//   },
// };

// POST /api/match
export async function POST(request: Request) {
  const data = await request.json();
  const newMatch = await prisma.match.create({
    data: {
      startTime: new Date(data.startTime),
      endTime: data.endTime ? new Date(data.endTime) : null,
      isStarted: data.isStarted ?? false,
      isEnd: data.isEnd ?? false,
      matchData: JSON.stringify(data.matchData) ?? null,
    },
  });
  const parsedNewMatch = {
    ...newMatch,
    matchData: newMatch.matchData ? JSON.parse(newMatch.matchData) : null,
  };
  // Send SSE to notify clients about the update
  const event = {
    type: "match_update",
    data: parsedNewMatch,
  };
  createServerSentEvent(event);

  return NextResponse.json(newMatch);
}
