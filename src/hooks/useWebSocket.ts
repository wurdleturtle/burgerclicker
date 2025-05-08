import { useEffect } from "react";

export const useWebSocket = (
  setClicks: (val: number) => void,
  setPatty: (val: number) => void
) => {
  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setClicks(data.clicks);
      setPatty(data.patty);
    };

    return () => {
      ws.close();
    };
  }, []);
};
