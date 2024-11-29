import React, { useContext } from 'react'
import {assets} from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
const NavBar = () => {

    const { setshowLogin, user, credit, logOut } = useContext(AppContext);
    const navigate =useNavigate();
     const onClikHandler = () => {
       if (user) {
         navigate("/result");
       } else {
         setshowLogin(true);
       }
     };
  return (
    <div className="flex items-center justify-between py-4">
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="w-28 sm:w-32 md:w-40" />
      </Link>
      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            {/* user details */}
            <button
              onClick={() => navigate("/buycredit")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 rounded-full hover:scale-105 transition-all duration-700"
            >
              <img src={assets.credit_star} alt="" className="w-5" />
              <p className="text-xs sm:text-sm font-medium">
                Cridit left: {credit}
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4 ">Hi ,{user.name}</p>
            <div className="relative group">
              <img
                src={assets.profile_icon}
                className="w-10 drop-shadow"
                alt=""
              />
              <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-12">
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm">
                  <li
                    onClick={logOut}
                    className="py-1 px-2 cursor-pointer pr-10"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            {/* Log out Design */}
            <p
              onClick={() => navigate("/buycredit")}
              className=" cursor-pointer"
            >
              Pricing
            </p>
            <button
              onClick={onClikHandler}
              className="bg-zinc-800 text-white py-2 px-7 sm:px-10 text-sm rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NavBar