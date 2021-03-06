import React from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';

import { TopBar, ErrorBoundry } from './components';
import { CurrentUserProvider } from './contexts/CurrentUserContext';
import CurrentUserChecker from './utils/CurrentUserChecker';

import {
  Article,
  GlobalFeed,
  TagFeed,
  Authentication,
  CreateArticle,
  EditArticle,
  Settings,
  UserProfile,
} from './pages';

const App = () => {
  return (
    <ErrorBoundry>
      <CurrentUserProvider>
        <CurrentUserChecker>
          <Router>
            <div className="container">
              <TopBar />
              <Switch>
                <Route path="/" exact component={GlobalFeed} />
                <Route path="/articles/new" component={CreateArticle} />
                <Route path="/articles/:slug/edit" component={EditArticle} />
                <Route path="/settings" component={Settings} />
                <Route path="/feed" component={GlobalFeed} />
                <Route path="/tags/:slug" component={TagFeed} />
                <Route path="/login" component={Authentication} />
                <Route path="/register" component={Authentication} />
                <Route path="/articles/:slug/" component={Article} />
                <Route path="/profiles/:slug" component={UserProfile} />
                <Route path="/profiles/:slug/favorites" component={UserProfile} />
                <Route render={() => <h2>Page not fount</h2>} />
              </Switch>
            </div>
          </Router>
        </CurrentUserChecker>
      </CurrentUserProvider>
    </ErrorBoundry>
  );
};

export default App;
