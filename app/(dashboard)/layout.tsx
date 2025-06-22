import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/app/globals.css";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { Header } from "@/components/(dashboard)/layout/header";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { ThemeProvider } from "next-themes";

const geistSans = localFont({
  src: "./../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Deshan Travels",
  description: "Powered by IBexend",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: { [key: string]: string };
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NuqsAdapter>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <div>
              <SidebarProvider defaultOpen={true}>
                {/*<AppSidebar />*/}
                <SidebarInset>
                  <Header />
                  <div className="px-5">{children}</div>
                </SidebarInset>
              </SidebarProvider>
            </div>
          </ThemeProvider>
        </NuqsAdapter>
      </body>
    </html>
  );
}
