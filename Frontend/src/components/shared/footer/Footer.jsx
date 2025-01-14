import React from 'react';
import { footerLinks } from '../../../constants/FooterConstants.jsx';
import {
  FaFacebook,
  FaLinkedin,
  FaTiktok,
  FaInstagram,
  FaTelegram,
} from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className='bg-black text-white py-10'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 items-center'>
          <div className='flex flex-col items-center  text-center md:text-left'>
            <a href='/' className='text-4xl'>
             Logo
            </a>
            <p className='mt-4 text-lg text-center'> weather app motto is going to be here.</p>
          </div>

          <div className='flex flex-wrap items-center justify-center space-x-4 text-lg col-span-2'>
            {footerLinks.map((link) => (
              <a key={link.name} href={link.path}>
                <p className='hover:underline transition-colors duration-200'>
                  {link.name}
                </p>
              </a>
            ))}
          </div>

          <div className='flex flex-col items-center md:mb-0'>
          <h3 className='text-xl font-bold mb-4'>
                Follow Us
              </h3>
            <div className='flex space-x-4'>
              <a
                to='https://news.google.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-lg hover:text-[#f0e1cdd4] cursor-pointer'
              >
                <FaTelegram size={24} />
              </a>
              <a
                to='https://news.google.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-lg hover:text-[#f0e1cdd4] cursor-pointer'
              >
                <FaFacebook size={24} />
              </a>
              <a
                to='https://news.google.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-lg hover:text-[#f0e1cdd4] cursor-pointer'
              >
                <FaInstagram size={24} />
              </a>
              <a
                to='https://news.google.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-lg hover:text-[#f0e1cdd4] cursor-pointer'
              >
                <FaLinkedin size={24} />
              </a>
              <a
                to='https://news.google.com/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-lg hover:text-[#f0e1cdd4] cursor-pointer'
              >
                <FaTiktok size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className='mt-8 border-t border-secondaryColor pt-4 text-center text-base text-secondaryColor'>
          © {new Date().getFullYear()} Weather App. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
