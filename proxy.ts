import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { VerifySession } from "./actions/auth";

interface SessionPayload {
    accessToken: string;
    tokenType: string;
    expires: string;
}

export async function proxy(request: NextRequest) {
    const sessionCookie = request.cookies.get("session")?.value;

    let isLoggedIn = false;

    if (sessionCookie) {
        try {
            const session = JSON.parse(sessionCookie) as SessionPayload;
            const expires = new Date(session.expires);

            const verified = await VerifySession();

            if (!verified?.valid) {
                request.cookies.delete("session");
                isLoggedIn = false;
                return;
            }

            isLoggedIn = expires > new Date() && verified?.valid;
        } catch {
            isLoggedIn = false;
        }
    }

    const isLoginRoute =
        request.nextUrl.pathname === "/login" ||
        request.nextUrl.pathname === "/register" ||
        request.nextUrl.pathname === "/verify" ||
        request.nextUrl.pathname === "/forgotpassword" ||
        request.nextUrl.pathname === "/reset-password" ||
        request.nextUrl.pathname === "/termos";

    if (isLoggedIn && isLoginRoute) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    if (!isLoggedIn && !isLoginRoute) {
        return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
