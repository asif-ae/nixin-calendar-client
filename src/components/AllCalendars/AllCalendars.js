import React, { useEffect } from 'react';
import CalendarCard from '../CalendarCard/CalendarCard';

const AllCalendars = ({ allCalendarData, setAllCalendarData }) => {
  console.log(allCalendarData);
  const calendarUri = 'https://aqueous-oasis-85656.herokuapp.com/calendars';

  useEffect(() => {
      fetch(calendarUri)
      .then(res => res.json())
      .then(data => setAllCalendarData(data))
  }, [setAllCalendarData])
  return (
    <div className="container">
      <div className="my-5">
        <h2 className="mb-5">All Calenders</h2>
        
        <div className="row">
          {
            allCalendarData && allCalendarData.map(calendar => <CalendarCard calendar={calendar} key={calendar._id} />)
          }
        </div>
      </div>
    </div>
  );
};

export default AllCalendars;