import React from 'react';
import ReactDOM from 'react-dom/client';
import { Suspense } from 'react';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    
      <Suspense fallback={null}>
        <Toaster
          position="top-right"
          toastOptions={{ duration: 2000 }}
        />
        <App />
      </Suspense>
   
  </Provider>
);
