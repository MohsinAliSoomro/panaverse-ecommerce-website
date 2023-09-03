"use client"
import { useEffect, useState } from "react";

export default function useWindowSize() {
  const [width, setWidth] = useState(window.innerHeight);
  const [height, setHeight] = useState(window.innerWidth);

  useEffect(() => {
    setHeight(window.innerHeight);
    setWidth(window.innerWidth);
    window.addEventListener("resize", () => {
      setHeight(window.innerHeight);
      setWidth(window.innerWidth);
    });
    return () => {
      window.removeEventListener("resize", () => {
        setHeight(window.innerHeight);
        setWidth(window.innerWidth);
      });
    };
  }, []);

  return {
    width,
    height,
  };
}
