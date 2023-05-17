import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { injectStore } from "./api/baseClient";
import { store } from "./store";
import App from './App';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-multi-carousel/lib/styles.css";
// Inject store here to prevent circular import issue
injectStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
    <ToastContainer/>
      <App />
    </BrowserRouter>
  </Provider>
);

