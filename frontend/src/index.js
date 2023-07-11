import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import store from './store';
import App from './App';

// import { Provider } from 'react-redux';
// import { BrowserRouter } from 'react-router-dom';
//import store from './app/store';
// import CartProvider from './contexts/CartProvider';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     {/* <Provider store={store}> */}
//       <BrowserRouter>
//         {/* <CartProvider> */}
//           <App />
//         {/* </CartProvider> */}
//       </BrowserRouter>
//     {/* </Provider> */}
//   </React.StrictMode>,
//   document.getElementById('root')
// );
// reportWebVitals();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
      <App />
  </Provider>
);


