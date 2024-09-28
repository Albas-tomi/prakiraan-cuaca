import { getToken } from "next-auth/jwt";
import {
  NextFetchEvent,
  NextMiddleware,
  NextRequest,
  NextResponse,
} from "next/server";

// Halaman dilarang
const isLoginURL = ["/auth/login", "/auth/registrasi"];

export const withAuth = (
  middleware: NextMiddleware,
  requireAuth: string[] = []
) => {
  return async (req: NextRequest, next: NextFetchEvent) => {
    const pathname = req.nextUrl.pathname;
    // CEK TOKEN
    if (requireAuth.includes(pathname)) {
      const token = await getToken({
        req,
        secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
      });

      // JIKA TIDAK ADA TOKEN DAN TIDAK BERADA PADA HALAMAN loginURL maka redirect ke login
      if (!token && !isLoginURL.includes(pathname)) {
        // REDIRECT KE LOGIN
        const url = new URL(`/auth/login`, req.url);
        url.searchParams.set("callbackUrl", encodeURI(req.url));
        return NextResponse.redirect(url);
      }

      //   JIKA ADA TOKEN DAN BERADA PADA HALAMAN loginURL maka redirect ke homepage
      if (token) {
        if (isLoginURL.includes(pathname)) {
          return NextResponse.redirect(new URL("/", req.url));
        }
      }
    }
    return middleware(req, next);
  };
};
