import axios from "axios";
import { api } from "../api";

export const useBurgerGame = (
  setClicks: (val: number) => void,
  setPatty: (val: number) => void,
  setLacksClicks: (val: boolean) => void
) => {
  const getClick = async () => {
    const response = await axios.get(`${api}/`);
    setClicks(response.data.clicks);
    setPatty(response.data.patty);
  };

  const incClick = async (type: string) => {
    try {
      await axios.post(`${api}/inc${type}`);
      setLacksClicks(false);
    } catch {
      setLacksClicks(true);
    }
  };

  return { getClick, incClick };
};
