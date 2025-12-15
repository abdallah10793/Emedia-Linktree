// import { Lato } from 'next/font/google'; // Commented out for simplification
// import './globals.css'; // Commented out for simplification

// const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] }); // Commented out for simplification

// export const metadata = { // Commented out for simplification
//   title: 'Emedia Linktree',
//   description: 'Share your links, social profiles, contact info and more on one page',
// }; // Commented out for simplification

import { Lato } from 'next/font/google';
import './globals.css';

const lato = Lato({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: 'Emedia Linktree',
  description: 'Share your links, social profiles, contact info and more on one page',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>{children}</body>
    </html>
  );
}
