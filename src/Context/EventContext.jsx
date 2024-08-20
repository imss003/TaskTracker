import React, { createContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import { v4 as uuidv4 } from 'uuid'; // Import uuid for generating unique IDs

export const EventContext = createContext();

export const EventContextProvider = ({ children }) => {
  // Initialize events from localStorage or set default based on environment
  const [events, setEvents] = useState(() => {
    const storedEvents = localStorage.getItem("events");
    
    // Check if environment is development
    if (process.env.NODE_ENV === 'development') {
      // Return default events with sample event in development
      return storedEvents
        ? JSON.parse(storedEvents)
        : [
            {
              id: uuidv4(), // Use uuid to generate a unique ID
              title: "Sample Event",
              description: "This is a sample event",
              date: dayjs().format(), // Default event date as today's date
              tag: "Sample Tag"
            },
          ];
    }

    // Return stored events or empty array in other environments
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  // Effect to save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  // Function to add a new event
  const addEvent = (title, description, day, tag) => {
    const newEvent = {
      id: uuidv4(), // Use uuid to generate a unique ID for new events
      title,
      description,
      date: day,
      tag
    };
    setEvents([...events, newEvent]);
    console.log("Event added");
  };

  // Function to delete an event by ID
  const deleteEvent = (id) => {
    // Remove the event from the state
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);

    // Update localStorage with the new events list
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  // Function to update an existing event by ID
  const updateEvent = (id, title, description, tag) => {
    const updatedEvents = events.map((event) =>
      event.id === id ? { ...event, title, description, tag } : event
    );
    setEvents(updatedEvents);

    // Update localStorage with the new events list
    localStorage.setItem("events", JSON.stringify(updatedEvents));
  };

  const [selectedEvent, setSelectedEvent] = useState(null);

  const value = {
    events,
    addEvent,
    deleteEvent,
    updateEvent,
    selectedEvent,
    setSelectedEvent
  };

  return (
    <EventContext.Provider value={value}>
      {children}
    </EventContext.Provider>
  );
};
