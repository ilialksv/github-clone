import { NavLink } from "react-router-dom";
import { InnerNavigationLinkItem } from "../../utils/types";

const NavigationLink = ({ path, text, external, icon }: InnerNavigationLinkItem) => {
  const NavigationLinkInner = () => {
    return (
      <div className="flex items-center rounded-md px-2 py-1 hover:bg-gray-300 duration-default">
        <span className="w-5 h-5 mr-1 text-gray-400">
          {icon}
        </span>
        <span className="text-gray-200 leading-4 whitespace-nowrap">
          {text}
        </span>
      </div>
    )
  }

  return (
    external
    ? <a href={path} target="_blank" className="user-link">
        <NavigationLinkInner />
      </a>
    : <NavLink
        to={path}
        className={({ isActive}) =>
          isActive ? "user-link border-orange-400" : "user-link"
        }
      >
        <NavigationLinkInner />
      </NavLink>
  )
}
export default NavigationLink
