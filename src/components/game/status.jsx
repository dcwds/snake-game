import { useContext } from "react"
import { GameContext } from "../context"

const Status = () => {
  const { gameOver } = useContext(GameContext)

  return <div>{gameOver ? "Game Over" : ""}</div>
}

export default Status
