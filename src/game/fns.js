// 15x15 grid
// snake:
//  - controlled by cursor keys or WASD
//  - starts at length 3
//  - if snake head collides with borders or its body, the game ends
// apple:
//  - appears in random position on grid that is not occupied
//  - when captured, increase snake length and score by 1
//  - after captured, new apple appears on grid in cell that is not occupied
// score:
//  - count is equal to how many times apple has been collected

// movement:
// - head continues in original direction unless input is received to change direction
// - body part mirrors its sibling's last location (nearest to the head)
// - captured apple becomes new snake head (unshift)

// apple placement:
// - x, y generated from random values (Math.floor(Math.random() * 15))
// - regenerate generated values if cell is occupied (by snake)
// - consider not placing in "soft edges" (right next to walls)

let mercyTickCount = 0
let currFrame = Array(15).fill([]).map((arr) => Array(15).fill(0))
let currSnake = [
  { x: 7, y: 6 }, // head
  { x: 7, y: 7 },
  { x: 7, y: 8 }  // tail
]

const dirModifiers = {
  up: { modX: 0, modY: -1 },
  down: { modX: 0, modY: 1 },
  left: { modX: -1, modY: 0 },
  right: { modX: 1, modY: 0 }
}

const nextGameFrame = (currFrame, snake, dir, appleCapture = false) => {
  const { modX, modY } = dirModifiers[dir]
  const nextSnakePos = { x: snake[0].x + modX, y: snake[0].y + modY }
  let valueAtNextSnakePos =  null

  console.log(currFrame)
  console.log(snake)

  if (
      currFrame[nextSnakePos.y] !== undefined 
      && currFrame[nextSnakePos.y][nextSnakePos.x] !== undefined
  ) {
    valueAtNextSnakePos = currFrame[nextSnakePos.y][nextSnakePos.x]
  }

  switch(valueAtNextSnakePos) {
    case 2: // apple
      snake = [nextSnakePos, ...snake]
      return nextGameFrame(currFrame, snake, dir, true)
    case 1: // snake
      return {
        appleCapture: false,
        collision: true,
        nextFrame: null,
        snake
      }
    case null: // wall
      return {
        appleCapture: false,
        collision: true,
        nextFrame: null,
        snake
      }
    default:
      snake = snake.map(
        (link, idx) => snake[idx - 1] !== undefined ? snake[idx - 1] : nextSnakePos
      )

      return {
        appleCapture,
        collision: false,
        nextFrame: drawSnake(snake, currFrame),
        snake
      }
  }
}

const drawSnake = (snake, frame) => {
  // deep copy
  let frameClone = frame.map((inner) => inner.slice())

  snake.forEach((link) => {
    frameClone[link.y][link.x] = 1
  })

  return frameClone
}

// I think recursion is probably a poor strategy here, as the snake
// grows, so does the probability of generating an apple cell that is occupied
const drawApple = (frame) => {
  let frameClone = frame.map((inner) => inner.slice())

  const getRandom = (min, max) => Math.floor(Math.random() * (max - min) + min)
  const nextApplePos = { x: getRandom(1, 14), y: getRandom(1, 14) }
  let valueAtNextApplePos = frameClone[nextApplePos.y][nextApplePos.x]

  // occupied by snake
  if(valueAtNextApplePos === 1) return drawApple(frameClone)
  else {
    valueAtNextApplePos = 2
    return frameClone
  }
}

const gameLoop = setInterval(() => {
  let {
    appleCapture,
    collision,
    nextFrame,
    snake
  } = nextGameFrame(currFrame, currSnake, "up")

  if (collision) {
    mercyTickCount++
    
    if(mercyTickCount === 1) return
    else if (mercyTickCount > 1) return clearInterval(gameLoop)
  }

  if(appleCapture) {
    currFrame = drawApple(nextFrame)
    return
  }

  mercyTickCount = 0
  currFrame = nextFrame
  currSnake = snake
}, 1000)
