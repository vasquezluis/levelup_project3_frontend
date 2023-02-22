import { Link, NavLink } from "react-router-dom";

import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import {
  RiDashboardFill,
  RiMovie2Fill,
  RiUserFill,
  RiCollageFill,
  RiSlideshow3Fill,
} from "react-icons/ri";

import { SiShopware } from "react-icons/si";
import { MdOutlineCancel } from "react-icons/md";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";

import { useStateContext } from "../../contexts/ContextProvider";

function MainNavbar() {
  // ? booleano del sidebar | desde el contexto
  const { activeMenu, setActiveMenu } = useStateContext();

  // ? classes para link activo
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-black font-bold text-md m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray";

  const links = [
    {
      title: "Cartelera",
      links: [
        {
          name: "Destacadas",
          url: "",
          icon: <RiMovie2Fill />,
        },
        {
          name: "cartelera",
          url: "cartelera",
          icon: <RiSlideshow3Fill />,
        },
      ],
    },
    {
      title: "Mi Perfil",
      links: [
        {
          name: "perfil",
          url: "userdash",
          icon: <RiUserFill />,
        },
      ],
    },
    {
      title: "Admin",
      links: [
        {
          name: "admin",
          url: "admindash",
          icon: <RiCollageFill />,
        },
      ],
    },
  ];

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          {/* Parte superior del sidebar */}
          <div className="flex justify-between items-center">
            {/* Boton para ir al inicio */}
            <Link
              to="/"
              // onClick={() => setActiveMenu(false)}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <RiMovie2Fill /> <span>Cines de Guatemala</span>
            </Link>
            {/* Boton para cerrar el sidebar */}
            <TooltipComponent content="menu" position="BottomCenter">
              <button
                type="button"
                onClick={() =>
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          {/* parte inferior del sidebar | div para items */}
          <div className="mt-10">
            {links.map((item, index) => (
              <div key={index}>
                <p className="text-gray-400 m-3 mt-4 uppercase">{item.title}</p>
                {item.links.map((link, index) => (
                  <NavLink
                    to={`/${link.url}`}
                    key={index}
                    onClick={() => {}}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MainNavbar;
