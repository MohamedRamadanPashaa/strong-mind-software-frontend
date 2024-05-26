import { io } from "socket.io-client";

const END_POINT = "http://localhost:5000";
// const END_POINT = "https://sm-new-software-5x4h.onrender.com";
export const socket = io(END_POINT);
