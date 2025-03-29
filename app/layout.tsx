import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Logo from '@/public/logo.png'
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
	display: "swap",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	display: "swap",
});

// geist-mono

export const metadata: Metadata = {
	title: "Ritter Veiculos"
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="pt-br">
			<body className={`${geistSans.variable} ${geistMono.variable}  max-h-screen overflow-x-hidden antialiased`}>
				<Header logo={Logo} />
				{children}
				<Footer logo={Logo} />
			</body>
		</html>
	);
}
