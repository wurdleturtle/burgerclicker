import { useState, useEffect } from "react";
import "./App.css";
import Burger from "./components/Burger";
import axios from "axios";
import { api } from "./api";
import BurgerPart from "./components/BurgerPart";

function App() {
  const [clicks, setClicks] = useState(0);
  const [patty, setPatty] = useState(0);
  const [lacksClicks, setLacksClicks] = useState(false);
  const [, setWs] = useState<WebSocket | null>(null);
  useEffect(() => {
    const websocket = new WebSocket(`ws://localhost:3000`);

    websocket.onopen = () => {
      getClick();
    };

    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Received click update:", data);
      setClicks(data.clicks);
      setPatty(data.patty);
    };

    setWs(websocket);

    return () => {
      console.log("Closing WebSocket connection");
      websocket.close();
    };
  }, []);

  const getClick = async () => {
    try {
      const response = await axios.get(`${api}/`);
      setClicks(response.data.clicks);
      setPatty(response.data.patty);
    } catch (error) {
      console.error("Error fetching initial clicks:", error);
    }
  };

  const incClick = async (type: string) => {
    try {
      await axios.post(`${api}/inc${type}`);
      setLacksClicks(false);
    } catch (error) {
      console.error("Error incrementing clicks:", error);
      setLacksClicks(true);
    }
  };

  return (
    <div className="app">
      <h1 className="title">Burger Game</h1>
      <button
        onClick={() => {
          getClick();
        }}
      >
        Get Current Clicks
      </button>
      <div className="BurgerContainer">
        <Burger setClicks={incClick} clicks={clicks} />
        <BurgerPart type="patty" count={patty} inc={incClick} />
      </div>
      {lacksClicks && <h1>You need more clicks!</h1>}
    </div>
  );
}

export default App;
