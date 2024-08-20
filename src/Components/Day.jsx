import dayjs from 'dayjs';
import React, { useContext } from 'react';
import { MonthContext } from '../Context/MonthContext';
import { EventContext } from '../Context/EventContext';

const Day = ({ day, idx }) => {
  const { setEventModalShow, setSelectedDay } = useContext(MonthContext);
  const { events, setSelectedEvent } = useContext(EventContext);

  // Format for comparison and display
  const formattedDay = day.format('DD-MM-YY');

  return (
    <div className='flex flex-col items-center w-full h-full'>
      {/* Hide the day name for the first index (if needed) */}
      <p className={`${idx >= 1 ? 'hidden' : ''}`}>
        {day.format('ddd')}
      </p>

      <div
        className={`w-full h-full mb-2 border-2 border-gray-200 flex flex-col items-center justify-center cursor-default`}
        onClick={() => {
          setEventModalShow(true);
          setSelectedDay(day);
        }}
      >
        {/* Highlight the current day */}
        <p
          className={`${formattedDay === dayjs().format('DD-MM-YY') ? 'bg-blue-600 rounded-full text-white p-1' : ''}`}
        >
          {day.format('DD')}
        </p>
        
        {/* Display events for the current day with overflow control */}
        <div 
            className='bg-blue-500 w-full rounded-sm max-h-20 overflow-y-auto'
        >
          {events
            .filter(event => dayjs(event.date).format('DD-MM-YY') === formattedDay)
            .map((event, index) => (
              <p 
                key={index} 
                className='text-white truncate px-2 py-1 cursor-pointer'
                onClick={() => {
                    setEventModalShow(true);
                    setSelectedEvent(event);
                }}
              >
                {event.title}
              </p>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default Day;
