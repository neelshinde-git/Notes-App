import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import store from "./redux/store"
//import "../node_modules/bootstrap/dist/css/bootstrap.min.css"

ReactDOM.render(
    <Provider store={store}>
          <App />
      </Provider>, document.getElementById("root"));
