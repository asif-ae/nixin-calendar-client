import React from 'react';
import { Link } from 'react-router-dom';

const AllCalendars = ({ allCalendarData }) => {
  console.log(allCalendarData);
  return (
    <div className="container">
      <div className="my-5">
        <h2 className="mb-5">All Calenders</h2>
        
        <div className="row">
          {
            allCalendarData && allCalendarData.map(calendar => {
              const { _id, calendarName, calendarDescription, ownerName } = calendar;
              return (
                <div className="col-sm-6 col-md-4 col-lg-3" key={_id}>
                  <div className="card border-secondary mb-3">
                    <Link to={`/calendar/${_id}`}>
                      <div className="card-header">
                        Created by: <b>{ownerName}</b>
                      </div>
                      <div className="card-body text-secondary">
                        <h5 className="card-title">{calendarName}</h5>
                        <p className="card-text">{calendarDescription}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};

export default AllCalendars;