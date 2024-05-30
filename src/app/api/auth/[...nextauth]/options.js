import CredentialsProviders from "next-auth/providers/credentials";

import User from "@/models/userModel";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { StatusCodes } from "http-status-codes";
import Token from "@/models/token";
import sendEmail from "@/utils/sendEmail";

export const options = {
  secret: process.env.NEXT_AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  session: {
    jwt: true,
    maxAge: 90 * 24 * 60 * 60,
  },

  providers: [
    CredentialsProviders({
      name: "Credentials",

      async authorize(credentials) {
        try {
          const { email, password } = credentials;

          await connectDB();

          if (!email || !password) {
            return NextResponse.json(
              { message: "Please provide email and password." },
              { status: StatusCodes.BAD_REQUEST }
            );
          }

          const user = await User.findOne({ email })
            .select("+password")
            .lean()
            .exec();

          if (!user) {
            const error = new Error(
              "No user found with this email, Please sign up instead, Or check your email spelling."
            );
            error.statusCode = StatusCodes.NOT_FOUND;
            throw error;
          }

          if (!(await bcrypt.compare(password, user.password))) {
            const error = new Error("The email and password don't match.");
            error.statusCode = StatusCodes.UNAUTHORIZED;
            throw error;
          }

          if (!user.verified) {
            const token = await Token.findOne({ userId: user._id });

            if (!token) {
              const token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
              }).save();

              const url = `${process.env.FRONTEND_WEBSITE}/verify-email/user-${user._id}-${token.token}`;

              sendEmail(
                user,
                "Verify My Email",
                url,
                "Here is your activation link, Please press on the bellow link and follow instruction to activate your email."
              );
            }

            const error = new Error(
              "Your account not verified yet, we sent you email to verify."
            );
            error.statusCode = StatusCodes.UNAUTHORIZED;
            throw error;
          }

          delete user.password;
          return user;
        } catch (error) {
          // console.log(error);
          throw new Error(error.message || "Something went wrong!");
        }

        // return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.role = user.role;
        token.id = user._id;
        token.photo = user.photo;
        token.birthday = user.birthday;
        token.followers = user.followers;
        token.followings = user.followings;
      }

      if (
        trigger === "update" &&
        session?.name &&
        session?.birthday &&
        session?.photo
      ) {
        token.name = session.name;
        token.birthday = session.birthday;
        token.photo = session.photo;
      }

      return token;
    },

    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role;
        session.user.id = token.id;
        session.user.photo = token.photo;
        session.user.birthday = token.birthday;
        session.user.followers = token.followers;
        session.user.followings = token.followings;
      }

      return session;
    },
  },
};

// openssl rand -base64 32
