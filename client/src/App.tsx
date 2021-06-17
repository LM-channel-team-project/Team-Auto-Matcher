import React from 'react';
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
import { withAuthenticator } from 'aws-amplify-react';

function App() {
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
          <Route exact path="/" component={Home}/>
          <Route exact path="/contact" component={Contact}/>
          <Route exact path="/dashboard/team" component={TeamDashboard} />
          <Route
            exact
            path="/dashboard/personal"
            component={PersonalDashboard}
          />
          <Route exact path='/login' component={withAuthenticator(Home, false, [<LoginPage />])}/>
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </GlobalThemeProvider>
  );
}

export default App;
