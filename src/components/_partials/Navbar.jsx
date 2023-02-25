import { NavLink } from "react-router-dom";

import { RiUserFill, RiUserAddFill } from "react-icons/ri";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { useStateContext } from "../../contexts/ContextProvider";

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
  const { activeMenu, setActiveMenu } = useStateContext();

  return (
    <div className="flex justify-end p-2 md:mx-6 relative">
      {/* <NavButton
        title="Menu"
        customFunc={() => setActiveMenu((prevActiveMenu) => !activeMenu)}
        color="blue"
        icon={<AiOutlineMenu />}
      /> */}

      {/* other icons on navbar */}
      <div>
        <NavLink to="/login">
          <NavButton
            title="signin"
            dotColor="#03c9d7"
            // customFunc={() => handleClick("chat")}
            color="black"
            icon={<RiUserFill />}
          />
        </NavLink>
      </div>

      <div>
        <NavLink to="/signup">
          <NavButton
            title="signup"
            dotColor="#03c9d7"
            // customFunc={() => handleClick("chat")}
            color="black"
            icon={<RiUserAddFill />}
          />
        </NavLink>
      </div>
    </div>
  );
}

export default Navbar;
