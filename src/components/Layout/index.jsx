import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import ZaptBadge from '../ZaptBadge';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <ZaptBadge />
      <Footer />
    </div>
  );
};

export default Layout;