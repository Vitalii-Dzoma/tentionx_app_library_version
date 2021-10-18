import './App.css';
import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';
import FullTable from './components/Table/FullTable';

function App() {
  return (
    <div className="App">
      <Header />
      <Filter />
      <FullTable/>
    </div>
  );
}

export default App;
