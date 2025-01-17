import React from 'react';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, resetData } from '../../state/auth/userAuthSlice';

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, registerError, isAuthenticated, isRegistered } = useSelector(
    (state) => state.userAuth
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
    if (isRegistered) {
      navigate('/login');
      dispatch(resetData());
    }
  }, [isAuthenticated, isRegistered, navigate, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = formData;
    let valid = true;

    const newErrors = { name: '', email: '', password: '' };
    if (!name) {
      newErrors.name = 'Name is required.';
      valid = false;
    }
    if (!email) {
      newErrors.email = 'Email is required.';
      valid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required.';
      valid = false;
    }
    setErrors(newErrors);

    if (valid) {
      dispatch(registerUser(formData));
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-5'>
        <h2 className='text-2xl font-bold text-center text-gray-800 mb-6'>
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Full Name
            </label>
            <div className='flex items-center border border-gray-300 rounded-lg px-3'>
              <FaUser className='text-gray-500' />
              <input
                name='name'
                type='text'
                className='w-full p-2'
                placeholder='Enter your full name'
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            {errors.name && (
              <p className='text-sm text-red-500 mt-1'>{errors.name}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Email Address
            </label>
            <div className='flex items-center border border-gray-300 rounded-lg px-3'>
              <FaEnvelope className='text-gray-500' />
              <input
                name='email'
                type='email'
                className='w-full p-2'
                placeholder='Enter your email'
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            {errors.email && (
              <p className='text-sm text-red-500 mt-1'>{errors.email}</p>
            )}
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700 mb-2'>
              Password
            </label>
            <div className='flex items-center border border-gray-300 rounded-lg px-3'>
              <FaLock className='text-gray-500' />
              <input
                name='password'
                className='w-full p-2'
                placeholder='Enter your password'
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='text-gray-500 ml-2 focus:outline-none'
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className='text-sm text-red-500 mt-1'>{errors.password}</p>
            )}
          </div>

          <button
            disabled={loading}
            type='submit'
            className={`${
              loading ? 'bg-gray-700 cursor-not-allowed' : ''
            } w-full bg-black text-white py-2 rounded-lg hover:bg-gray-700 transition`}
          >
            {loading ? 'Signing Up...' : 'Sign Up'}
          </button>
          {registerError && (
            <div className='mb-3'>
              <p className='text-red-500 text-sm mt-1'>{registerError.message}</p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
