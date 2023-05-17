

import { 
  setAuthUser,
} from "./slice";
import { 
  googleLogin,
  login,
  logout,
  registerSeller
} from "../../api/auth";

export const actionLogin = (
  email,
  password
) => {
  return async (dispatch) => {
    try {
      const { data } = await login(email, password);
      localStorage.setItem('authUser', JSON.stringify(data.data));
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
        localStorage.setItem('authUser', JSON.stringify(data.data));
      } catch (error) {
        throw error.response?.data;
      }
    }
  }

export const actionLogout =async (body) => {
  try {
    await logout(body)
    localStorage.clear('authUser');
  } catch (error) {
    throw error.response?.data;
  }
}

export const actionRegisterSeller = async ()=> {
  try {
    const {data} = await registerSeller()
    return data.message
  } catch (error) {
    throw error.response?.data;
  }
}