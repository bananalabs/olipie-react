import { createStore, applyMiddleware } from 'redux';
import createReducer from './reducers';
import createSagaMiddleware from 'redux-saga';

export default function configureStore(initialState: {} = {}) {
  const reducer = createReducer({});
  const sagaMiddleware = createSagaMiddleware();
  let middlewares = applyMiddleware(sagaMiddleware);
  
  // Note: only Redux >= 3.1.0 supports passing enhancer as third argument.
  // See https://github.com/rackt/redux/releases/tag/v3.1.0
  // We are @ "^3.5.2"" as of this code write
  const store = createStore(
    reducer,
    initialState,
    middlewares
  );

  // sagaMiddleware.run(rootSaga);

  return store;
}
