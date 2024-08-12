import React, { useState } from "react";
import Nav from "./Nav";
import { FaSearch } from "react-icons/fa";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";

const iconSize = 21;

const Header: React.FC = () => {
  const [headerMenuState, setHeaderMenuState] = useState<boolean>(false);
  const headerMenuToggle = () => {
    setHeaderMenuState(!headerMenuState);
    console.log(headerMenuState);
  };

  return (
    <>
      <header className="bg-secondary-50 w-full h-24 sm:h-32 grid grid-rows-4 border-b-[1px] place-items-center overflow-hidden">
        <div className="flex flex-row items-center justify-between w-full px-5 row-span-3 h-1/2 mb-2">
          <div className="w-auto text-2xl sm:text-3xl">LOGO</div>
          {/* <div className="flex sm:hidden p-3">
          <FaSearch size={iconSize} />
        </div> */}
          {/* <div className="hidden sm:flex items-center justify-center flex-row overflow-hidden rounded-md h-full bg-secondary-100"> */}
          <div className="flex items-center justify-center flex-row overflow-hidden rounded-md bg-secondary-100 h-10 sm:h-12 mx-4">
            <div className="h-full p-4 pr-2 flex items-center justify-center">
              <FaSearch size={iconSize - 2} />
            </div>
            <div>
              <input
                type="text"
                placeholder="Bir ürün arayın..."
                className="w-full h-full bg-transparent p-1 outline-none"
              />
            </div>
            <button className="bg-primary-500 py-3 px-4 text-lg hover:bg-primary-600">
              Ara
            </button>
          </div>
          <div className="flex items-center justify-center flex-row">
            <a
              href="#"
              className="hidden sm:flex items-center justify-center flex-row m-1 sm:m-2 h-full p-2 hover:text-primary-600"
            >
              <FaArrowRightToBracket size={iconSize} />
              <span className="ml-2 transition">Giriş Yap</span>
            </a>
            <a
              href="#"
              className="hidden sm:flex items-center justify-center flex-row m-1 sm:m-2 h-full p-2 hover:text-primary-600"
            >
              <FaCartShopping size={iconSize} />
              <span className="ml-2 transition">Sepetim</span>
            </a>
          </div>
          <div className="flex sm:hidden">
            <FaBars
              size={iconSize + 2}
              onClick={() => headerMenuToggle()}
              className="hover:text-primary-600 cursor-pointer"
            />
          </div>
        </div>
        <Nav />
      </header>
      <div
        className={
          "w-full bg-secondary-50 border-b-[1px] items-center justify-center flex-col " +
          (headerMenuState ? "flex" : "hidden")
        }
      >
        <a
          href="#"
          className="flex items-center justify-start flex-row p-4 hover:text-primary-600 w-10/12 border-b-[1px]"
        >
          <FaArrowRightToBracket size={iconSize} />
          <span className="ml-2 transition">Giriş Yap</span>
        </a>
        <a
          href="#"
          className="flex items-center justify-start flex-row p-4 hover:text-primary-600 w-10/12"
        >
          <FaCartShopping size={iconSize} />
          <span className="ml-2 transition">Sepetim</span>
        </a>
      </div>
    </>
  );
};

export default Header;
