/* eslint-disable arrow-body-style */
import React, { useRef, useState } from 'react';
import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import ModalHeader from 'rsuite/lib/Modal/ModalHeader';
import ModalTitle from 'rsuite/lib/Modal/ModalTitle';
import { useModalState } from '../../misc/custom-hooks';
import { useProfile } from '../../context/profile.context';
import { storage, database } from '../../misc/firebase';
import ProfileAvatar from '../ProfileAvatar';
import { getUserUpdates } from '../../misc/helpers';

const fileInputTypes = '.png, .jpg, .jpeg';
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];

const getBlob = canvas => {
  return new Promise((resolve, reject) => {
    canvas.toBlob(blob => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('File process error'));
      }
    });
  });
};

const isValidFile = file => acceptedFileTypes.includes(file.type);

const AvatarUploadBtn = () => {
  const { isOpen, open, close } = useModalState();

  const [img, setImg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const avatarEditorRef = useRef();

  const { profile } = useProfile();

  const onFileInputChange = ev => {
    const currentFiles = ev.target.files;

    if (currentFiles.length === 1) {
      const file = currentFiles[0];

      if (isValidFile(file)) {
        setImg(file);

        open();
      } else {
        Alert.warning(
          `${file.type} : This File Type is not Supported, Please use Image file`,
          4000
        );
      }
    }
  };

  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();

    setIsLoading(true);
    try {
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profile/${profile.uid}`)
        .child('avatar');

      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });
      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const updates = await getUserUpdates(
        profile.uid,
        'avatar',
        downloadUrl,
        database
      );

      await database.ref().update(updates);

      setIsLoading(false);

      Alert.info('Avatar has been uploaded', 4000);
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.name}
        className="width-200 height-200 img-fullsize font-huge"
      />
      <div>
        <label
          htmlFor="avatar-upload"
          className="d-block cursor-pointer padded "
        >
          Select new Avatar
          <input
            id="avatar-upload"
            type="file"
            className="d-none"
            accept={fileInputTypes}
            onChange={onFileInputChange}
          />
        </label>
      </div>

      <Modal show={isOpen} onHide={close}>
        <ModalHeader>
          <ModalTitle>Adjust and Upload New Avatar</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <div className="d-flex justify-content-center align-items-center h-100">
            {img && (
              <AvatarEditor
                ref={avatarEditorRef}
                image={img}
                width={200}
                height={200}
                border={10}
                borderRadius={100}
                rotate={0}
              />
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <Button
            block
            appearance="ghost"
            onClick={onUploadClick}
            disabled={isLoading}
          >
            Upload
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AvatarUploadBtn;
