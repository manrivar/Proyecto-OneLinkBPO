import logo from './logo.svg';
import './App.css';
import { Home } from './Home';
import { Department } from './Department';
import { Employee } from './Employee';
import { SubArea } from './SubArea';
import { BrowserRouter, Route, Switch, NavLink } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
      <h3 className="d-flex justify-content-center m-3">
        Desarrollo web para proceso de seleccion en OneLink
      </h3>
      <hr></hr>

      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/home">
              Inicio
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/department">
              Area
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/subarea">
              Subarea
            </NavLink>
          </li>
          <li className="nav-item- m-1">
            <NavLink className="btn btn-light btn-outline-primary" to="/employee">
              Empleados
            </NavLink>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path='/home' component={Home} />
        <Route path='/department' component={Department} />
        <Route path='/employee' component={Employee} />
        <Route path='/subArea' component={SubArea} />
      </Switch>

    </div>
    </BrowserRouter>
  );
}

export default App;
