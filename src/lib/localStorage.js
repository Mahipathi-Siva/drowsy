
export const setToken = (token) => {
    localStorage.setItem("authToken", token);
  };
  
  export const getToken = () => {
    return localStorage.getItem("authToken");
  };
  
  export const removeToken = () => {
    localStorage.removeItem("authToken");
  };
  
  export const setEmails = (email) => {
    localStorage.setItem("userEmail", email);
  };
  
  export const getEmail = () => {
    return localStorage.getItem("userEmail") || "";
  };
  
  export const removeEmail = () => {
    localStorage.removeItem("userEmail");
  };