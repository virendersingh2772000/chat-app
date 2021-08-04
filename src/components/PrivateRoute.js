import React from 'react';
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../context/profile.context';

const PrivateRoute = ({ children, ...routeProps }) => {
  const { profile, isLoading } = useProfile();

  if (isLoading && !profile) {
    return (
      <Container>
        <Loader center vertical size="md" speed="normal" content="Loading" />
      </Container>
    );
  }

  if (!isLoading && !profile) {
    return <Redirect to="/signin" />;
  }

  return (
    <div>
      <Route {...routeProps}>{children}</Route>
    </div>
  );
};

export default PrivateRoute;
