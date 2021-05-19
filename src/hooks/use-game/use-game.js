import { useEffect, useState } from "react"
import { grid as initialGrid } from "./fns"

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
  const [direction, setDirection] = useState("up")
  const [appleScore, setAppleScore] = useState(0)
  const [grid, setGrid] = useState(initialGrid)

  useEffect(() => {
    const setDirectionOnKeyDown = (e) => {
      const key = keyMap[e.key.replace(/arrow/i, "").toLowerCase()] || ""

      if (!!key && direction !== key.opposite) setDirection(key.dir)
    }

    window.addEventListener("keydown", setDirectionOnKeyDown, false)

    return () => window.removeEventListener("keydown", setDirectionOnKeyDown)
  }, [direction])

  return { appleScore, direction, grid }
}

export default useGame
