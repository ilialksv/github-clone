import { useEffect } from "react";
import { Outlet, useParams } from 'react-router-dom';
import { useLazyGetUserInfoQuery, useLazyGetReposByUserQuery } from "../store/api/api";
import { InnerNavbar, Profile } from '../components';
import Spinner from "../components/Common/Spinner";
import Error from "../components/Common/Error";
import { InnerNavigationLinkItem } from "../utils/types";
import { Location } from "../utils/enums";
import { BookmarkSquareIcon, BookOpenIcon, CubeIcon, StarIcon, TableCellsIcon } from "@heroicons/react/24/outline";
import { GITHUB_BASE_URL } from "../utils/constants";

const User = () => {
  const { user } = useParams<string>();

  const [fetchUserInfo, {
    isLoading: isUserLoading,
    isError: isUserError,
    isSuccess: isUserSuccess,
    data: userData
  }] = useLazyGetUserInfoQuery();

  const [fetchUserReposInfo, {
    isLoading: isUserReposLoading,
    isError: isUserReposError,
    isSuccess: isUserReposSuccess,
    data: userReposData
  }] = useLazyGetReposByUserQuery();

  useEffect(() => {
    if (user) {
      fetchUserInfo(user);
      fetchUserReposInfo(user);
    } else {
      fetchUserInfo('iliaalekseevofb');
      fetchUserReposInfo('iliaalekseevofb');
    }
  }, [user])

  const navigationLinks: InnerNavigationLinkItem[] = [
    {path: `/${userData?.login}/overview`, text: 'Overview', external: false, icon: <BookOpenIcon />},
    {path: `/${userData?.login}/repositories`, text: 'Repositories', external: false, icon: <BookmarkSquareIcon />},
    {path: `${GITHUB_BASE_URL}${userData?.login}/?tab=projects`, text: 'Projects', external: true, icon: <TableCellsIcon />},
    {path: `${GITHUB_BASE_URL}${userData?.login}/?tab=packages`, text: 'Packages', external: true, icon: <CubeIcon />},
    {path: `/${userData?.login}/stars`, text: 'Stars', external: false, icon: <StarIcon />},
  ]

  return (
    <div className="mt-6">
      { isUserLoading || isUserReposLoading ? <Spinner />
      : (isUserError || isUserReposError) ? <Error errorMessage="Something went wrong while fetching user data :(" />
      : (isUserSuccess && isUserReposSuccess) ? (
        <div className="w-full h-full">
          <InnerNavbar
            location={Location.USER_PAGE}
            navigationLinks={navigationLinks}
          />
          <section className="flex justify-center w-full mt-6 px-4 md:px-6 lg:px-8 duration-default">
            <div className="flex w-full max-w-7xl">
              <Profile userData={userData!} />

              <Outlet context={ userReposData } />
            </div>
          </section>
        </div>) : ''
      }
    </div>
  )
}

export default User;