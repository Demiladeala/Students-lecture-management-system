import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { API } from './api';
import Loader from './loader';

const CalendarComponent = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<any>(null); // State for the selected event
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [load, setLoad] = useState(false);

  useEffect(() => {
    setLoad(true)
    axios.get(`${API}/api/alerts`, { withCredentials: true })
      .then(response => {
        const alerts = response.data.map((alert: any) => ({
          id: String(alert.id), // Ensure ID is a string
          title: alert.title,
          start: new Date(alert.timestamp),
          backgroundColor: alert.is_active ? 'purple' : 'gray',
          textColor: alert.is_active ? 'white' : 'black',
          description: alert.description,
          is_active: alert.is_active,
        }));
        setEvents(alerts);
        setLoad(false);
      })
      .catch(error => {
        console.error('Error fetching alerts:', error);
        setLoad(true);
      });
  }, []);

  // TypeScript will infer the type for the clickInfo
  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event); // Set the selected event
    setIsModalOpen(true); // Open the modal
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
  };

  if (load) return <Loader/>;

  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay',
        }}
        eventClick={handleEventClick} // Event click handler
        eventContent={(eventInfo) => (
          <div
            className="event-box px-2 rounded cursor-pointer"
            style={{
              backgroundColor: eventInfo.event.backgroundColor,
              color: eventInfo.event.extendedProps.textColor,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <span>{eventInfo.event.title}</span>
          </div>
        )}
        eventBackgroundColor="transparent"
        height="auto"
        eventDisplay="block"
      />

      {/* Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-semibold mb-4">{selectedEvent.title}</h2>
            <p className="mb-2"><strong>Description:</strong> {selectedEvent.extendedProps.description}</p>
            <p className="mb-2"><strong>Start Time:</strong> {selectedEvent.start?.toLocaleString()}</p>
            <p className="mb-4"><strong>Active:</strong> {selectedEvent.extendedProps.is_active ? 'Yes' : 'No'}</p>
            <button
              onClick={closeModal}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CalendarComponent;