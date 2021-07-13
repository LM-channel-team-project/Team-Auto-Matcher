import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import Survey from 'page/Survey';
import Result from 'page/Result';
import PersonalDashboard from 'page/Dashboard/Personal';
import TeamDashboard from 'page/Dashboard/Team';
import LoginPage from 'page/Login';
import NotFound from 'page/NotFound';
import Home from 'page/Home';
import Contact from 'page/Contact';
import Mail from 'page/Mail';
import { withAuthenticator } from 'aws-amplify-react';
import { Auth } from 'aws-amplify';
import { useQuery, gql } from '@apollo/client';
import { getUser } from 'graphql/queries';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { data } = useQuery(
    gql`
      ${getUser}
    `,
  );

  const sendData = () => {
    if (data) {
      const userData = {
        id: data.getUser.items[0].id,
        surveyCompleted: data.getUser.items[0].surveyCompleted,
        haveTeam: data.getUser.items[0].haveTeam,
      };
      return userData;
    }
    return null;
  };

  Auth.currentAuthenticatedUser()
    .then(() => setIsLoggedIn(true))
    .catch(() => setIsLoggedIn(false));

  return (
    <GlobalThemeProvider>
      <Router>
        <Switch>
          <Route
            exact
            path="/survey"
            component={withAuthenticator(Survey, false, [<LoginPage />])}
          />
          <Route
            exact
            path="/result"
            component={withAuthenticator(Result, false, [<LoginPage />])}
          />
          <Route exact path="/" component={Home}>
            <Home isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/dashboard/team" component={TeamDashboard}>
            <TeamDashboard userData={sendData()} isLoggedIn={isLoggedIn} />
          </Route>
          <Route exact path="/dashboard/personal" component={PersonalDashboard}>
            <PersonalDashboard userData={sendData()} />
          </Route>
          <Route exact path="/login" component={LoginPage} />
          <Route
            exact
            path="/mail"
            component={withAuthenticator(Mail, false, [<LoginPage />])}
          />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </GlobalThemeProvider>
  );
}

export default App;
