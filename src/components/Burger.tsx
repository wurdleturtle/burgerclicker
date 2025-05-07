import "./Burger.css";

interface Props {
  setClicks: (type: string) => {};
  clicks: number;
}

const Burger = ({ setClicks, clicks }: Props) => {
  return (
    <div
      onClick={() => {
        setClicks("");
      }}
      className="Burger"
    >
      <h1>Burger</h1>
      <img src="https://cdn.nyabyte.dev/burger.png" />
      <h2>{clicks}</h2>
    </div>
  );
};
export default Burger;
