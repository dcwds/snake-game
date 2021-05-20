import { GAME_SIZE } from "../../constants"
import useGame from "../../hooks/use-game"
import Grid from "./grid"
import Score from "./score"
import PlayButton from "./play-button"
import * as S from "./game.style"

const Game = () => {
  const { gameOver, grid, score, paused, setPaused } = useGame()

  return (
    <>
      <S.GameHeader>
        <Score score={score} />
        {paused && <PlayButton setPaused={setPaused} />}
        {gameOver && <div>Game Over</div>}
      </S.GameHeader>
      <Grid size={GAME_SIZE} grid={grid} />
    </>
  )
}

export default Game
