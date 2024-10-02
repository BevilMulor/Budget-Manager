import './styles.css';
import { store, persistor } from './redux/store';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import Main from './containers/Main'; 
function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <h1>Personal Budget Manager</h1>
        <Main />
      </PersistGate>
    </Provider>
  );
}

export default App;
