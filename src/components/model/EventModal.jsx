import React, { useState } from 'react';
import Modal from 'react-modal';
import { v4 as uuid } from "uuid";

const customStyles = {
  content: {
    position: 'absolute',
    top: '50%',
    left: '88%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

Modal.setAppElement('#root');

const EventModal = ({ isOpen, closeModal, setEvents, events}) => {
  const [eventName, setEventName] = useState('');
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate]= useState('');

  // const handleInputChange = (e) => {
  //   setEventName(e.target.value);
  // };



  const handleSave = () => {

    //const { start, end } = info;
    if (eventName) {
      setEvents([
        ...events,
        {
          start: startDate,
          end: endDate,
          title: eventName,
          description : 'test',
          extendedProps : [
            {
              
            }
          ],
          id: uuid()
        }
      ]);
      closeModal();
    }
    //onSave(eventName);
    setEventName('');
    setStartDate('')
    setEndDate('')
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Event Details"
    >
      {/*<h2>Enter Event Details</h2>
      <label>
        Event Name:
        <input type="text" value={eventName} onChange={handleInputChange} />
      </label>
      <button onClick={handleSave}>Save</button>
      <button onClick={closeModal}>Cancel</button>*/}


      <div className="bg-[#1a1a1a] text-white p-6 rounded-lg w-[350px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-500"
          >
            <circle cx="12" cy="12" r="10"></circle>
          </svg>
          <input
          type="text"
          className="flex h-10 border border-input text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[#333] rounded-md py-2 px-3 w-32"
          placeholder="Event Title" value={eventName} onChange={event => setEventName(event.target.value)}
        />
        </div>
       
      </div>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=""
          >
            <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
            <line x1="16" x2="16" y1="2" y2="6"></line>
            <line x1="8" x2="8" y1="2" y2="6"></line>
            <line x1="3" x2="21" y1="10" y2="10"></line>
          </svg>
          <div className="flex items-center space-x-2">
            <input
              type="date"
              className="flex h-10 border border-input text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[#333] rounded-md py-2 px-3 w-32"
              placeholder="Jan 5 2024" value={startDate} onChange={event => setStartDate(event.target.value)}
            />
            <span>→</span>
            <input
              type="date"
              className="flex h-10 border border-input text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[#333] rounded-md py-2 px-3 w-32"
              placeholder="Jan 5 2024" value={endDate} onChange={event => setEndDate(event.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            role="checkbox"
            aria-checked="false"
            data-state="unchecked"
            value="on"
            className="peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
            id="all-day"
          ></button>
          {/*<label htmlFor="all-day" className="text-sm font-medium leading-none">
            All day
  </label> */}
        </div>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=""
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          <input
            type="text"
            className="flex h-10 border border-input text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[#333] rounded-md py-2 px-3 w-full"
            placeholder="Invite individual participants or your groups"
          />
        </div>
        <div className="flex items-center space-x-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className=""
          >
            <line x1="2" x2="5" y1="12" y2="12"></line>
            <line x1="19" x2="22" y1="12" y2="12"></line>
            <line x1="12" x2="12" y1="2" y2="5"></line>
            <line x1="12" x2="12" y1="19" y2="22"></line>
            <circle cx="12" cy="12" r="7"></circle>
          </svg>
          <input
            type="text"
            className="flex h-10 border border-input text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 bg-[#333] rounded-md py-2 px-3 w-full"
            placeholder="Location"
          />
        </div>
       
      </div>
      <div className="flex space-x-2 mt-4">
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-primary-foreground h-10 px-4 py-2 bg-blue-600 hover:bg-blue-700" onClick={handleSave}>
          Save
        </button>
        <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background h-10 px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white" onClick={closeModal}>
          Cancel
        </button>
      </div>
    </div>

    </Modal>
  );
};

export default EventModal;
