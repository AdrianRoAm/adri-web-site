import "~/styles/globals.css";

import { type Metadata } from "next";
import { TRPCReactProvider } from "~/trpc/react";
import { fontSans, fontSansOutline } from "~/styles/fonts";

import { Header } from "~/app/_components/layout/Header";
import { Footer } from "~/app/_components/layout/Footer";
import { Main } from "~/app/_components/layout/Main";

export const metadata: Metadata = {
  title: "adri-web-site",
  description: "Portfolio de Adri",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es"
      className={`${fontSans.variable} ${fontSansOutline.variable} h-screen overflow-y-hidden`}
    >
      <body className="relative h-full">
        <Header />
        <TRPCReactProvider>
          <Main>{children}</Main>
        </TRPCReactProvider>
        <Footer />
      </body>
    </html>
  );
}
