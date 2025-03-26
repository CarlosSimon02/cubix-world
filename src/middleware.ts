import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from "next-firebase-auth-edge";
import { DEFAULT_LOCALE, LOCALES } from "./config/i18n";
import { authConfig } from "./config/nextFirebaseAuthEdge";

// Supported routes for authentication (without locale prefix)
const AUTH_PATHS = ["/signup", "/login", "/forgot-password"];
const PUBLIC_PATHS = [...AUTH_PATHS, "/"];
const PRIVATE_PATHS = ["/admin"];

// Supported locales and default locale

/**
 * Determine the best locale from the Accept-Language header.
 */
function getLocale(request: NextRequest): string {
  // Build a simple headers object for Negotiator
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages();
  return match(languages, LOCALES, DEFAULT_LOCALE);
}

/**
 * Remove locale prefix from the pathname.
 * Example: "/en-US/admin" becomes "/admin".
 */
function stripLocale(pathname: string): string {
  for (const locale of LOCALES) {
    if (pathname === `/${locale}`) {
      return "/";
    }
    if (pathname.startsWith(`/${locale}/`)) {
      return pathname.replace(`/${locale}`, "");
    }
  }
  return pathname;
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Optionally skip API routes from i18n redirection
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }

  // Check if the URL already has a locale prefix
  const hasLocale = LOCALES.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  );
  if (!hasLocale) {
    // No locale in URL, determine the best locale and redirect
    const locale = getLocale(request);
    const newUrl = request.nextUrl.clone();
    newUrl.pathname = `/${locale}${pathname}`;
    return NextResponse.redirect(newUrl);
  }

  // Remove the locale from the path for auth logic
  const cleanPath = stripLocale(pathname);
  const isPublicPath = PUBLIC_PATHS.includes(cleanPath);
  const isPrivatePath = PRIVATE_PATHS.includes(cleanPath);
  const isAuthPath = AUTH_PATHS.includes(cleanPath);

  // Delegate authentication handling to next-firebase-auth-edge middleware
  return authMiddleware(request, {
    loginPath: "/api/login",
    logoutPath: "/api/logout",
    refreshTokenPath: "/api/refresh-token",
    debug: authConfig.debug,
    enableMultipleCookies: authConfig.enableMultipleCookies,
    enableCustomToken: authConfig.enableCustomToken,
    apiKey: authConfig.apiKey,
    cookieName: authConfig.cookieName,
    cookieSerializeOptions: {
      ...authConfig.cookieSerializeOptions,
      maxAge: 30 * 60 * 60 * 24, // 30 days
    },
    cookieSignatureKeys: authConfig.cookieSignatureKeys,
    serviceAccount: authConfig.serviceAccount,
    experimental_enableTokenRefreshOnExpiredKidHeader:
      authConfig.experimental_enableTokenRefreshOnExpiredKidHeader,
    handleValidToken: async ({ decodedToken }, headers) => {
      if (isAuthPath && decodedToken) {
        return redirectToHome(request);
      }
      if (isPrivatePath && decodedToken) {
        return NextResponse.next({ request: { headers } });
      }
      if (isPrivatePath && !decodedToken) {
        return redirectToLogin(request, {
          path: "/login",
          publicPaths: PUBLIC_PATHS,
        });
      }
      // For public paths or other cases, continue normally
      return NextResponse.next({ request: { headers } });
    },
    handleInvalidToken: async () => {
      if (isPublicPath) {
        return NextResponse.next();
      }
      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
    handleError: async (error) => {
      console.error("Unhandled authentication error", { error });
      return redirectToLogin(request, {
        path: "/login",
        publicPaths: PUBLIC_PATHS,
      });
    },
  });
}

export const config = {
  matcher: [
    "/((?!_next|favicon.ico|__/auth|__/firebase|api|service-worker.js|.*\.).*)",
    "/api/login",
    "/api/logout",
    "/api/refresh-token",
  ],
};
