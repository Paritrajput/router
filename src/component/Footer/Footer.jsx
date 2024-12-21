import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

function Popup({ isOpen, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">Popup Title</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
          This is the content of the popup. You can customize this as needed.
        </p>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function Footer() {
  const { theme } = useContext(UserContext);
  const [isPopupOpen, setPopupOpen] = useState(false);

  const togglePopup = () => setPopupOpen(!isPopupOpen);

  return (
    <>
      <footer
        className={`${
          theme === "light" ? "bg-white text-black" : "bg-black text-white"
        } border-y`}
      >
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between">
            <div className="mb-6 md:mb-0">
              <Link to="/" className="flex items-center">
                <img src="logo_newBase.png" className="mr-3 h-14" alt="Logo" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase">
                  Resources
                </h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <Link to="/" className="hover:underline">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link to="/about" className="hover:underline">
                      About
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase">
                  Follow us
                </h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <a
                      href="https://github.com/hiteshchoudhary"
                      className="hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <button
                      onClick={togglePopup}
                      className="hover:underline text-gray-500"
                    >
                      Discord
                    </button>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <button
                      onClick={togglePopup}
                      className="hover:underline text-gray-500"
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={togglePopup}
                      className="hover:underline text-gray-500"
                    >
                      Terms &amp; Conditions
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center">
              © 2024
              <a href="" className="hover:underline">
                paritrajput
              </a>
              . All Rights Reserved.
            </span>
          </div>
        </div>
      </footer>
      <Popup isOpen={isPopupOpen} onClose={togglePopup} />
    </>
  );
}
