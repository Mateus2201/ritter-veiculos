import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Logo from '@/public/logo.png'
import Header from "@/components/header";
import Footer from "@/components/footer";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Ritter Veiculos"
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="pt-br">
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Header logo={Logo}/>
				{children}
				<Footer logo={Logo}/>
			</body>
		</html>
	);
}
