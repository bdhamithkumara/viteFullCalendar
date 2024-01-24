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
import { Button, notification, Space } from 'antd';
import EventModelForView from './components/model/EventModelForView';

Modal.setAppElement('#root');

// const openModal = (info, setClickedEvent, setIsOpen) => {
//   setClickedEvent(info);
//   setIsOpen(true);
// };

// const closeModal = (setIsOpen) => {
//   setIsOpen(false);
// };

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
  const [isModalOpenForDetail, setIsModalOpenForDetail] = useState(false);
  const user = JSON.parse(window.localStorage.getItem('user'))

  // const openModal = () => {
  //   setIsModalOpen(true);
  // };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModalForDetail = () => {
    setIsModalOpenForDetail(false);
  };

  // const EventItem = ({ info }) => {
  //   const { event } = info;
  //   return (
  //     <div>
  //       <p>{event.title}</p>
  //     </div>
  //   );
  // };


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
  const [clickEventData, setClickEventData] = useState([])
  const [modalIsOpen, setIsOpen] = useState(false);
  const [clickedEvent, setClickedEvent] = useState(null);
  const [clickedDate, setClickedDate] = useState('')

  const [sendToDatabase, setSendToDatabase] = useState(false)

  const handleSelect = () => {
    setIsModalOpen(true);
  };


  const [clickedTitle , setClickedTitle] = useState('')
  const [clickedDescription, setClickedDescription] = useState('')
  const [clickedInviteName, setClickedInviteName ] = useState('')
  const [clickedEventDateStart, setClickedEventDateStart]= useState('')

  const eventClick = (info) => {
    setClickedTitle(info.event.title)
    setClickedDescription(info.event.extendedProps.description)
    setClickedInviteName(info.event.extendedProps[0].user.userName)
    setClickedEventDateStart(info.event.start)
    setIsModalOpenForDetail(true)
  }

  // function eventClick(info) {
  //   console.log("title : " + info.event.title) 
  //   console.log("description : " + info.event.extendedProps.description)
  //   console.log("invite name : " + info.event.extendedProps[0].user.userName)
  //   console.log("date : " + info.event.start)
  // }
  
  const clickDates = (info) => {
    setClickedDate(info.dateStr)
  }

  useEffect(() => {
    setyNewEvents(events)
    getCalenderDataFromDatabase()
    saveToCalenderData()
    console.log(newEvents)
  }, [events])


  const getCalenderDataFromDatabase = async () => {

    try {
      let { data, error } = await supabase
        .from('calender')
        .select('content')
        .eq('user_id', user.id)

      if (!error) {
        console.log('get the calender data from supabase:', data)

        const transformedData = data.map(item => {
          const event = item.content[0];
          return {
            title: event.title,
            id : event.id,
            description: event.description,
            start: event.start,
            end: event.end,
            extendedProps: [
              {
                user: event.extendedProps.user,
                responseStatus: event.extendedProps.responseStatus,
              }
            ]
          };
        });

        setyNewEvents(transformedData)

      } else {
        console.error('Error get the calender data from supabase:', error)
      }
    } catch (error) {
      console.error('Error get the calender data from supabase:', error)
    }
  }


  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="link" size="small" onClick={() => api.destroy()}>
          Destroy All
        </Button>
        <Button type="primary" size="small" onClick={() => api.destroy(key)}>
          Confirm
        </Button>
      </Space>
    );
    api.open({
      message: 'Notification Title',
      description:
        'A function will be be called after the notification is closed (automatically after the "duration" time of manually).',
      btn,
      key,
      onClose: close,
    });
  }

  const saveToCalenderData = async () => {

    if (sendToDatabase) {
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
          console.log('calender data added to supabase:', data[0].content)
          insertForNortification(data[0])
          //openNotification()

        } else {
          console.error('calender data added to supabase:', error)
        }
      } catch (error) {
        console.error('Error calender data added to supabase:', error)
      }
      setSendToDatabase(false)
    }
  }

  const insertForNortification = async (catchData) => {

    console.log(catchData)

    const contentDetails = {
      title: catchData.content[0].title,
      start: catchData.content[0].start,
      end: catchData.content[0].end,
      description : catchData.content[0].description,
    };

    console.log(contentDetails)

    try {
      const { data, error } = await supabase
        .from('calender_nortification')
        .insert([{
           user_id: catchData.content[0].extendedProps.user.userId,
           content: contentDetails ,
        }])
        .select()

      if (!error) {
        console.log('calender nortification data added to supabase:', data)
      } else {
        console.error('calender nortification data  not added to supabase:', error)
      }
    } catch (error) {
      console.log("nortification table insert error - " + error)
    }
  }

  useEffect(() => {
    getCalenderDataFromDatabase()
  }, [])

  return (
    <div>
      <h1>Demo App</h1>
      {contextHolder}

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
            eventClick={eventClick}
            
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
          <EventModal isOpen={isModalOpen} closeModal={closeModal} setEvents={setEvents} events={events} setSendToDatabase={setSendToDatabase} clickedDate={clickedDate}/>
        </div>
        <div>
          <EventModelForView 
            isModalOpenForDetail={isModalOpenForDetail} 
            closeModalForDetail={closeModalForDetail} 
            clickEventData={clickEventData} 
            clickedTitle={clickedTitle}
            clickedDescription={clickedDescription}
            clickedInviteName={clickedInviteName}
            clickedEventDateStart={clickedEventDateStart}
          />
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


function eventToolTip(info) {
  var tooltip = new Tooltip(info.el, {
    title: info.event.extendedProps.description,
    placement: 'top',
    trigger: 'hover',
    container: 'body'
  });
}

