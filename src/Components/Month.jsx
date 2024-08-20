import React from 'react';
import Day from './Day.jsx';

const Month = ({ month }) => {
    return (
        <div
            className='grid grid-rows-5 w-full h-full overflow-auto'
        >
            {/* Map over each week in the month */}
            {month.map((week, i) => (
                <div
                    className='w-full h-full grid grid-cols-7 cursor-pointer'
                    key={i}
                >
                    {/* Map over each day in the week */}
                    {week.map((day, j) => (
                        <Day
                            day={day} // Pass the day object to the Day component
                            key={j} // Unique key for each day
                            idx={i} // Index of the week to identify the row
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default Month;
