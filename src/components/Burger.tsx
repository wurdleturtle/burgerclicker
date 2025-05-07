import "./Burger.css";

interface Props {
  setClicks: React.Dispatch<React.SetStateAction<number>>;
  clicks: number;
}

const Burger = ({ setClicks, clicks }: Props) => {
  return (
    <div
      onClick={() => {
        setClicks((prevClicks: number) => prevClicks + 1);
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
