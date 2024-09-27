import { withAuth } from "@/middlewares/withAuth";
import { NextResponse } from "next/server";

export const mainMiddleware = () => {
  const res = NextResponse.next();
  return res;
};

export default withAuth(mainMiddleware, ["/", "/auth/login"]);
