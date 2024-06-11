import { io } from "socket.io-client";

// const END_POINT =
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:5000"
//     : "https://strong-mind-software-backend.onrender.com";
const END_POINT = "https://strong-mind-software-backend.vercel.app";
export const socket = io(END_POINT);
