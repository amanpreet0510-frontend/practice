import React from "react";
import Image from "next/image";
import { MenuItem } from "@/types/menu.types";
import Search from "../ui/Search";
import {Button} from '../ui/button'

const menu: MenuItem[] = [
  {
    label: "App",
    href: "/",
    image: "https://cdn-icons-png.flaticon.com/128/4945/4945989.png",
  },
];

const navbar = () => {
  return (
    <>
      <nav className="container w-full">
        <ul className="">
          {menu.map((item, id) => (
            <React.Fragment key={id}>
              <div className="flex justify-between">
                <li className="p-10 text-4xl font-extrabold text-[#1581BF]  rounded-[50px]">{item.label}</li>
                <Search />
                <li>
                  <Image
                    alt=" "
                    height={80}
                    width={100}
                    className="p-5 me-10"
                    src={item.image}
                  />
                </li>
              </div>
            </React.Fragment>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default navbar;
