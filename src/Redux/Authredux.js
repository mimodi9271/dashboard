const initialstate = {
  Auth: null
};

const AuthReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "AuthInitial":
      return { ...state, Auth: action.payload };
    case "exit":
      return { ...state, Auth: null };
    default:
      return state;
  }
};

export default AuthReducer;
