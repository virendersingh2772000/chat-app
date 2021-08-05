/* eslint-disable  */
import React, { useState } from 'react';
import { Alert, Button, Icon, Tag } from 'rsuite';
import firebase from 'firebase/app';
import { auth } from '../../misc/firebase';

const ProviderBlock = () => {
  const [isConnected, setIsConnected] = useState({
    'google.com': auth.currentUser.providerData.some(
      data => data.providerId === 'google.com'
    ),
    'facebook.com': auth.currentUser.providerData.some(
      data => data.providerId === 'facebook.com'
    ),
  });

  const currentUserNo = auth.currentUser.providerData.length;

  const updateIsConnected = (providerId, value) => {
    setIsConnected(p => {
      return {
        ...p,
        [providerId]: value,
      };
    });
  };

  const unLink = async providerId => {
    try {
      await auth.currentUser.unlink(providerId);

      updateIsConnected(providerId, false);
      Alert.info(`Disconnected from ${providerId}`, 4000);
    } catch (err) {
      Alert.info(err.message, 4000);
    }
  };

  const unLinkFacebook = () => {
    unLink('facebook.com');
  };
  const unLinkGoogle = () => {
    unLink('google.com');
  };

  const Link = async provider => {
    try {
      await auth.currentUser.linkWithPopup(provider);

      updateIsConnected(provider.providerId, true);
      Alert.success(`Connected with ${provider.providerId}`, 4000);
    } catch (err) {
      Alert.info(err.message, 4000);
    }
  };

  const LinkFacebook = () => {
    Link(new firebase.auth.FacebookAuthProvider());
  };
  const LinkGoogle = () => {
    Link(new firebase.auth.GoogleAuthProvider());
  };

  return (
    <div>
      {isConnected['google.com'] && (
        <Tag
          color="green"
          closable={currentUserNo ? currentUserNo === 2 : currentUserNo === 1}
          onClose={unLinkGoogle}
        >
          <Icon icon="google" /> Connected
        </Tag>
      )}
      {isConnected['facebook.com'] && (
        <Tag
          color="blue"
          closable={currentUserNo ? currentUserNo === 2 : currentUserNo === 1}
          onClose={unLinkFacebook}
        >
          <Icon icon="facebook" /> Connected
        </Tag>
      )}
      {!isConnected['google.com'] && (
        <Button block color="green" className="mt-3" onClick={LinkGoogle}>
          <Icon icon="google" /> Connect with Google
        </Button>
      )}
      {!isConnected['facebook.com'] && (
        <Button block color="blue" className="mt-3" onClick={LinkFacebook}>
          <Icon icon="facebook" /> Connect with Facebook
        </Button>
      )}
    </div>
  );
};

export default ProviderBlock;
