import React, { useContext, useState } from 'react';
import { MonthContext } from '../Context/MonthContext';
import { EventContext } from '../Context/EventContext';
import dayjs from 'dayjs';
import { FaEdit, FaFilter, FaBars } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { useParams } from 'react-router-dom';

const SideBar = () => {
  const { year, monthName } = useParams(); // Extract year and month from URL parameters
  const { selectedDay, setEventModalShow, setSelectedDay } = useContext(MonthContext); // Context for month-related state
  const { events, deleteEvent, setSelectedEvent } = useContext(EventContext); // Context for event-related actions
  const [filter, setFilter] = useState('All'); // State for filtering events
  const [showDetails, setShowDetails] = useState(null); // State to track which event details are shown
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State to manage sidebar visibility

  // Arrays and objects for month abbreviations and names
  const monthAbbreviations = ['jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
  const monthNames = {
    jan: 'January', feb: 'February', mar: 'March', apr: 'April', may: 'May', jun: 'June',
    jul: 'July', aug: 'August', sep: 'September', oct: 'October', nov: 'November', dec: 'December'
  };
  const index = monthAbbreviations.indexOf(monthName);

  // Filter events based on selected day or month and applied filter
  const filteredEvents = selectedDay 
    ? events.filter(event => dayjs(event.date).isSame(selectedDay, 'month'))
            .filter(event => filter === 'All' || event.tag === filter)
    : events.filter(event => {
        const eventDate = dayjs(event.date);
        return eventDate.year() === parseInt(year) && eventDate.month() === monthAbbreviations.indexOf(monthName);
      }).filter(event => filter === 'All' || event.tag === filter);

  // Toggle event details visibility
  const handleEventClick = (eventId) => {
    setShowDetails(showDetails === eventId ? null : eventId);
  };

  return (
    <div className='relative'>
      {/* Button to toggle sidebar visibility on small screens */}
      <button
        className='fixed top-34 left-0 z-40 text-xl p-2 bg-blue-600 text-white rounded-md md:hidden'
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{ marginLeft: '0.5rem' }} 
      >
        <FaBars />
      </button>

      {/* Overlay to close sidebar when clicking outside on small screens */}
      {isSidebarOpen && (
        <div
          className="overlay fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg p-4 transition-transform transform md:relative md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ zIndex: 100 }}
      >
        {/* Header section of the sidebar */}
        <div className='flex justify-between mb-4'>
          <h1 className='text-lg font-semibold'>
            {selectedDay ? selectedDay.format('MMMM YYYY') : `${monthNames[monthAbbreviations[index]]} ${year}`}
          </h1>
          {/* Filter menu for event tags */}
          <Menu as="div" className="relative inline-block text-left">
            <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <FaFilter className="mr-1" />
              {filter} <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
            </MenuButton>
            <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none">
              <div className="py-1">
                <MenuItem>
                  <p
                    onClick={() => setFilter('All')}
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                  >
                    All
                  </p>
                </MenuItem>
                <MenuItem>
                  <p
                    onClick={() => setFilter('Work')}
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                  >
                    Work
                  </p>
                </MenuItem>
                <MenuItem>
                  <p
                    onClick={() => setFilter('Personal')}
                    className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                  >
                    Personal
                  </p>
                </MenuItem>
              </div>
            </MenuItems>
          </Menu>
        </div>
        {/* List of filtered events */}
        <ul>
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <li key={event.id} className='bg-gray-100 mb-3 p-3 rounded-lg'>
                <div className='flex flex-col'>
                  {/* Event details */}
                  <div className='flex items-center'>
                    <div className='flex items-center mr-2'>
                      <button
                        onClick={() => handleEventClick(event.id)}
                        className='text-lg'
                      >
                        <CgDetailsMore />
                      </button>
                    </div>
                    <div className='flex justify-between w-full p-1'>
                      <div className='text-sm font-medium text-gray-900'>{event.title}</div>
                      <div className='text-xs text-gray-500'>{dayjs(event.date).format("DD MMM YYYY")}</div>
                    </div>
                    <div className='flex ml-2'>
                      <button
                        onClick={() => {
                          setSelectedEvent(event);
                          setEventModalShow(true);
                          setIsSidebarOpen(false);
                        }}
                        className='text-sm text-blue-600 hover:text-blue-800'
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => deleteEvent(event.id)}
                        className='text-sm text-red-600 hover:text-red-800 ml-2'
                      >
                        <MdDeleteOutline />
                      </button>
                    </div>
                  </div>
                  {/* Event description (shown when details button is clicked) */}
                  {showDetails === event.id && (
                    <div className='p-2 bg-gray-200 mt-2 rounded-md'>
                      <h2 className='font-semibold underline text-sm'>Description:</h2>
                      <p className='text-sm'>{event.description}</p>
                    </div>
                  )}
                </div>
              </li>
            ))
          ) : (
            <li className='text-sm text-gray-500'>No events for this month</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
