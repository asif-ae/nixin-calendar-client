import React, { Fragment, useEffect, useState } from 'react';
import Navbar from '../Shared/Navbar/Navbar';
import 'react-calendar/dist/Calendar.css';
import { useParams } from 'react-router-dom';
import EventInputs from '../EventInputs/EventInputs';
import SingleEvent from '../SingleEvent/SingleEvent';

const Events = () => {
  // Calendar ID
  const { calendarId } = useParams();

  const [value, onChange] = useState(new Date());

  const day = value.toLocaleDateString('en-US', {day: '2-digit'});
  const month = value.toLocaleDateString('en-US', {month: 'long'});
  const year = value.getFullYear().toString();
  const fullDate = day + ' ' + month + ' ' + year;
  console.log(day, month, year);

  const [eventData, setEventData] = useState({
    calendarId,
    eventDate: fullDate,
    eventTitle: '',
    eventDescription: '',
    eventStartTime: 0,
    eventEndTime: 1,
  });

  const [loadEvents, setLoadEvents] = useState([]);

  useEffect(() => {
    setEventData((eventData) => {
      return { ...eventData, eventDate: fullDate }
    });
  }, [fullDate]);

  useEffect(() => {
    fetch('https://aqueous-oasis-85656.herokuapp.com/events?calendar=' + calendarId + '&date=' + eventData.eventDate)
    .then(res => res.json())
    .then(data => setLoadEvents(data));
  }, [calendarId, fullDate, eventData]);

  const noEventError = () => {
    return (
      <div className="alert alert-danger text-center" role="alert">
        <h5>Sorry!</h5>
        We couldn't find an event on <b>{fullDate}</b>! Please check back later!
      </div>
    );
  }

  return (
    <Fragment>
      <Navbar />

      <div className="container">
        <div className="row">
          <div className="col-md-7">
            <EventInputs eventData={eventData} value={value} onChange={onChange} setEventData={setEventData} />
          </div>
          <div className="col-md-5">
            <div className="py-3">
              <h4 className="mb-3">Events</h4>

              {
                loadEvents.length > 0 && loadEvents.map(singleEvent => <SingleEvent singleEvent={singleEvent} key={singleEvent._id} />)
              }

              {
                loadEvents.length === 0 && noEventError()
              }
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Events;