import { NavLink } from "react-router-dom";

function PageNavbar(props) {
  return (
    <nav className="w-full">
      <ul className="bg-gray-900 p-5 flex justify-between">
        {props.items.map((item, index) => (
          <NavLink
            key={index}
            className={({ isActive }) =>
              isActive ? "text-white" : "text-blue-500 hover:text-blue-800"
            }
            to={item.url}
          >
            {item.title}
          </NavLink>
        ))}
      </ul>
    </nav>
  );
}

export default PageNavbar;
