import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const withAuth = (WrappedComponent) => {
  const WithAuthComponent = (props) => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('token');

    useEffect(() => {
      if (!isLoggedIn) {
        toast.warning('You need to login to view this page!');
        navigate('/login');
      }
    }, [isLoggedIn, navigate]);

    return isLoggedIn ? <WrappedComponent {...props} /> : null;
  };

  return WithAuthComponent;
};

export default withAuth;
