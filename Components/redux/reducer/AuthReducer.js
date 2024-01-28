import {LOGIN_USER_FAILURE, LOGIN_USER_SUCCESS, LOGOUT_USER} from '../constant';

const initialStage = {
  authUser: [],
  message: false,
  user: null,
  isAuthenticated: false,
};

const authReducer = (state = initialStage, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        authUser: action.payload,
        message: true,
        isAuthenticated: true,
        user: action.payload,
      };
    case LOGIN_USER_FAILURE:
      return {
        authuser: [],
        message: false,
        isAuthenticated: false,
        user: null,
      };
    case LOGOUT_USER:
      return {
        authUser: [],
        message: false,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

export default authReducer;
