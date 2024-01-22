import { useState, useEffect } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import multiMonthPlugin from '@fullcalendar/multimonth'
import Modal from 'react-modal';
import EventModal from './components/model/EventModal';
import './App.css'
import OpenChatModal from './components/model/OpenChatModal';
import { supabase } from './supabaseClient';


Modal.setAppElement('#root');

const openModal = (info, setClickedEvent, setIsOpen) => {
  setClickedEvent(info);
  setIsOpen(true);
};

const closeModal = (setIsOpen) => {
  setIsOpen(false);
};

const events1 = [
  {
    title: 'event1',
    description: 'description for All Day Event 1',
    start: '2024-01-01'
  },
  {
    title: 'event2',
    description: 'description for All Day Event 2',
    start: '2024-01-05',
    end: '2024-01-07',
    extendedProps: [
      {
        user: 'damith',
        responseStatus: 'accepted',
      },
      {
        user: 'rashmi',
        responseStatus: 'rejected',
      }]
  },
  {
    title: 'event3',
    start: '2024-01-09T12:30:00',
    description: 'description for All Day Event 3',
    allDay: false // will make the time show
  },

  //{
  //groupId: 'blueEvents', // recurrent events in this group move together
  //daysOfWeek: [ '4' ],
  //startTime: '10:45:00',
  //endTime: '12:45:00'
  //},

]


function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const user = JSON.parse(window.localStorage.getItem('user'))

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const EventItem = ({ info }) => {
    const { event } = info;
    return (
      <div>
        <p>{event.title}</p>
      </div>
    );
  };


  // useEffect(() => {
  //   const containerEl = document.querySelector("#events");
  //   new Draggable(containerEl, {
  //     itemSelector: ".event",
  //     eventData: (eventEl) => {
  //       return {
  //         title: eventEl.innerText
  //       };
  //     }
  //   });
  // }, []);

  const [events, setEvents] = useState([]);
  const [newEvents, setyNewEvents] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [clickedEvent, setClickedEvent] = useState(null);

  const [sendToDatabase, setSendToDatabase] = useState(false)

  const handleSelect = () => {
    setIsModalOpen(true);
  };


  useEffect(() => {
    setyNewEvents(events)
    //getCalenderDataFromDatabase()
    saveToCalenderData()
    console.log(newEvents)
  }, [events])


  // const getCalenderDataFromDatabase = async () => {

  //   try {
  //     let { data , error } = await supabase
  //       .from('calender')
  //       .select('content')
  //       .eq( 'user_id' , user.id)



  //     if (!error) {
  //       console.log('get the calender data from supabase:', data)
  //       setyNewEvents(data.content)
  //     } else {
  //       console.error('Error get the calender data from supabase:', error)
  //     }
  //   } catch (error) {
  //     console.error('Error get the calender data from supabase:', error)
  //   }
  // }


  const saveToCalenderData = async () => {

    //if(sendToDatabase){
    try {
      const { data, error } = await supabase
        .from('calender')
        .insert([
          {
            user_id: user.id,
            content: events,
          },
        ])
        .select()

      if (!error) {
        console.log('calender data added to supabase:', data)
        
      } else {
        console.error('calender data added to supabase:', error)
      }
    } catch (error) {
      console.error('Error calender data added to supabase:', error)
    }
    // }
  }

  // useEffect(() => {
  //   console.log(user.id)
  //   saveToCalenderData()
  // }, [])

  return (
    <div>
      <h1>Demo App</h1>


      <div className='flex'>
        <div className='w-[80%]'>
          <FullCalendar
            plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, multiMonthPlugin]}
            initialView='dayGridMonth'
            weekends={true}
            events={newEvents}
            eventContent={renderEventContent}
            // eventContent={(info) => <EventItem info={info} />}
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            height={550}
            headerToolbar={{
              left: 'prev,next, today',
              center: 'title',
              right: 'timeGridWeek,timeGridDay,dayGridMonth,listWeek,multiMonthYear'
            }}
            multiMonthMaxColumns={2}
            navLinks={true}
            weekNumbers={true}
            nowIndicator={true}
            droppable={true}
            dateClick={clickDates}
            select={handleSelect}
            eventClick={(info) => openModal(info, setClickedEvent, setIsOpen)}
          //eventDidMount={eventToolTip}
          />
        </div>

        {/*} <div id='events' className='w-fit'>
        //   <p>
        //     <strong>Draggable Events</strong>
        //   </p>

        //   <div className='fc-event fc-h-event fc-daygrid-event fc-daygrid-block-event'>
        //     <div className='event cursor-pointer'>My Event 1</div>
        //   </div>


        //   <p>
        //     <input type='checkbox' id='drop-remove' />
        //     <label htmlFor='drop-remove'>remove after drop</label>
        //   </p>
          </div> */}

        <div>
          <EventModal isOpen={isModalOpen} closeModal={closeModal} setEvents={setEvents} events={events} setSendToDatabase={setSendToDatabase} />
        </div>

      </div>

    </div>
  )
}

export default App


function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{eventInfo.event.title}</i>
    </>
  )
}

function clickDates(info) {
  return (
    <>
      <b>{console.log('Clicked on: ' + info.dateStr)}</b>
    </>
  )
}

function eventToolTip(info) {
  var tooltip = new Tooltip(info.el, {
    title: info.event.extendedProps.description,
    placement: 'top',
    trigger: 'hover',
    container: 'body'
  });
}

function eventClick(info) {
  alert('Event: ' + info.event.title);
  alert('Coordinates: ' + info.jsEvent.pageX + ',' + info.jsEvent.pageY);
  alert('View: ' + info.view.type);

  info.el.style.borderColor = 'red';
}

