
import './App.css';
import Search from './Search.js';
import History from './History';
import Nav from './Nav';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Route path='/search/:query'>
          <Search />
        </Route>
        <Route path='/search'>
          <Search />
        </Route>
        <Route exact path='/history'>
          <History />
        </Route>
        <Route exact path='/'>
          <Search />
        </Route>
        
      </BrowserRouter>
    </div>
  );
}

export default App;
