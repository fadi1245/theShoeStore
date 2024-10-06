import { createContext } from "react";

const authen = createContext({
  isLogin: false,  // Default value for login status
  setLogin: () => {} // Default setter function
});

export default authen;
