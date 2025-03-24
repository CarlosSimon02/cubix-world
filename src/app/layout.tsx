import { getAuthTokens } from "@/utils/getAuthTokens";
import { tokensToUserEntity } from "@/utils/tokensToUserEntity";
import "@ant-design/v5-patch-for-react-19";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - Cubix World",
    default: "Cubix World",
  },
  description:
    "Discover a world of exciting puzzles and brain-teasing toys that spark creativity, boost problem-solving skills, and provide endless fun for all ages!",
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const tokens = await getAuthTokens();
  const user = tokens ? tokensToUserEntity(tokens.decodedToken) : null;
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers user={user}>{children}</Providers>
      </body>
    </html>
  );
};

export default RootLayout;
