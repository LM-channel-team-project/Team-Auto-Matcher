import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import Survey from 'page/Survey';
import Result from 'page/Result';
import PersonalDashboard from 'page/Dashboard/Personal';
import TeamDashboard from 'page/Dashboard/Team';
import LoginPage from 'page/Login';
import NotFound from 'page/NotFound';
import MatchPage from 'page/MatchWait';
import { withAuthenticator } from 'aws-amplify-react';

function App() {
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
          <Route exact path="/dashboard/team" component={TeamDashboard} />
          <Route exact path="/match" component={MatchPage} />
          <Route
            exact
            path="/dashboard/personal"
            component={PersonalDashboard}
          />
          <Route exact path="/login" component={LoginPage} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </GlobalThemeProvider>
  );
}

export default App;
