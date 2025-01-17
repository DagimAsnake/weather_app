import React from 'react';
import { FaCloudSun, FaMapMarkedAlt, FaHeart } from 'react-icons/fa';

const About = () => {
  return (
    <div className='min-h-screen bg-white text-black'>
      <header className='text-center py-12'>
        <h1 className='text-5xl font-bold text-center mb-5 text-black'>
          About Us
        </h1>
        <p className='mt-4 text-lg'>
          Discover the story behind your favorite weather app.
        </p>
      </header>

      <section className='container mx-auto px-6 py-12'>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
          <div className='bg-black text-white p-6 rounded-lg shadow-lg text-center'>
            <FaCloudSun className='text-6xl mx-auto mb-4' />
            <h2 className='text-xl font-bold mb-2'>Accurate Forecasts</h2>
            <p className='text-sm'>
              Stay updated with the most reliable and precise weather
              predictions tailored for your city.
            </p>
          </div>
          <div className='bg-black text-white p-6 rounded-lg shadow-lg text-center'>
            <FaMapMarkedAlt className='text-6xl mx-auto mb-4' />
            <h2 className='text-xl font-bold mb-2'>City Search</h2>
            <p className='text-sm'>
              Search for your favorite cities and get weather insights at a
              glance.
            </p>
          </div>
          <div className='bg-black text-white p-6 rounded-lg shadow-lg text-center'>
            <FaHeart className='text-6xl mx-auto mb-4' />
            <h2 className='text-xl font-bold mb-2'>Save Favorites</h2>
            <p className='text-sm'>
              Bookmark locations you love to ensure you’re always prepared for
              the day ahead.
            </p>
          </div>
        </div>
      </section>

      <section className='flex items-center justify-center bg-white text-gray-800 py-12'>
        <div className='w-96 text-center px-6'>
          <h2 className='text-2xl font-bold mb-4'>Our Mission</h2>
          <p className='text-lg'>
            At Weatherly, our mission is to simplify weather tracking. We aim to
            empower you with tools to stay informed, plan better, and enjoy life
            with fewer surprises.
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
