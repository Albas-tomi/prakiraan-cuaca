export interface CustomInputProps {
  type: string;
  name: string;
  placeholder: string;
  value?: string;
  label?: string;
  id: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
