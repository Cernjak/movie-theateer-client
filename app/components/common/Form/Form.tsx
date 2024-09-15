'use client';

import { IInput } from '@/app/core/types/Input';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  inputs: IInput[];
  onSubmit: () => void;
}

const Form = ({ children, inputs, onSubmit }: IProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validArr: boolean[] = inputs.map((input) => {
      return input.validate();
    });

    if (validArr.includes(false)) return;
    onSubmit();
  };
  return <form onSubmit={handleSubmit}>{children}</form>;
};

export default Form;
