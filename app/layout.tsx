import '@/styles/normalize.scss';
import '@/styles/global.scss';

import { Inter } from '@next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';
import Head from 'next/head';

const fontFamily = Inter();

interface Props {
  children: JSX.Element;
}

function Layout({ children }: Props) {
  return (
    <html lang="tr" className={fontFamily.className}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1 maximum-scale=1" />
        <link rel="stylesheet" href="https://storage.googleapis.com/non-spec-apps/mio-icons/latest/outline.css" />
      </Head>
      <body className="container">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export default Layout;
