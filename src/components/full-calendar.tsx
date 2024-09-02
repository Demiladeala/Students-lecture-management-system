import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import axios from 'axios';

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    // Fetch alerts from the API
    axios.get('/api/alerts')
      .then(response => {
        const alerts = response.data.map((alert:any) => ({
          id: alert.id,
          title: alert.title,
          start: new Date(alert.timestamp),
          backgroundColor: alert.is_active ? 'purple' : 'gray', // Example color mapping
        }));
        setEvents(alerts);
      })
      .catch(error => {
        console.error('Error fetching alerts:', error);
      });
  }, []);

  return (
    <FullCalendar
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
    initialView="dayGridMonth"
    events={events}
    headerToolbar={{
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay',
    }}
    views={{
      dayGridMonth: {
        buttonText: 'Month',
      },
      timeGridWeek: {
        buttonText: 'Week',
      },
      timeGridDay: {
        buttonText: 'Day',
      }
    }}
    eventContent={(eventInfo) => (
      <div className="event-box" style={{ backgroundColor: eventInfo.event.backgroundColor }}>
        <span className=''>{eventInfo.event.title}</span>
      </div>
    )}
    eventBackgroundColor="transparent"
    height="auto" 
  />
  );
};

export default CalendarComponent;