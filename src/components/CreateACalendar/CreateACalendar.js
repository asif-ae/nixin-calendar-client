import React, { Fragment, useContext, useState } from 'react';
import { UserContext } from '../../App';
import CalendarInput from '../CalendarInput/CalendarInput';
import Navbar from '../Shared/Navbar/Navbar';

const CreateACalendar = () => {
  // Getting data from parent component
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [calendarData, setFormData] = useState({
    calendarName: '',
    calendarDescription: '',
    ownerName: loggedInUser.name,
    ownerEmail: loggedInUser.email,
  });

  return (
    <Fragment>
      <Navbar />

      <CalendarInput calendarData={calendarData} setFormData={setFormData} />
    </Fragment>
  );
};

export default CreateACalendar;