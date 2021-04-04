import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import Survey from 'page/Survey';
import LoginPage from 'page/Login';
import NotFound from 'page/NotFound';
import { withAuthenticator } from 'aws-amplify-react';

function App() {
  return (
    <GlobalThemeProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={withAuthenticator(Survey, false, [<LoginPage />])} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </GlobalThemeProvider>
  );
}

export default App;
