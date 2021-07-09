import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import Survey from 'page/Survey';
import Result from 'page/Result';
import PersonalDashboard from 'page/Dashboard/Personal';
import TeamDashboard from 'page/Dashboard/Team';
import LoginPage from 'page/Login';
import NotFound from 'page/NotFound';
import { withAuthenticator } from 'aws-amplify-react';
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
            exact
            path="/"
            component={withAuthenticator(Survey, false, [<LoginPage />])}
          />
          <Route
            exact
            path="/result"
            component={withAuthenticator(Result, false, [<LoginPage />])}
          />
          <Route exact path="/dashboard/team">
            <TeamDashboard isLoggedIn={isLoggedIn} />
          </Route>
          <Route
            exact
            path="/dashboard/personal"
            component={PersonalDashboard}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </GlobalThemeProvider>
  );
}

export default App;
