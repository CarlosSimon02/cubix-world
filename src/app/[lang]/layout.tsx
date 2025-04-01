import "@/presentation/styles/globals.css";
import { Locale } from "@/types/locale.type";
import getAuthTokens from "@/utils/getAuthTokens";
import getDictionary from "@/utils/getDictionary";
import tokensToUserEntity from "@/utils/tokensToUserEntity";
import { ColorSchemeScript, mantineHtmlProps } from "@mantine/core";
import "mantine-datatable/styles.layer.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "../providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const translations = {
  root: {
    title: "Cubix World",
    description:
      "Discover a world of exciting puzzles and brain-teasing toys that spark creativity, boost problem-solving skills, and provide endless fun for all ages!",
  },
};

export const metadata: Metadata = {
  title: {
    template: `%s - ${translations.root.title}`,
    default: translations.root.title,
  },
  description: translations.root.description,
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
};

const RootLayout = async ({ children, params }: Readonly<RootLayoutProps>) => {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const tokens = await getAuthTokens();
  const user = tokens ? tokensToUserEntity(tokens.decodedToken) : null;

  return (
    <html lang={lang} {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers user={user} dictionary={dictionary} currentLocale={lang}>
          {children}
        </Providers>
      </body>
    </html>
  );
};
export default RootLayout;
