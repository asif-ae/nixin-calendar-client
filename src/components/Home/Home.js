import React, { Fragment } from 'react';
import AllCalendars from '../AllCalendars/AllCalendars';
import Navbar from '../Shared/Navbar/Navbar';

const Home = ({ allCalendarData, setAllCalendarData }) => {
  return (
    <Fragment>
      <Navbar />
      <AllCalendars allCalendarData={allCalendarData} setAllCalendarData={setAllCalendarData} />
    </Fragment>
  );
};

export default Home;