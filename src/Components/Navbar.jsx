import React, { useEffect, useState } from "react";
import { FaRegMoon } from "react-icons/fa";
import { GoSun } from "react-icons/go";

function Navbar() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    const newTheme = theme == "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme == "dark");
    localStorage.setItem("theme",newTheme)
  };
  
  useEffect(()=>{
    const myTheme = localStorage.getItem("theme") || "light";
    setTheme(myTheme);
        document.documentElement.classList.toggle("dark", myTheme == "dark");

  })

  return (
    <div className="w-[90%] mx-auto px-2 py-4 border-b border-gray-200 bg-transparent">
      <div className="flex justify-between items-center">
        <div className="text-3xl font-bold text-blue-500">ProStore</div>

        <div
          onClick={toggleTheme}
          className=" border-gray-400 border p-2 rounded-lg cursor-pointer hover:bg-gray-200 dark:bg-blue-500 dark:text-white"
        >
          {theme == "dark" ? <GoSun size={20} /> : <FaRegMoon size={20} />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
