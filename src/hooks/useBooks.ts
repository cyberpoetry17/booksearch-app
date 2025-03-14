import { useContext } from "react";
import { BookContext } from "../store";

export const useBooks = () => {
  const context = useContext(BookContext);
  if (!context)
    throw new Error("Error useBooks hook must be used within a provider!");
  return context;
};
