import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { MonthProvider } from './Context/MonthContext.jsx';
import { EventContextProvider } from './Context/EventContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <EventContextProvider>
      <MonthProvider>
        <BrowserRouter basename="/tasktracker/">
          <App />
        </BrowserRouter>
      </MonthProvider>
    </EventContextProvider>
  </StrictMode>
);
