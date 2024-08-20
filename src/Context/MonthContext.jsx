import React, { createContext, useState, useEffect } from 'react';
import dayjs from 'dayjs';

export const MonthContext = createContext();

export const MonthProvider = ({ children }) => {
    const [monthIndex, setMonthIndex] = useState(() => {
        const savedMonthIndex = localStorage.getItem('monthIndex');
        return savedMonthIndex !== null ? parseInt(savedMonthIndex, 10) : dayjs().month();
    });

    const [year, setYear] = useState(() => {
        const savedYear = localStorage.getItem('year');
        return savedYear !== null ? parseInt(savedYear, 10) : dayjs().year();
    });

    const [eventModalShow, setEventModalShow] = useState(false);

    const [selectedDay, setSelectedDay] = useState(() => {
        const savedSelectedDay = localStorage.getItem('selectedDay');
        return savedSelectedDay === 'null' ? null : (savedSelectedDay ? dayjs(savedSelectedDay) : dayjs());
    });

    useEffect(() => {
        localStorage.setItem('monthIndex', monthIndex);
        localStorage.setItem('year', year);
    }, [monthIndex, year]);

    useEffect(() => {
        localStorage.setItem('selectedDay', selectedDay ? selectedDay.format() : 'null');
    }, [selectedDay]);

    const value = {
        monthIndex,
        setMonthIndex,
        year,
        setYear,
        eventModalShow,
        setEventModalShow,
        selectedDay,
        setSelectedDay
    };

    return (
        <MonthContext.Provider value={value}>
            {children}
        </MonthContext.Provider>
    );
};
