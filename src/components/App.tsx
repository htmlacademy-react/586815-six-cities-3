import MainPage from '../pages/main-page';
import { CardType } from '../types/common';

function App({cards}:{cards:CardType[]}): JSX.Element {
  return (
    <MainPage cards={cards} />
  );
}

export default App;
