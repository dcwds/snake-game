import Provider from "../context"
import * as Game from "../game"
import { GAME_SIZE } from "../../constants"
import * as S from "./app.style"

const App = () => (
  <Provider>
    <S.GameWrapper>
      <div>
        <header>Snake Game</header>
        <>
          <Game.Grid size={GAME_SIZE} />
        </>
      </div>
    </S.GameWrapper>
  </Provider>
)

export default App
