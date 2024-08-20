import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import MonthPage from './Pages/MonthPage';
import EventModal from './Components/EventModal';
import { MonthContext } from './Context/MonthContext';
import HomePage from './Pages/HomePage';

const App = () => {
  // Extract the eventModalShow state from the MonthContext
  const { eventModalShow } = useContext(MonthContext);

  return (
    <div>
      {/* Conditionally render the EventModal based on eventModalShow state */}
      {eventModalShow && <EventModal />}
      
      {/* Define the routes for the application */}
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<HomePage />} />
        {/* Route for the month page with dynamic year and monthName parameters */}
        <Route path="/:year/:monthName" element={<MonthPage />} />
      </Routes>
    </div>
  );
};

export default App;
