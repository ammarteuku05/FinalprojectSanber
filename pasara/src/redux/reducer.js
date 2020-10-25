const initialState = {
  isLoading: false,
  popup: false,
  isLogin: true,
  user: {},
  myMov: [],
  tweets: []
};

const reducer = (state = initialState, action) => {
  if (action.type === 'SET_STATE') {
    return {
      ...state,
      [action.inputType]: action.inputValue,
    };
  }
  if (action.type === 'SET_LOGIN') {
    return {
      ...state,
      user: action.inputValue,
      isLogin: true,
    };
  }
  if (action.type === 'SET_MOV') {
    return {
      ...state,
      myMov: action.inputValue,
    };
  }
  if (action.type === 'SET_TWEET') {
    return {
      ...state,
      tweets: action.inputValue,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      myMov: [],
      user: {},
      isLogin: false,
    };
  }
  return state;
};

export default reducer;
