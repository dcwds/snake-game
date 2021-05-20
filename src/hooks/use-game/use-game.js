import { useEffect, useState, useRef } from "react"
import { GAME_SIZE } from "../../constants"
import { getNextFrame, drawApple } from "./fns"

const initialState = {
  score: 0,
  dir: "up",
  snake: [
    { x: Math.floor(GAME_SIZE / 2), y: Math.floor(GAME_SIZE / 2) - 1 }, // head
    { x: Math.floor(GAME_SIZE / 2), y: Math.floor(GAME_SIZE / 2) },
    { x: Math.floor(GAME_SIZE / 2), y: Math.floor(GAME_SIZE / 2) + 1 } // tail
  ],
  grid: Array(GAME_SIZE)
    .fill([])
    .map((arr) => Array(GAME_SIZE).fill(0))
}

const dirs = {
  u: { dir: "up", opposite: "down" },
  d: { dir: "down", opposite: "up" },
  l: { dir: "left", opposite: "right" },
  r: { dir: "right", opposite: "left" }
}

const keyMap = {
  w: dirs.u,
  up: dirs.u,
  s: dirs.d,
  down: dirs.d,
  a: dirs.l,
  left: dirs.l,
  d: dirs.r,
  right: dirs.r
}

const useGame = () => {
  const [game, setGame] = useState(initialState)
  const [paused, setPaused] = useState(true)
  const [gameOver, setGameOver] = useState(false)

  let firstTick = useRef(true)

  useEffect(() => {
    const setDirectionOnKeyDown = (e) => {
      const key = keyMap[e.key.replace(/arrow/i, "").toLowerCase()] || ""

      if (!!key && game.dir !== key.opposite)
        setGame((s) => ({ ...s, dir: key.dir }))
    }

    window.addEventListener("keydown", setDirectionOnKeyDown, false)

    return () => window.removeEventListener("keydown", setDirectionOnKeyDown)
  }, [game.dir])

  useEffect(() => {
    const tick = setInterval(() => {
      console.log(game.score)
      if (paused || gameOver) return clearInterval(tick)

      let { appleEaten, collision, nextGrid, nextSnake } = getNextFrame(
        game.grid.map((a) => [...a]),
        game.snake,
        game.dir
      )

      if (firstTick.current) {
        nextGrid = drawApple(nextGrid)
        firstTick.current = false
      }

      if (appleEaten) {
        nextGrid = drawApple(nextGrid)
        setGame((s) => ({ ...s, score: game.score++ }))
      }

      if (collision) {
        setGameOver(true)

        // UX consideration, as immediate reset of state
        // can feel quite jarring when collision occurs, ending the game.
        setTimeout(() => {
          setGameOver(false)
          setPaused(true)
          setGame(initialState)
        }, 1000)

        firstTick.current = true

        return clearInterval(tick)
      }

      setGame((s) => ({ ...s, grid: nextGrid, snake: nextSnake }))
    }, 50)

    return () => clearInterval(tick)
  }, [game.score, game.grid, game.snake, game.dir, paused, gameOver])

  return { ...game, gameOver, paused, setPaused }
}

export default useGame
