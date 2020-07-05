import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './App.css';
import NombresApellidos from './components/Formulario/NombresApellidos/NombresApellidos';
import InfoNegocio from './components/Formulario/InfoNegocio/InfoNegocio';
import InicioComponent from './components/InicioComponent/InicioComponent';
import UbicacionComponent from './components/Formulario/Ubicacion/Ubicacion';
import BusquedaComponent from './components/BusquedaComponent/BusquedaComponent';
import { CSSTransition, TransitionGroup } from "react-transition-group";

class App extends Component {
  render() {
    return (
      
      <Router>
      <div>
        <Route
          render={({ location }) => (
            <TransitionGroup className="container2">
              <CSSTransition
                appear={true}
                key={location.key}
                timeout={{ enter: 400, exit: 200 }}
                classNames="fade">
                  
                <div className="inner">
                  <Switch key={location.key} location={location}>
                  <Route exact path="/" component={InicioComponent} />
                    <Route exact path="/nombresApellidos" component={NombresApellidos} />

                    <Route path="/negocio" component={InfoNegocio} />
                    <Route path="/ubicacion" component={UbicacionComponent} />
                    <Route path="/busqueda" component={BusquedaComponent} />
              
                    <Route component={NombresApellidos} />
                  </Switch>
                </div>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </div>
    </Router>
    );
  }
}
export default App;