import './App.css';
import Filter from './components/Filter/Filter';
import Header from './components/Header/Header';
// import FullTable from './components/Table/FullTable';
import MainTable from './components/Table/MainTable';

function App() {
  return (
    <div className="App">
      <Header />
      <Filter />
      {/* <FullTable/> */}
      <MainTable/>
    </div>
  );
}

export default App;
