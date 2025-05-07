import { useState, useEffect } from "react";
import "./App.css";
import Burger from "./components/Burger";
import axios from "axios";
import { api } from "./api";

function App() {
  const [clicks, setClicks] = useState(0);
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
    } catch (error) {
      console.error("Error fetching initial clicks:", error);
    }
  };

  const incClick = async () => {
    try {
      await axios.post(`${api}/inc`);
    } catch (error) {
      console.error("Error incrementing clicks:", error);
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
      <Burger setClicks={incClick} clicks={clicks} />
    </div>
  );
}

export default App;
