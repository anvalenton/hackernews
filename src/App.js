
import './App.css';
import Search from './Search.js';
import History from './History';
import Nav from './Nav';
import {BrowserRouter, Redirect, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <Route path='hackernews/search/:query'>
          <Search />
        </Route>
        <Route exact path='hackernews/search'>
          <Search />
        </Route>
        <Route exact path='hackernews/history'>
          <History />
        </Route>
        <Route exact path='/'>
          <Redirect to="hackernews/search" />
        </Route>
       
      </BrowserRouter>
    </div>
  );
}

export default App;
