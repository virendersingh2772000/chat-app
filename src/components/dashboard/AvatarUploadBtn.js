/* eslint-disable */
import React, { useState } from 'react';
import { Alert, Button, Modal } from 'rsuite';
import AvatarEditor from 'react-avatar-editor';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import ModalHeader from 'rsuite/lib/Modal/ModalHeader';
import ModalTitle from 'rsuite/lib/Modal/ModalTitle';
import { useModalState } from '../../misc/custom-hooks';

const fileInputTypes = '.png, .jpg, .jpeg';
const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];

const isValidFile = file => acceptedFileTypes.includes(file.type);

const AvatarUploadBtn = () => {
  const { isOpen, open, close } = useModalState();

  const [img, setImg] = useState(null);

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

  return (
    <div className="mt-3 text-center">
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
          <Button block appearance="ghost">
            Upload
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default AvatarUploadBtn;
