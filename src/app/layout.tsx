import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';

// import Modal from '@/app/components/modal/Modal';
import RegisterModal from '@/components/modal/RegisterModal';
import LoginModal from '@/components/modal/LoginModal';
import RentModal from '@/components/modal/RentModal';

import ToasterProvider from '@/app/providers/ToasterProvider';
import getCurrentUser from './actions/getCurrentUser';

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
        {/* <Modal actionLabel='Submit' isOpen={true} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } onSubmit={function (): void {
          throw new Error('Function not implemented.');
        } } /> */}
        <ToasterProvider />
        <RentModal />
        <LoginModal />
        <RegisterModal />
        <Navbar currentUser={currentUser} />
        {children}
      </body>
    </html>
  );
}
