import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/auth/operations";
import { logOutSuccess } from "../../redux/auth/slice";


const UserMenu = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogOut = async () => {
    try {
      await dispatch(logOut()).unwrap();
      dispatch(logOutSuccess());
    } catch (error) {
      console.error("Failed to log out:", error.message);
    }
  };

  return (
    <div >
      <span >{user.name}</span>
      <button onClick={handleLogOut} >
        Log Out
      </button>
    </div>
  );
};

export default UserMenu;