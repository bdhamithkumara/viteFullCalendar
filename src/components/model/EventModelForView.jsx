import React, { useEffect, useState } from 'react'
import Modal from 'react-modal';

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

const EventModelForView = ({ isModalOpenForDetail, closeModalForDetail, clickEventData ,clickedTitle, clickedDescription , clickedInviteName ,clickedEventDateStart}) => {

    console.log(clickedEventDateStart) 

    const apiDate = new Date(clickedEventDateStart);

    const formattedDate = apiDate.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      console.log(formattedDate) 

    return (
        <Modal
            isOpen={isModalOpenForDetail}
            onRequestClose={closeModalForDetail}
            style={customStyles}
            contentLabel="Event individual Details"
        >
            <div className="bg-[#1a1a1a] text-white p-6 rounded-lg w-[350px]">
                <h2 className="text-2xl font-bold mb-4">{clickedTitle}</h2>
                <div className="flex items-center mb-4">
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
                        className="text-gray-400 mr-2"
                    >
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                    </svg>
                    <span>{formattedDate}</span>
                </div>
               {/* <div className="flex items-center mb-4">
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
                        className="text-gray-400 mr-2"
                    >
                        <path d="M3 7V5c0-1.1.9-2 2-2h2"></path>
                        <path d="M17 3h2c1.1 0 2 .9 2 2v2"></path>
                        <path d="M21 17v2c0 1.1-.9 2-2 2h-2"></path>
                        <path d="M7 21H5c-1.1 0-2-.9-2-2v-2"></path>
                        <rect width="7" height="5" x="7" y="7" rx="1"></rect>
                        <rect width="7" height="5" x="10" y="12" rx="1"></rect>
                    </svg>
                    <span className="mr-2">1 Participant</span>
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
                        className="text-gray-400"
                    >
                        <path d="M17 6.1H3"></path>
                        <path d="M21 12.1H3"></path>
                        <path d="M15.1 18H3"></path>
                    </svg>
                    <span className="border border-gray-600 px-2 py-1 rounded-md">1 Pending</span>
                </div> */}
                <div className="flex items-center mb-4">
                    <span className="relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full mr-2"></span>
                    <div>
                        <span className="font-bold">{clickedInviteName}</span>
                        <span className="block text-gray-400">invited</span>
                    </div>
                </div>
                <div className="flex items-center mb-4">
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
                        className="text-gray-400 mr-2"
                    >
                        <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                        <line x1="16" x2="16" y1="2" y2="6"></line>
                        <line x1="8" x2="8" y1="2" y2="6"></line>
                        <line x1="3" x2="21" y1="10" y2="10"></line>
                        <path d="m9 16 2 2 4-4"></path>
                    </svg>
                    <span>My Calendar</span>
                </div>
                <div className="flex items-center mb-4">
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
                        className="text-gray-400 mr-2"
                    >
                        <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <path d="M12 11h4"></path>
                        <path d="M12 16h4"></path>
                        <path d="M8 11h.01"></path>
                        <path d="M8 16h.01"></path>
                    </svg>
                    <span>{clickedDescription}</span>
                </div>
                {/*
            <div className="flex items-center">
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
                        className="text-gray-400 mr-2"
                    >
                        <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                        <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                    </svg>
                    <span>15 mins before by Email</span>
                </div>    
            */}
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-background h-10 px-4 py-2 border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white" onClick={closeModalForDetail}>
                    Cancel
                </button>
            </div>
        </Modal>
    )
}

export default EventModelForView