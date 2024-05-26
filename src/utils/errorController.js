import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

const errorHandler = (err) => {
  let customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong, Please try again later.",
  };

  if (err.name === "ValidationError") {
    customError.statusCode = StatusCodes.BAD_REQUEST;

    customError.message = Object.values(err.errors)
      .map((item) => item.message)
      .join(" ");
  }

  if (err.name === "MongoServerError") {
    customError.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    customError.message = "Something went wrong, Please try again later.";
  }

  if (err.code && err.code === 11000) {
    customError.statusCode = StatusCodes.BAD_REQUEST;
    customError.message = `This ${Object.keys(err.keyValue)}: ${
      err.keyValue[Object.keys(err.keyValue)]
    } is already exist, Please provide another ${Object.keys(err.keyValue)}.`;
  }

  if (err.name === "CastError") {
    customError.message = `No item found with Id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }

  return NextResponse.json(
    { message: customError.message },
    { status: customError.statusCode }
  );
};

export default errorHandler;
