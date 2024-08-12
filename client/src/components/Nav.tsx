import React, { useRef } from "react";

const Nav: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: any) => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= (e.deltaY * 40) / 10;
    }
  };

  return (
    <nav
      className="w-full flex flex-row items-center justify-start row-span-1 overflow-x-scroll select-none scroll-smooth"
      ref={scrollRef}
      onWheel={handleScroll}
      style={{
        scrollbarWidth: "none", // Firefox için scrollbar'ı gizler
        msOverflowStyle: "none", // IE ve Edge için scrollbar'ı gizler
      }}
    >
      {[
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
      ].map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-center bg-primary-500 px-5 py-2 pb-4 hover:bg-primary-600 cursor-pointer border-x-[1px] border-primary-400"
        >
          Kategori{index}
        </div>
      ))}
    </nav>
  );
};

export default Nav;
