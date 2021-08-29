import React from 'react';

const SingleEvent = ({ singleEvent }) => {
  return (
    <div className="card text-center">
      <div className="card-header">{singleEvent.eventDate}</div>
      <div className="card-body">
        <h5 className="card-title">{singleEvent.eventTitle}</h5>
        <p className="card-text">{singleEvent.eventDescription}</p>
      </div>
      <div className="card-footer text-muted d-flex justify-content-between">
        <span>Start: <b>{singleEvent.eventStartTime}:00:00</b></span>
        <span>End: <b>{singleEvent.eventEndTime}:00:00</b></span>
      </div>
    </div>
  );
};

export default SingleEvent;