import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import Survey from 'page/Survey';
import PersonalDashboard from 'page/Dashboard/Personal';
import TeamDashboard from 'page/Dashboard/Team';
import LoginPage from 'page/Login';
import NotFound from 'page/NotFound';
import Home from 'page/Home';
import Contact from 'page/Contact';
import Mail from 'page/Mail';
import Notice from 'page/Notice';
import { Auth } from 'aws-amplify';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  Auth.currentAuthenticatedUser()
    .then(() => setIsLoggedIn(true))
    .catch(() => setIsLoggedIn(false));

  return (
    <GlobalThemeProvider>
      <Router>
        <Switch>
          <Route
            render={(props) => <Survey {...props} isLoggedIn={isLoggedIn} />}
            exact
            path="/survey"
          />
          <Route
            render={(props) => <Home {...props} isLoggedIn={isLoggedIn} />}
            exact
            path="/"
          />
          <Route exact path="/contact" component={Contact} />
          <Route
            render={(props) => (
              <TeamDashboard {...props} isLoggedIn={isLoggedIn} />
            )}
            exact
            path="/dashboard/team"
          />
          <Route
            exact
            path="/dashboard/personal"
            component={PersonalDashboard}
          />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/notice" component={Notice} />
          <Route
            render={(props) => <Mail {...props} isLoggedIn={isLoggedIn} />}
            exact
            path="/mail"
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </GlobalThemeProvider>
  );
}

export default App;
