import Competition from "@/models/competitionModel";
import connectDB from "@/utils/connectDB";
import errorHandler from "@/utils/errorController";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  try {
    await connectDB();

    const competitions = await Competition.find({
      regStarts: { $lt: new Date() },
      regEnds: { $gt: new Date() },
    });

    console.log(competitions);

    return NextResponse.json(
      {
        status: "success",
        result: competitions.length,
        data: {
          competitions,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
