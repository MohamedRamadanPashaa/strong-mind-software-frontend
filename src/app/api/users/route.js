import { NextResponse } from "next/server";
import User from "@/models/userModel";
import Token from "@/models/token";
import crypto from "crypto";
import sendEmail from "@/utils/sendEmail";
import connectDB from "@/utils/connectDB";
import errorHandler from "@/utils/errorController";

export const POST = async (req) => {
  try {
    await connectDB();

    const body = await req.json();

    const newUser = await User.create(body);

    const token = await new Token({
      userId: newUser._id,
      token: crypto.randomBytes(32).toString("hex"),
    }).save();

    const url = `${process.env.FRONTEND_WEBSITE}/verify-email/user-${newUser._id}-${token.token}`;

    sendEmail(
      newUser,
      "Verify My Email",
      url,
      "Here is your activation link, Please press on the bellow link and follow instruction to activate your email."
    );

    return NextResponse.json(
      {
        message:
          "An email sent to your email, please verify your account, This email is valid for 10 minutes only.",
      },
      { status: 201 }
    );
  } catch (error) {
    return errorHandler(error);
  }
};
