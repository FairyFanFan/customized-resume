import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "简历生成器 - 快速创建专业简历",
  description: "使用我们的在线简历生成器，快速创建专业的简历模板",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="font-sans">
        <div className="min-h-screen bg-gray-50">
          {children}
        </div>
      </body>
    </html>
  );
}