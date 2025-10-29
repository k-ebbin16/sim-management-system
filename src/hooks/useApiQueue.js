// src/hooks/useApiQueue.js
import { useRef } from "react";

const useApiQueue = () => {
  const queue = useRef(Promise.resolve());

  const addToQueue = (apiCall) => {
    queue.current = queue.current.then(
      () => apiCall(),
      () => apiCall(), // Continue even if previous call failed
    );
    return queue.current;
  };

  return { addToQueue };
};

export default useApiQueue;
