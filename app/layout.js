import { Noto_Sans, Playfair_Display } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";

const notoSans = Noto_Sans({
    variable: "--font-noto-sans",
    subsets: ["latin"],
});

const playfairDisplay = Playfair_Display({
    variable: "--font-playfair-display",
    subsets: ["latin"],
});

export const metadata = {
    title: "PricePilot",
    description: "Know the price. Know when to buy.",
};

export default function RootLayout({ children }) {
    return (
        <html
            lang="en"
            className={`${notoSans.variable} ${playfairDisplay.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <Toaster richcolors />
                {children}
            </body>
        </html>
    );
}
