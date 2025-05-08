import "./BurgerPart.css";

interface Props {
  type: string;
  count: number;
  inc: (type: string) => {};
}

const BurgerPart = ({ type, count, inc }: Props) => {
  const capitalizedType = type.charAt(0).toUpperCase() + type.slice(1);
  return (
    <div
      onClick={() => {
        inc(`/${type}`);
      }}
      className="burgerpart"
    >
      <div>
        <h1>{capitalizedType}</h1>
        <img src={`https://cdn.nyabyte.dev/${type}.png`} />
      </div>
      <h2 className="count">{count}</h2>
    </div>
  );
};

export default BurgerPart;
