'use client';

import { useState } from 'react';
import { IInput, TInputStatus } from '../types/Input';

interface IProps {
  initialValue?: string;
  validation?: (value: string) => boolean;
}

const useInput = ({ initialValue, validation }: IProps): IInput => {
  const [value, setValue] = useState(initialValue || '');
  const [valid, setValid] = useState(false);
  const [status, setStatus] = useState<TInputStatus>('initial');

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setValue(e.currentTarget.value);
    setStatus('initial');
  };

  const validate = (): boolean => {
    if (!validation) {
      setValid(true);
      return true;
    }
    if (!value) {
      setStatus('empty');
      setValid(false);
      return false;
    } else {
      const valid = validation(value.trim());
      setValid(valid);
      setStatus(valid ? 'valid' : 'error');
      return valid;
    }
  };

  return { value, setValue, handleChange, validate, valid, status };
};

export default useInput;
