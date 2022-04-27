import axios from "axios";

export const loginCall = (userInfo, dispatch) => {
  // This is step 1
  const func = async () => {
    // we don't directly just watch dispatch on the main export because when ever anything imports it, it will automaticly excecute the dispatch
    dispatch({ type: "LOGIN_START" });

    //   This is basically step 2 and 3
    try {
      const res = await axios.post("auth/login", userInfo);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
  };
  func();
};
