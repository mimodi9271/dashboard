const initialstate = {
  Auth: null,
  AuthError: null,
};

const AuthReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "AuthInitial":
      return { ...state, Auth: action.payload };
    case "exit":
      return { ...state, Auth: null };
    case "errordis":
      return { ...state, AuthError: action.payload };
    default:
      return state;
  }
};

export default AuthReducer;
