import 'bootstrap/dist/css/bootstrap.css';

import React from 'react';
import * as ReactDOM from 'react-dom/client';
import {App} from './components/App';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {AppConfig, AppProvider} from './providers/App.provider.jsx';

// Used by [react-query] for caching the results of API requests.
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Disable automatic retrying of failed queries.
      retry: 0,
      // Disable caching to avoid outdated data.
      cacheTime: 0,
      // Disable re-fetching on window focus.
      refetchOnWindowFocus: false,
    },
  },
});

// Firebase options for authentication.
const firebaseOptions = {
  apiKey: 'AIzaSyAWILUsZ8eGWzgH1Ag_Zs1Yysp14zTZsOc',
  authDomain: 'college-project-7ea81.firebaseapp.com',
  projectId: 'college-project-7ea81',
  storageBucket: 'college-project-7ea81.appspot.com',
  messagingSenderId: '569744094891',
  appId: '1:569744094891:web:c0f0ab12634ae60aa6e9ee',
};

// App-wide shop configuration.
const config = new AppConfig({
  host: 'http://localhost:3000',
});

// React application entry point.
// Initializes react and third-party libraries, and renders the application.
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <AppProvider config={config} firebaseOptions={firebaseOptions}>
      <App/>
    </AppProvider>
  </QueryClientProvider>
);
