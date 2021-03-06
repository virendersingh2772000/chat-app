/* eslint-disable arrow-body-style */
import React, { useState, useCallback } from 'react';
import { Alert, Icon, Input, InputGroup } from 'rsuite';

const InputEditable = ({
  initialValue,
  onSave,
  label = null,
  placeholder = 'Type your Name',
  emptyMsg = "Name cann't be empty",
  wrapperClassName = '',
  ...inputProps
}) => {
  const [input, setInput] = useState(initialValue);
  const [editable, setEditable] = useState(false);

  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onEditClick = useCallback(() => {
    setEditable(p => !p);
    setInput(initialValue);
  }, [initialValue]);

  const onSaveClick = async () => {
    const trimmed = input.trim();

    if (trimmed === '') {
      Alert.info(emptyMsg, 4000);
      setEditable(true);
    }

    if (trimmed !== initialValue && trimmed !== '') {
      await onSave(trimmed);
      setEditable(false);
    }
  };

  return (
    <div className={wrapperClassName}>
      {label}
      <InputGroup>
        <Input
          {...inputProps}
          disabled={!editable}
          placeholder={placeholder}
          value={input}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditClick}>
          <Icon icon={editable ? 'close' : 'edit2'} />
        </InputGroup.Button>
        {editable && (
          <InputGroup.Button onClick={onSaveClick}>
            <Icon icon="check" />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default InputEditable;
