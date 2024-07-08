import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { TOKEN_NAME } from "../utilities/baseQuery";
import { loggedIn } from "../app/features/authSlice";

const useAuthChecked = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getAuth = localStorage.getItem(TOKEN_NAME);
    if (getAuth) {
      const parseAuth = JSON.parse(getAuth);
      if (parseAuth) {
        dispatch(loggedIn(parseAuth));
      }
    }
  }, [dispatch]);
};

export default useAuthChecked;
