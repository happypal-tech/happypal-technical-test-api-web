import { useFormContext } from 'react-hook-form';
import classNames from 'classnames';

export type FormInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
  name: string;
  className?: string;
};

export function FormInput(props: FormInputProps) {
  const { name, className, ...rest } = props;

  const { register } = useFormContext();

  return <input {...rest} className={classNames(className)} {...register(name)} />;
}
