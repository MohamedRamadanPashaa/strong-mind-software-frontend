import { io } from "socket.io-client";

const END_POINT =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000"
    : process.env.REAL_WEBSITE;
// const END_POINT = "https://strong-mind-software-backend.vercel.app";
// const END_POINT = "https://strong-mind-software-backend.onrender.com"
export const socket = io(END_POINT);
