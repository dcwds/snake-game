import Game from "../game"
import * as S from "./app.style"

const App = () => (
  <S.GameWrapper>
    <div>
      <header>Snake Game</header>
      <Game />
    </div>
  </S.GameWrapper>
)

export default App
