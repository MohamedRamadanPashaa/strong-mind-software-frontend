import { io } from "socket.io-client";
import { checkEnvironment } from "./checkEnvironment";

const END_POINT = checkEnvironment();
// const END_POINT = "https://strong-mind-software-backend.vercel.app";
export const socket = io(END_POINT);
