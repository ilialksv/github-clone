import { NavLink } from "react-router-dom";
import { GithubMark } from "../assets";
import { Bars3Icon } from "@heroicons/react/24/outline";
import { GITHUB_BASE_URL } from "../utils/constants";
import { NavigationLinkItem } from "../utils/types";
import Search from "./Navbar/Search";
import NavigationLink from "./Navbar/NavigationLink";
import DarkThemeToggle from "./Navbar/DarkThemeToggle";
import DropdownMenu from "./Navbar/DropdownMenu";
import {useState} from "react";

const Navbar = () => {
  const [ isDropdownOpened, setIsDropdownOpened ] = useState<boolean>(false);

  const navigationLinks: NavigationLinkItem[] = [
    {path: `${GITHUB_BASE_URL}/pulls`, text: 'Pull requests', external: true},
    {path: `${GITHUB_BASE_URL}/issues`, text: 'Issues', external: true},
    {path: `${GITHUB_BASE_URL}/codespaces`, text: 'Codespaces', external: true},
    {path: `${GITHUB_BASE_URL}/marketplace`, text: 'Merketplace', external: true},
    {path: `${GITHUB_BASE_URL}/explore`, text: 'Explore', external: true},
  ]

  return (
    <nav className="flex z-30 justify-center items-center w-full h-15 px-4 md:px-6 lg:px-8 bg-gray-700 duration-default">
      {/* For cases when screen size larger than 1024px */}
      <div className="hidden lg:flex z-20 bg-gray-700 justify-between items-center w-full h-full">
        <div className="flex items-center">
          <NavLink className="shrink-0 w-8" to="/">
            <img
              className="w-full hover:opacity-70 duration-default"
              src={GithubMark}
              alt="GitHub mark"
            />
          </NavLink>
          <Search setIsDropdownOpened={ setIsDropdownOpened } />
          {navigationLinks?.map((navLink: NavigationLinkItem, index: number) => (
            <NavigationLink
              key={index}
              path={navLink.path}
              text={navLink.text}
              external={navLink.external}
            />
          ))}
        </div>
        <DarkThemeToggle />
      </div>

      {/* For cases when screen size smaller than 1024px */}
      <div className="z-20 flex h-full lg:hidden justify-between items-center bg-gray-700 w-full">
        <button
          className="border-none outline-none"
          onClick={() => setIsDropdownOpened(prev => !prev)}
        >
          <Bars3Icon className="w-8 h-8 text-gray-100 hover:opacity-70 duration-default" />
        </button>
        <NavLink className="shrink-0 w-8" to="/">
          <img
            className="w-full hover:opacity-70 duration-default"
            src={GithubMark}
            alt="GitHub mark"
          />
        </NavLink>
        <DarkThemeToggle />
      </div>
      <DropdownMenu
        isDropdownOpened={ isDropdownOpened }
        navigationLinks={ navigationLinks }
      />
    </nav>
  )
}

export default Navbar