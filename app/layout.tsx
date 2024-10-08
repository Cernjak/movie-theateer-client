import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './style/variables.css';
import './style/buttons.css';
import './style/globals.css';
import './style/reset.css';
import './style/typography.css';
import Header from './components/Header/Header';
import { UserProvider } from './core/context/user.context';
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body className={roboto.className}>
          <Header />
          <main className="main">{children}</main>
        </body>
      </UserProvider>
    </html>
  );
}
