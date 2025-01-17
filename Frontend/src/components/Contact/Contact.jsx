import React from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className='min-h-screen bg-white text-black'>
      <header className='text-center py-12'>
        <h1 className='text-5xl font-bold text-center mb-5 text-black'>
          Contact Us
        </h1>
        <p className='mt-4 text-lg'>
          We’d love to hear from you! Get in touch with us for any queries or
          feedback.
        </p>
      </header>

      <section className='container mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
          <div className='bg-white text-gray-800 p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold mb-4'>Get in Touch</h2>
            <p className='text-gray-600 mb-6'>
              Have questions or feedback? Reach out to us, and we’ll get back to
              you as soon as possible.
            </p>
            <div className='space-y-4'>
              <div className='flex items-center space-x-4'>
                <FaPhoneAlt className='text-black text-2xl' />
                <p className='text-gray-700'>+1 234 567 890</p>
              </div>
              <div className='flex items-center space-x-4'>
                <FaEnvelope className='text-black text-2xl' />
                <p className='text-gray-700'>contact@weatherly.com</p>
              </div>
              <div className='flex items-center space-x-4'>
                <FaMapMarkerAlt className='text-black text-2xl' />
                <p className='text-gray-700'>123 Weatherly Lane, Cloud City</p>
              </div>
            </div>
          </div>

          <div className='bg-white text-gray-800 p-8 rounded-lg shadow-lg'>
            <h2 className='text-2xl font-bold mb-4'>Send Us a Message</h2>
            <form className='space-y-4'>
              <div>
                <label htmlFor='name' className='block text-sm font-medium'>
                  Your Name
                </label>
                <input
                  type='text'
                  id='name'
                  className='w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-black focus:outline-none'
                  placeholder='Enter your name'
                  required
                />
              </div>
              <div>
                <label htmlFor='email' className='block text-sm font-medium'>
                  Your Email
                </label>
                <input
                  type='email'
                  id='email'
                  className='w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-black focus:outline-none'
                  placeholder='Enter your email'
                  required
                />
              </div>
              <div>
                <label htmlFor='message' className='block text-sm font-medium'>
                  Message
                </label>
                <textarea
                  id='message'
                  className='w-full mt-1 p-2 border border-gray-300 rounded focus:ring focus:ring-black focus:outline-none'
                  placeholder='Type your message here'
                  rows='5'
                  required
                ></textarea>
              </div>
              <button
                type='submit'
                className='w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:ring focus:ring-black'
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
