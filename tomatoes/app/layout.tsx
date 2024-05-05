"use client";

import { SessionProvider } from 'next-auth/react';

// export const metadata = {
//   title: 'All Movies',
//   description: 'Site qui recense tous les films existants depuis 1918',
//   keywords: ['film', 'série', 'cinéma', 'movies', 'acteur', 'actrice', 'réalisateur'],
//   openGraph: {
//     title: 'Mon Site Cool',
//     description: 'Site qui recense tous les films existants depuis 1918',
//     type: 'website',
//     url: 'http://localhost:3000',
//   },
// };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>My App</title>
      </head>
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}