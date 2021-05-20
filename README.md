# Snake Game

Eat apples, earn points. Don't eat yourself or the walls.

## What I Learned

- I was able to get a bit of a performance boost from React [memo](https://reactjs.org/docs/react-api.html#reactmemo)
- I found a reasonable use-case for [useRef](https://reactjs.org/docs/hooks-reference.html#useref) in the [useGame](src/hooks/use-game/use-game.js) hook
- This was the first time I worked with a game loop.

## Todo

- [ ] Add controls for mobile, as the game is currently keyboard-driven
- [ ] Fix some strange states when keys are quickly pressed
- [ ] Performance optimizations (I've considered offloading some calculations to GPU)
- [ ] Canvas implementation
- [ ] Better styling

## Technologies

- Bootstrapped with [Create React App](https://create-react-app.dev/)
- Styles with [Styled Components](https://styled-components.com/)
