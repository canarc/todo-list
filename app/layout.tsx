import '@/styles/reset.css';
import '@/styles/global.css';
import { Inter } from '@next/font/google';
import Header from '@/components/header';
import Footer from '@/components/footer';

const fontFamily = Inter();

interface Props {
  children: JSX.Element;
}

function Layout({ children }: Props) {
  return (
    <html lang="tr" className={fontFamily.className}>
      <body className="container">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

export default Layout;
