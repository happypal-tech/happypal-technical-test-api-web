export type ButtonProps = React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
  className?: string;
};

export function Button(props: ButtonProps) {
  const { ...rest } = props;

  return <button {...rest} />;
}
