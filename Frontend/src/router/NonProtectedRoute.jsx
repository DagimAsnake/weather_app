import React from 'react';
import { Outlet } from 'react-router-dom';
import Layout from '../components/layout/Layout.jsx';

const NonProtectedLayout = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

export default NonProtectedLayout;
