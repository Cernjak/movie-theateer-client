'use client';

import { IInput, TInputStatus } from "@/app/core/types/Input";

interface IProps {
  label: string;
  name: string;
  id: string;
  type: 'text' | 'email' | 'password',
  errorMsg: string;
  emptyMsg: string;
  input: IInput;
}

const Input = ({label, name, id, type, errorMsg, emptyMsg, input}: IProps) => {
  return (
    <div>
      <label htmlFor="id">{label}</label>
      <input type={type} id={id} name={name} value={input.value} onChange={input.handleChange}/>
      {input.status === 'error' && (
        <div>{errorMsg}</div>
      )}
      {input.status === 'empty' && (
        <div>{emptyMsg}</div>
      )}
    </div>
  );
};

export default Input;
