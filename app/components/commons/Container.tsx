interface IProps {
  children: React.ReactNode;
}
export default function Container({ children }: IProps) {
  return <main className="container mx-auto">{children}</main>;
}
