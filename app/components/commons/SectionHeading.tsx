interface IProps {
  heading: string;
  content: string;
}
export default function SectionHeading({ content, heading }: IProps) {
  return (
    <>
      <p className="text-blue-600 text-center text-sm font-semibold">{heading}</p>
      <h1 className="text-3xl font-bold text-center">{content}</h1>
    </>
  );
}
