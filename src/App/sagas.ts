import userSaga from '../User/sagas';
import settingsSaga from '../Settings/sagas';

function* rootSaga() {
    yield [
      userSaga(),
      settingsSaga()
    ];
}
  
export default rootSaga;