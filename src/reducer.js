import { combineReducers } from "redux";
import { call, put, takeEvery } from "redux-saga/effects";

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_FETCH_SUCCEEDED": {
      return { ...state, users: action.payload };
    }
    default:
      return state;
  }
};

export const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
  }
};

function* fetchUser(action) {
  if (action.type === "USER_FETCH_REQUESTED") {
    const response = yield call(fetchData, action.url);
    console.log(response);

    yield put({ type: "USER_FETCH_SUCCEEDED", payload: response });
  }
}

export function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

export default combineReducers({
  userReducer,
});
