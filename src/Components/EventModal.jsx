import React, { useContext, useState } from 'react';
import { IoIosClose } from "react-icons/io";
import { MonthContext } from '../Context/MonthContext';
import { EventContext } from '../Context/EventContext';
import dayjs from 'dayjs';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const EventModal = () => {
    // Extract relevant context values for modal visibility, selected day, and event management
    const { setEventModalShow, selectedDay } = useContext(MonthContext);
    const { addEvent, updateEvent, selectedEvent, setSelectedEvent } = useContext(EventContext);

    // Initialize state for form fields, with default values based on the selectedEvent if available
    const [title, setTitle] = useState(selectedEvent ? selectedEvent.title : "");
    const [desc, setDesc] = useState(selectedEvent ? selectedEvent.description : "");
    const [tag, setTag] = useState(selectedEvent ? selectedEvent.tag : "");

    // Handle form submission for adding or updating an event
    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedEvent) {
            // Update the existing event
            updateEvent(selectedEvent.id, title, desc, tag);
        } else {
            // Add a new event
            addEvent(title, desc, selectedDay, tag);
        }
        // Hide the modal and reset selected event
        setEventModalShow(false);
        setSelectedEvent(null);
    };

    return (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4'>
            {/* Modal container with styling for centering and ensuring it is above other components */}
            <div className='relative bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-lg h-auto flex flex-col items-end p-4'
                style={{ zIndex: 9999 }} // Ensure the modal is on top
            >
                {/* Close button to hide the modal */}
                <button
                    onClick={() => {
                        setEventModalShow(false);
                        setSelectedEvent(null);
                    }}
                    className='absolute top-2 right-2 text-gray-700 hover:text-gray-900'
                >
                    <IoIosClose className='w-8 h-8' />
                </button>

                <form className='w-full flex flex-col items-center justify-center' onSubmit={handleSubmit}>
                    <h1 className='text-xl md:text-2xl mb-4 font-bold'>
                        {selectedEvent ? 'Edit Event' : 'Add Event'}
                    </h1>

                    {/* Input field for event title */}
                    <div className='flex flex-col w-full mb-4'>
                        <label htmlFor="title" className='font-semibold mb-2'>Title</label>
                        <input
                            type="text"
                            placeholder='Add Title'
                            id='title'
                            className="border-b-2 border-gray-300 focus:border-blue-600 focus:outline-none text-gray-600 text-base py-2 px-4 rounded-md"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    {/* Textarea for event description */}
                    <div className='flex flex-col w-full mb-4'>
                        <label htmlFor="desc" className='font-semibold mb-2'>Description</label>
                        <textarea
                            id="desc"
                            placeholder='Add Description'
                            className="border-b-2 border-gray-300 focus:border-blue-500 focus:outline-none text-gray-600 text-base py-2 px-4 rounded-md"
                            rows="4"
                            value={desc}
                            onChange={(e) => setDesc(e.target.value)}
                        />
                    </div>

                    {/* Dropdown menu for selecting event tag */}
                    <div className='w-full mb-4'>
                        <Menu as="div" className="relative w-full">
                            <MenuButton className="inline-flex w-full justify-between rounded-md bg-white py-2 px-4 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50">
                                {tag || "Select Tag"}
                                <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                            </MenuButton>
                            <MenuItems className="absolute right-0 mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                <div className="py-1">
                                    {/* Tag options */}
                                    <MenuItem>
                                        <p
                                            onClick={() => setTag('Work')}
                                            className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                                        >
                                            Work
                                        </p>
                                    </MenuItem>
                                    <MenuItem>
                                        <p
                                            onClick={() => setTag('Personal')}
                                            className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100"
                                        >
                                            Personal
                                        </p>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>

                    {/* Buttons for cancelling or saving the event */}
                    <div className='flex justify-between w-full'>
                        <button
                            type="button"
                            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md"
                            onClick={() => {
                                setEventModalShow(false);
                                setSelectedEvent(null);
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                        >
                            Save
                        </button>
                    </div>

                    {/* Display the selected date for the event */}
                    <div className='mt-4 text-center text-gray-600'>
                        {selectedEvent ? dayjs(selectedEvent.date).format('dddd, MMMM DD') : selectedDay.format('dddd, MMMM DD')}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EventModal;
