import { createContext } from "react"
import useGame from "../hooks/use-game"

export const GameContext = createContext()

const Provider = ({ children }) => {
  const game = useGame()

  return (
    <GameContext.Provider value={{ ...game }}>{children}</GameContext.Provider>
  )
}

export default Provider
