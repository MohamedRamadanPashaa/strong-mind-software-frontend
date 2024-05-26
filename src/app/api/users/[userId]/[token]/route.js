import Token from "@/models/token";
import User from "@/models/userModel";
import connectDB from "@/utils/connectDB";
import errorHandler from "@/utils/errorController";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export const GET = async (req, { params }) => {
  const { userId, token } = params;

  console.log("backend", userId, token);

  try {
    await connectDB();

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return NextResponse.json(
        {
          message:
            "This user does not longer exist, Please register or Login with another account",
        },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    const existingToken = await Token.findOne({
      userId: user._id,
      token: token,
    });

    if (!existingToken) {
      return NextResponse.json(
        {
          message:
            "This link is invalid or expired, try to get new one by login again.",
        },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    user.verified = true;
    await user.save({ validateBeforeSave: false });
    await existingToken.deleteOne();

    return NextResponse.json(
      {
        message: "email verified successfully, Log in now.",
      },
      { status: StatusCodes.OK }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
