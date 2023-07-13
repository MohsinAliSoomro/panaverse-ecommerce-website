interface IProps {
  title: string;
  content: string;
}
export default function MaterialInfoItem(props: IProps) {
  const { title, content } = props;
  return (
    <div className="w-full my-10 lg:my-0">
      <h1 className="text-lg font-bold">{title}</h1>
      <p className="text-sm">{content}</p>
    </div>
  );
}
