import React from 'react';

import { Switch, Route } from 'react-router-dom';

import Article from '../pages/article';
import GlobalFeed from '../pages/globalFeed/GlobalFeed';
import TagFeed from '../pages/globalFeed/TagFeed';
import { TopBar } from '.';
import Authentication from '../pages/Authentication/Authentication';
import { CurrentUserProvider } from '../contexts/CurrentUserContext';
import CurrentUserChecker from './CurrentUserChecker';
import CreateArticle from '../pages/CreateArticle';

const App = () => {
  return (
    <CurrentUserProvider>
      <CurrentUserChecker>
        <div className="container">
          <TopBar />
          <Switch>
            <Route path="/" exact component={GlobalFeed} />
            <Route path="/articles/new" component={CreateArticle} />
            <Route path="/feed" component={GlobalFeed} />
            <Route path="/tags/:slug" component={TagFeed} />
            <Route path="/login" component={Authentication} />
            <Route path="/register" component={Authentication} />
            <Route path="/articles/:slug" component={Article} />
          </Switch>
        </div>
      </CurrentUserChecker>
    </CurrentUserProvider>
  );
};

export default App;
