import './App.css';
import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';
import SearchField from './components/SearchField/SearchField';
import CollapsibleTable from './components/Table/Table';

function App() {
  return (
    <div className="App">
      <Header />
      <Filter />
      <SearchField />
      <CollapsibleTable/>
    </div>
  );
}

export default App;
