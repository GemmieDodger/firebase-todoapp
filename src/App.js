import logo from './logo.svg';
import './App.css';
import CreateTodo from './components/CreateTodo';
import Edit from './components/Edit';
import Home from './views/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route exact path='/create' component={CreateTodo} />
          <Route exact path='/edit/:id' component={Edit} />
        </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
