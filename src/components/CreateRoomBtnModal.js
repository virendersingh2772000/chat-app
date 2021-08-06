/* eslint-disable arrow-body-style */
import React, { useCallback, useRef, useState } from 'react';
import {
  Alert,
  Button,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Modal,
  Schema,
} from 'rsuite';
import firebase from 'firebase/app';
import ModalBody from 'rsuite/lib/Modal/ModalBody';
import ModalFooter from 'rsuite/lib/Modal/ModalFooter';
import ModalHeader from 'rsuite/lib/Modal/ModalHeader';
import ModalTitle from 'rsuite/lib/Modal/ModalTitle';
import { useModalState } from '../misc/custom-hooks';
import { database } from '../misc/firebase';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Chat name is required'),
  description: StringType().isRequired('Chat description is required'),
});

const INITIAL_STATE = {
  name: '',
  description: '',
};

const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();

  const [formValue, setFormValue] = useState(INITIAL_STATE);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      return;
    }

    setIsLoading(true);

    const newRoomData = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };

    try {
      await database.ref('rooms').push(newRoomData);

      Alert.info(`${formValue.name} has been created`, 4000);

      setIsLoading(false);
      setFormValue(INITIAL_STATE);
      close();
    } catch (err) {
      setIsLoading(false);
      Alert.error(err.message, 4000);
    }
  };

  return (
    <div className="mt-1">
      <Button block color="green" onClick={open}>
        <Icon icon="creative" />
        Create New Chat Room
      </Button>

      <Modal show={isOpen} onHide={close}>
        <ModalHeader>
          <ModalTitle>Create New Chat Room</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <FormGroup>
              <ControlLabel>Room Name</ControlLabel>
              <FormControl
                name="name"
                placeholder="Enter chat room name ... "
              />
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Enter Room Description ... "
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button
            block
            color="green"
            appearance="default"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Create new Chat Room
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
