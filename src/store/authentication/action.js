
import { AUTH_USER_DATA_LS_ITEM } from "../../constants/authentication";
import { 
  setAuthUser,
} from "./slice";
import { 
  login, 
} from "../../api/authentication";

export const actionLogin = (
  email,
  password
) => {
  return async (dispatch) => {
    try {
      const { data } = await login(email, password);
      dispatch(setAuthUser(data));
      
      localStorage.setItem(AUTH_USER_DATA_LS_ITEM, JSON.stringify(data));
    } catch (error) {
      console.log(error)
      throw error.response?.data;
    }
  };
};
