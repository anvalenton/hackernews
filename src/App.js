
import './App.css';
import Search from './Search.js';
import History from './History';
import Nav from './Nav';
import {Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
    
        <Nav />
        <Route path='/search/:query' component={Search} />
        <Route exact path='/search'component={Search} />
        <Route exact path='/history' component={History} />
        <Route exact path='/' component={Search} />
  
      
     
    </div>
  );
}

export default App;
