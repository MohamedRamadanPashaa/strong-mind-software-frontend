"use server";

import { checkEnvironment } from "./checkEnvironment";

export const getOverall = async (standard = "National", page = 1) => {
  const res = await fetch(
    `${checkEnvironment()}/api/v1/overalls/get-overall/${standard}?page=${page}`,
    { cache: "no-store" }
  );

  const { data, numberOfOveralls } = await res.json();

  return { data, numberOfOveralls };
};
