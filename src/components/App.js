import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Article from '../pages/article';
import GlobalFeed from '../pages/globalFeed';
import { TopBar } from '.';
import Authentication from '../pages/Authentication/Authentication';
import { CurrentUserProvider } from '../contexts/CurrentUserContext';
import CurrentUserChecker from './CurrentUserChecker';

const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <div className="container">
          <TopBar />
          <Switch>
            <Route path="/" exact component={GlobalFeed} />
            <Route path="/login" component={Authentication} />
            <Route path="/register" component={Authentication} />
            <Route path="/articles" component={Article} />
          </Switch>
        </div>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
};

export default App;
