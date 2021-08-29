import { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import CreateACalendar from './components/CreateACalendar/CreateACalendar';
import Events from './components/Events/Events';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const UserContext = createContext();

const App = () => {
  const [loggedInUser, setLoggedInUser] = useState({});
  const [allCalendarData, setAllCalendarData] = useState();

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>
          <Route exact path="/">
            <Home allCalendarData={allCalendarData} setAllCalendarData={setAllCalendarData} />
          </Route>
          <PrivateRoute exact path="/create-new-calendar">
            <CreateACalendar />
          </PrivateRoute>
          <Route exact path="/calendar/:calendarId">
            <Events />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
