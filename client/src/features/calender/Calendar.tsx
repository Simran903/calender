import React, { useEffect, useRef, useState } from 'react';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { fetchEvents, updateEvent } from '../../redux/slices/eventsSlice';
import { openModal } from '../../redux/slices/uiSlice';
import { EventItem } from '../../types';
import { EventModal } from '../events/EventModal';
import { useDrop } from 'react-dnd';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

export const Calendar: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const events = useSelector((state: RootState) => state.events.events);
  const draggedTask = useSelector((state: RootState) => state.ui.draggedTask);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  useEffect(() => {
    // Add a check to ensure events is an array before using map
    if (Array.isArray(events)) {
      const formattedEvents = events.map(event => ({
        id: event._id,
        title: event.title,
        start: new Date(`${event.date}T${event.startTime}`),
        end: new Date(`${event.date}T${event.endTime}`),
        category: event.category,
        color: getCategoryColor(event.category) || event.color,
      }));
      setCalendarEvents(formattedEvents);
    } else {
      // If events is not an array, set calendarEvents to an empty array
      setCalendarEvents([]);
    }
  }, [events]);

  const getCategoryColor = (category: string): string => {
    const colors = {
      exercise: '#FF5733',
      eating: '#33FF57',
      work: '#3357FF',
      relax: '#F333FF',
      family: '#FF33A8',
      social: '#33FFF5',
    };
    return colors[category as keyof typeof colors] || '#CCCCCC';
  };

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const date = moment(start).format('YYYY-MM-DD');
    const startTime = moment(start).format('HH:mm');
    const endTime = moment(end).format('HH:mm');

    dispatch(openModal({ date, startTime, endTime }));
  };

  const handleSelectEvent = (event: any) => {
    if (Array.isArray(events)) {
      const selectedEvent = events.find(e => e._id === event.id);
      if (selectedEvent) {
        dispatch(openModal({ event: selectedEvent }));
      }
    }
  };

  const handleEventDrop = ({ event, start, end }: any) => {
    if (Array.isArray(events)) {
      const selectedEvent = events.find(e => e._id === event.id);
      if (selectedEvent) {
        const updatedEvent: EventItem = {
          ...selectedEvent,
          date: moment(start).format('YYYY-MM-DD'),
          startTime: moment(start).format('HH:mm'),
          endTime: moment(end).format('HH:mm'),
        };
        dispatch(updateEvent(updatedEvent));
      }
    }
  };

  const [, drop] = useDrop({
    accept: 'TASK',
    drop: (item: any, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const date = moment().format('YYYY-MM-DD');
        const startTime = moment().format('HH:mm');
        const endTime = moment().add(1, 'hour').format('HH:mm');

        dispatch(openModal({ 
          date, 
          startTime, 
          endTime, 
          event: {
            _id: 'new',
            title: draggedTask?.title || '',
            category: 'work',
            date,
            startTime,
            endTime,
            color: draggedTask?.color,
          }
        }));
      }
    },
  });

  drop(calendarRef);

  return (
    <div ref={calendarRef} className="h-screen p-4">
      <BigCalendar
        localizer={localizer}
        events={calendarEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc(100vh - 100px)' }}
        selectable
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        onEventDrop={handleEventDrop}
        resizable
        eventPropGetter={(event) => ({
          style: {
            backgroundColor: event.color,
          },
        })}
      />
      <EventModal />
    </div>
  );
};