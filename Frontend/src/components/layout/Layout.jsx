import React from 'react';
import Navbar from '../shared/navbar/Navbar';
import Footer from '../shared/footer/Footer';

const Layout = ({ children }) => {
  return (
    <main className='antialiased flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow'>{children}</main>
      <Footer />
    </main>
  );
};

export default Layout;
