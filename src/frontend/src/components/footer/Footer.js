import React from "react";

function Footer() {
  return (
    <footer className="bg-white dark:bg-background-darker text-gray-600 dark:text-gray-300 p-4 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-col justify-between items-center text-sm gap-2">
        <p className="text-center lg:text-left">
          © 2023 DoSSIER Project
        </p>
        <a href="/about" className="hover:underline text-orange-default">
          About
        </a>
        <a href="/faq" className="hover:underline text-orange-default">
        FAQ
        </a>
      </div>
    </footer>
  );
}

export default Footer;
