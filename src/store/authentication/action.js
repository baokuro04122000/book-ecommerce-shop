

import { 
  setAuthUser,
} from "./slice";
import { 
  googleLogin,
  login
} from "../../api/auth";

export const actionLogin = (
  email,
  password
) => {
  return async (dispatch) => {
    try {
      const { data } = await login(email, password);
      dispatch(setAuthUser(data));
      localStorage.setItem('authUser', JSON.stringify(data));
    } catch (error) {
      console.log(error)
      throw error.response?.data;
    }
  };
};

export const actionGoogleLogin = (body
  ) =>{
    return async (dispatch) => {
      try {
        const { data } =await googleLogin(body)
        dispatch(setAuthUser(data));
        localStorage.setItem('authUser', JSON.stringify(data));
      } catch (error) {
        throw error.response?.data;
      }
    }
  }