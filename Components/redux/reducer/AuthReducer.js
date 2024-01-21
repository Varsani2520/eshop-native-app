import {LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER} from '../constant';

const initialStage = {
  authUser: [],
  message: false,
};

const authReducer = (state = initialStage, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        authUser: action.payload,
        message: true,
      };
    case LOGIN_USER_FAILURE:
      return {
        authuser: [],
        message: false,
      };
    case LOGOUT_USER:
      return {
        authUser: [],
        message: false,
      };
    default:
      return state;
  }
};

export default authReducer;
