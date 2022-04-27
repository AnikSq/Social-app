import { useEffect, createContext, useReducer } from "react";
import AuthReducer from "./AuthReduce";

const INITIAL_STATE = {
  // this is my intial state without any login
  user: null,
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// The Flow is gonna look like this

// First Condition

// First the user enters login email and password that is gonna then be run by the actionauth
// secondly the reducer will check if any response came or not
// if no response came the isFetching will stay true, and the other two will stay null

// Second Condition

// First the user enters login email and password that is gonna then be run by the actionauth
// secondly if the reducer will check, and if the response is successful
// then the user variable will be fullfilled and isFetching will be false

// third condition
// If there is an error the error state will simply be true
