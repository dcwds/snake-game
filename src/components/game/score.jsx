import { useContext } from "react"
import { GameContext } from "../context"

const Score = () => {
  const { score } = useContext(GameContext)

  return <div>Score: {score}</div>
}

export default Score
