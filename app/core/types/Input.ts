export interface IInput {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  handleChange: (e: React.FormEvent<HTMLInputElement>) => void;
  validate: () => boolean;
  valid: boolean;
  status: TInputStatus;
}

export type TInputStatus = 'initial' | 'error' | 'empty' | 'valid';
