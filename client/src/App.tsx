import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import GlobalThemeProvider from 'style/GlobalThemeProvider';
import Survey from 'page/survey';

function App() {
  return (
    <GlobalThemeProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Survey} />
          <Route exact path="survey" />
        </Switch>
      </Router>
    </GlobalThemeProvider>
  );
}

export default App;
