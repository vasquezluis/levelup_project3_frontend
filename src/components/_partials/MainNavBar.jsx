import { Link } from "react-router-dom";
import { useState } from "react";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import {
  RiDashboardFill,
  RiMovie2Fill,
  RiUserFill,
  RiCollageFill,
  RiSlideshow3Fill,
} from "react-icons/ri";

function MainNavbar() {
  const [open, setOpen] = useState(true);
  const menus = [
    {
      title: "Cartelera",
      url: "/cartelera",
      icon: <RiSlideshow3Fill />,
    },
    {
      title: "Mi Perfil",
      url: "/profile",
      icon: <RiUserFill />,
    },
    {
      title: "Admin",
      url: "/admin",
      icon: <RiCollageFill />,
    },
  ];

  return (
    <div
      className={`bg-burgundy h-screen p-5 pt-12 ${
        open ? "w-72" : "w-20"
      } duration-300 relative`}
    >
      <BsArrowLeftShort
        className={`bg-burgundy text-white text-3xl rounded-full absolute -right-3 top-[50px] border border-burgundy cursor-pointer ${
          !open && "rotate-180"
        }`}
        onClick={() => {
          setOpen(!open);
        }}
      />

      <div className="inline-flex">
        <RiMovie2Fill
          className={`text-gray-300 text-4xl rounded cursro-pointer block float-left mr-2 duration-500 ${
            open && "rotate-[360deg]"
          }`}
        />
        <Link
          className={`text-white origin-left font-medium text-2xl duration-300 hover:text-light-white ${
            !open && "scale-0"
          }`}
          to="/"
        >
          <p className="text-[20px]"> Cines de Guatemala</p>
        </Link>
      </div>

      <div
        className={`flex items-center rounded-md bg-light-white mt-6 ${
          !open ? "px-2.5" : "px-4"
        } py-2`}
      >
        <BsSearch
          className={`text-white text-lg block float-left cursor-pointer ${
            open && "mr-2"
          }`}
        />
        <input
          type={"search"}
          placeholder="Search"
          className={`text-base bg-transparent w-full text-white focus:outline-none ${
            !open && "hidden"
          }`}
        />
      </div>

      <ul className="pt-2">
        {menus.map((menu, index) => (
          <div key={index}>
            <li
              className={`text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                menu.spacing ? "mt-9" : "mt-2"
              } `}
            >
              <Link to={menu.url}>
                <span className="text-2xl block float-left mr-3">
                  {menu.icon ? menu.icon : <RiDashboardFill />}
                </span>
                <span
                  className={`text-base font-medium flex-1 duration-300 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}

export default MainNavbar;
