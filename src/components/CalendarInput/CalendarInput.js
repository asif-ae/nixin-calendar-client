import React from 'react';

const CalendarInput = ({ calendarData, setFormData }) => {
  const { calendarName, calendarDescription, ownerEmail } = calendarData;

  const calendarInputChangeHandler = (event) => {
    event.target.name === "calendarName" && setFormData((calendarData) => {
      return { ...calendarData, calendarName: event.target.value }
    });
    event.target.name === "calendarDescription" && setFormData((calendarData) => {
      return { ...calendarData, calendarDescription: event.target.value }
    });
  }

  const calendarSubmitHandle = async (event) => {
    // Stop reloading on submit
    event.preventDefault();

    // Server URL
    const serverURL = await 'https://aqueous-oasis-85656.herokuapp.com/addCalendar';
    await fetch(serverURL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(calendarData)
    })
    .then(res => console.log('server side respose:', res));

    // Reset the state
    setFormData((calendarData) => {
      return { ...calendarData, calendarName: '', calendarDescription: '' }
    });
  }
  return (
    <main className="container">
      <div className="py-5">
        <h2>Create a new calendar</h2>
        <form onSubmit={calendarSubmitHandle}>
          <div className="row m-0">
            <div className="col-md-6 p-0">
              <input className="form-control mb-3 bg-light" type="text" name="calendarName" id="calendarName" placeholder="Calendar name" aria-label="Calendar name" onChange={calendarInputChangeHandler} value={calendarName} />
              <textarea className="form-control mb-3 bg-light" name="calendarDescription" id="calendarDescription" placeholder="Calendar description..." rows="5" onChange={calendarInputChangeHandler} value={calendarDescription}></textarea>
              <div style={{padding: '0 12px'}} className="mb-3">
                <p className="m-0">
                  <small>Owner</small>
                </p>
                <h5 className="m-0">{ownerEmail}</h5>
              </div>
            </div>
            <div className="col-md-6 p-0"></div>
          </div>
          <input type="submit" value="Create calendar" className="btn btn-primary py-1 px-4" />
        </form>
      </div>
    </main>
  );
};

export default CalendarInput;