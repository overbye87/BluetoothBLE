import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

import AppNavigation from './src/navigation/AppNavigation';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
};

export default App;
