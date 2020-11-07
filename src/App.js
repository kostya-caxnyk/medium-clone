import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Article from './pages/article';
import GlobalFeed from './pages/globalFeed';

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={GlobalFeed} />
      <Route path="/articles" exact component={Article} />
    </Switch>
  );
};

export default App;
