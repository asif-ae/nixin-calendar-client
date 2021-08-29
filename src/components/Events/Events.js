import React, { Fragment, useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import Navbar from '../Shared/Navbar/Navbar';
import 'react-calendar/dist/Calendar.css';
import { useParams } from 'react-router-dom';

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
  const { eventTitle, eventDescription, eventStartTime, eventEndTime, eventDate } = eventData;

  const [loadEvents, setLoadEvents] = useState([]);

  useEffect(() => {
    setEventData((eventData) => {
      return { ...eventData, eventDate: fullDate }
    });
  }, [fullDate]);

  const handleChange = (event) => {
    event.target.name === 'eventTitle' && setEventData((eventData) => {
      return { ...eventData, eventTitle: event.target.value }
    });

    event.target.name === 'eventDescription' && setEventData((eventData) => {
      return { ...eventData, eventDescription: event.target.value }
    });


    event.target.name === 'eventStartTime' &&
    setEventData((eventData) => {
      return { ...eventData, eventStartTime: parseInt(event.target.value) }
    });

    event.target.name === 'eventEndTime' &&
    setEventData((eventData) => {
      return { ...eventData, eventEndTime: parseInt(event.target.value) }
    });
  }
  console.log(eventData);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Server URL
    const serverURL = await 'https://aqueous-oasis-85656.herokuapp.com/addEvents';
    await fetch(serverURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(eventData)
    })
    .then(res => {
      console.log('server side respose:', res);
    });

    await setEventData((eventData) => {
      return { ...eventData, eventTitle: '', eventDescription: '', eventStartTime: 0, eventEndTime: 1 }
    });
    console.log(eventData);
  }

  useEffect(() => {
    fetch('https://aqueous-oasis-85656.herokuapp.com/events?calendar=' + calendarId + '&date=' + eventDate)
    .then(res => res.json())
    .then(data => setLoadEvents(data));
  }, [calendarId, eventDate, fullDate, eventData]);
  console.log(loadEvents);

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
            <div className="border-md-end min-height-100">
              <div className="py-3">
                <h4 className="mb-3">Add an event</h4>
                <form onSubmit={handleSubmit}>
                  <Calendar
                    onChange={onChange}
                    value={value}
                    className="mb-3"
                  />
                  <div className="me-5 mb-3">
                    <input className="form-control mb-3 bg-light" type="text" name="eventTitle" id="eventTitle" placeholder="Add title" aria-label="Add title" onChange={handleChange} required value={eventTitle} />
                    <textarea className="form-control mb-3 bg-light" name="eventDescription" id="eventDescription" placeholder="Add description..." rows="5" onChange={handleChange} required value={eventDescription}></textarea>

                    <div className="d-flex">
                      <div className="w-100 me-2">
                        <label htmlFor="eventStartTime" className="form-label">Event start time</label>
                        <select className="form-select" aria-label="Start time" id="eventStartTime" name="eventStartTime" onChange={handleChange} value={eventStartTime}>
                          <option disabled>Select start time</option>
                          <option selected value="0">0:00:00</option>
                          <option value="1">1:00:00</option>
                          <option value="2">2:00:00</option>
                          <option value="3">3:00:00</option>
                          <option value="4">4:00:00</option>
                          <option value="5">5:00:00</option>
                          <option value="6">6:00:00</option>
                          <option value="7">7:00:00</option>
                          <option value="8">8:00:00</option>
                          <option value="9">9:00:00</option>
                          <option value="10">10:00:00</option>
                          <option value="11">11:00:00</option>
                          <option value="12">12:00:00</option>
                          <option value="13">13:00:00</option>
                          <option value="14">14:00:00</option>
                          <option value="15">15:00:00</option>
                          <option value="16">16:00:00</option>
                          <option value="17">17:00:00</option>
                          <option value="18">18:00:00</option>
                          <option value="19">19:00:00</option>
                          <option value="20">20:00:00</option>
                          <option value="21">21:00:00</option>
                          <option value="22">22:00:00</option>
                          <option value="23">23:00:00</option>
                        </select>
                      </div>
                      <div className="w-100">
                        <label for="eventEndTime" className="form-label">Event end time</label>
                        <select className="form-select" aria-label="Event end time" id="eventEndTime" name="eventEndTime" onChange={handleChange} value={eventEndTime}>
                          <option disabled>Select event end time</option>
                          <option value="0">0:00:00</option>
                          <option selected value="1">1:00:00</option>
                          <option value="2">2:00:00</option>
                          <option value="3">3:00:00</option>
                          <option value="4">4:00:00</option>
                          <option value="5">5:00:00</option>
                          <option value="6">6:00:00</option>
                          <option value="7">7:00:00</option>
                          <option value="8">8:00:00</option>
                          <option value="9">9:00:00</option>
                          <option value="10">10:00:00</option>
                          <option value="11">11:00:00</option>
                          <option value="12">12:00:00</option>
                          <option value="13">13:00:00</option>
                          <option value="14">14:00:00</option>
                          <option value="15">15:00:00</option>
                          <option value="16">16:00:00</option>
                          <option value="17">17:00:00</option>
                          <option value="18">18:00:00</option>
                          <option value="19">19:00:00</option>
                          <option value="20">20:00:00</option>
                          <option value="21">21:00:00</option>
                          <option value="22">22:00:00</option>
                          <option value="23">23:00:00</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    {
                      eventEndTime > eventStartTime && <input type="submit" value="Add event" className="btn btn-primary px-4 py-1" />
                    }
                    {
                      eventEndTime <= eventStartTime && <div className="alert alert-warning text-center me-5" role="alert">Please select an <b>event end date</b> that is greater than the <b>event start date</b>!</div>
                    }
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="py-3">
              <h4 className="mb-3">Events</h4>

              {
                loadEvents.length > 0 && loadEvents.map(event => {
                  return (
                    <div className="card text-center">
                      <div className="card-header">{event.eventDate}</div>
                      <div className="card-body">
                        <h5 className="card-title">{event.eventTitle}</h5>
                        <p className="card-text">{event.eventDescription}</p>
                      </div>
                      <div className="card-footer text-muted d-flex justify-content-between">
                        <span>Start: <b>{event.eventStartTime}:00:00</b></span>
                        <span>End: <b>{event.eventEndTime}:00:00</b></span>
                      </div>
                    </div>
                  )
                })
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