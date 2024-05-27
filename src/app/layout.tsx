import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from '@/app/components/navbar/Navbar';
import RegisterModal from '@/app/components/modal/RegisterModal';
import LoginModal from '@/app/components/modal/LoginModal';
import RentModal from '@/app/components/modal/RentModal';
import ToasterProvider from '@/app/providers/ToasterProvider';
import getCurrentUser from '@/app/actions/getCurrentUser';
import ClientOnly from '@/app/components/ClientOnly';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'A clone version of Airbnb',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={font.className}>
        <ClientOnly>
          <Navbar currentUser={currentUser} />
          <ToasterProvider />
          <RentModal />
          <LoginModal />
          <RegisterModal />
        </ClientOnly>
        <div className='pb-20 pt-14'>{children}</div>
      </body>
    </html>
  );
}
