import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Modal from '@/components/modal/Modal';
import RegisterModal from '@/components/modal/RegisterModal';
import ToasterProvider from '@/providers/ToasterProvider';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'A clone version of Airbnb',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const onClose = () => {
  //   console.log('hello');
  // };
  // const onSubmit = () => {
  //   console.log('hello');
  // };

  return (
    <html lang='en'>
      <body className={font.className}>
        {/* <Modal actionLabel='Submit' isOpen={true} onClose={function (): void {
          throw new Error('Function not implemented.');
        } } onSubmit={function (): void {
          throw new Error('Function not implemented.');
        } } /> */}
        <ToasterProvider />
        <RegisterModal />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
