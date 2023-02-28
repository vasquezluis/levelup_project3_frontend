import { NavLink } from "react-router-dom";
import { RiUserFill, RiUserAddFill, RiUserSharedFill } from "react-icons/ri";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

// import { useStateContext } from "../../contexts/ContextProvider";
import { useSelector, useDispatch } from "react-redux";
import { unSetUser } from "../../reducers/userSlice";

// ? component for navbar icons
const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="inline-flex absolute rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

function Navbar() {
  // obtain state of active (menu)
  // const { activeMenu, setActiveMenu } = useStateContext();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(unSetUser());
    window.localStorage.removeItem("loggedUser");
  };

  return (
    <div className="flex justify-end p-2 md:mx-6 relative">
      {/* other icons on navbar */}
      <div className="flex flex-col justify-center">
        <p>{user.user}</p>
      </div>

      <div className="flex flex-row">
        {user.user != "" ? (
          <NavLink to="/login" onClick={handleLogOut}>
            <NavButton
              title="signout"
              dotColor="#03c9d7"
              // customFunc={() => handleClick("chat")}
              color="black"
              icon={<RiUserSharedFill />}
            ></NavButton>
          </NavLink>
        ) : (
          <NavLink to="/login">
            <NavButton
              title="signin"
              dotColor="#03c9d7"
              // customFunc={() => handleClick("chat")}
              color="black"
              icon={<RiUserFill />}
            ></NavButton>
          </NavLink>
        )}
      </div>

      <div>
        {user.user == "" ? (
          <NavLink to="/signup">
            <NavButton
              title="signup"
              dotColor="#03c9d7"
              // customFunc={() => handleClick("chat")}
              color="black"
              icon={<RiUserAddFill />}
            />
          </NavLink>
        ) : null}
      </div>
    </div>
  );
}

export default Navbar;
