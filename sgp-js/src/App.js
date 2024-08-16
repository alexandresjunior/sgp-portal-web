import { GlobalProvider } from './contextos/GlobalContext';
import Rotas from './rotas';
import './App.scss';

function App() {
  return (
    <GlobalProvider>
      <Rotas />
    </GlobalProvider>
  );
}

export default App;
