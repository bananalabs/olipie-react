import userSaga from '../User/sagas';
import settingsSaga from '../Settings/sagas';
import searchSaga from '../Search/sagas';
import videosSaga from '../Videos/sagas';

function* rootSaga() {
    yield [
      userSaga(),
      settingsSaga(),
      searchSaga(),
      videosSaga()
    ];
}
  
export default rootSaga;