import { useEffect, useState } from "react";

export const useVisible = (
  initialCount: number = 60,
  interval: number = 1000
) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [counter, setCounter] = useState<number>(initialCount);

  // Función para mostrar/ocultar el elemento de información
  const toggleInfo = () => {
    setIsVisible(!isVisible);
    resetCounter();
  };

  const resetCounter = () => {
    setCounter(initialCount);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (counter > 0) {
        setCounter((prevCounter) => prevCounter - 1);
        return;
      }
      setIsVisible(false);
      setCounter(initialCount);
    }, interval);

    console.log("useEffect", counter);

    return () => {
      clearTimeout(timer);
    };
  }, [interval, counter]);

  return {
    isVisible,
    counter,
    toggleInfo,
    resetCounter,
  };
};
