/* eslint-disable arrow-body-style */
import React, { useCallback } from 'react';
import { Alert, Button, Drawer, Icon } from 'rsuite';
import { useMediaQuery, useModalState } from '../../misc/custom-hooks';
import Dashboard from '.';
import { auth } from '../../misc/firebase';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const onMobile = useMediaQuery('(max-width: 992px)');

  const onSignOut = useCallback(() => {
    auth.signOut();

    Alert.info('Signed out', 4000);

    close();
  }, [close]);

  return (
    <>
      <Button block color="blue" onClick={open} className="mt-3">
        <Icon icon="dashboard" /> Dashboard
      </Button>
      <Drawer full={onMobile} show={isOpen} onHide={close} placement="left">
        <Dashboard onSignOut={onSignOut} />
      </Drawer>
    </>
  );
};

export default DashboardToggle;
