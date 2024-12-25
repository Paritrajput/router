import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../Context/userContext";

function Popup({ isOpen, onClose, content }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <div className="bg-white  p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">{content.title}</h2>
        <p className="text-sm text-gray-600  mb-4">{content.text}</p>
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
  const [popupContent, setPopupContent] = useState(null);

  const togglePopup = (type) => {
    if (type === "terms") {
      setPopupContent({
        title: "Terms & Conditions",
        text: `By using newsbase, you agree to abide by our Terms & Conditions.
        Please read them carefully to understand your rights and responsibilities.
        
        1. Acceptance of Terms: By accessing our platform, you agree to these terms.
        If you disagree, please refrain from using our services.
        
        2. User Responsibilities: You are responsible for the content you post and
        ensuring it adheres to our guidelines. Respect intellectual property rights
        when sharing or creating content. Avoid posting harmful, abusive, or offensive material.
        
        3. Account Security: Keep your login credentials confidential. Any activity
        from your account is your responsibility.
        
        4. Content Ownership: You retain ownership of the content you create, but by
        posting it on newsbase, you grant us the right to display and promote it on our platform.
        
        5. Termination of Use: We reserve the right to suspend or terminate accounts
        that violate our terms or misuse the platform.
        
        6. Liability Disclaimer: We are not liable for any damages arising from the use
        of our platform. Use our services at your own risk.`,
      });
    } else if (type === "privacy") {
      setPopupContent({
        title: "Privacy Policy",
        text: `Your privacy is important to us. This Privacy Policy outlines how we collect, 
        use, and protect your personal information while using newsbase.
        
        1. Information We Collect: We collect personal details such as your name, email address, 
        and content you create or share on the platform.
        
        2. Use of Information: Your data is used to improve our services, communicate with you, 
        and personalize your experience on newsbase.
        
        3. Data Protection: We implement robust measures to safeguard your data against unauthorized access, 
        loss, or misuse.
        
        4. Sharing Data: We do not sell your personal data. It is only shared with third parties when necessary 
        to provide services or comply with legal obligations.
        
        5. Cookies: We use cookies to enhance your user experience. You can manage cookie preferences in your browser settings.
        
        6. Your Rights: You have the right to access, modify, or delete your personal data. Contact us for support.
        
        By using newsbase, you consent to this Privacy Policy.`,
      });
    } else {
      setPopupContent(null);
    }
  };

  const closePopup = () => setPopupContent(null);

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
                <img
                  src="/logo_newBase.png"
                  className="mr-3 h-8 sm:h-10 md:h-12"
                  alt="Logo"
                />
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
                    <Link to="/contact" className="hover:underline">
                      contact
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
                      href="https://github.com/paritrajput"
                      className="hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Github
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.linkedin.com/in/parit-rajput-9ba7651b4/"
                      className="hover:underline"
                      target="_blank"
                      rel="noreferrer"
                    >
                      Linkdin
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase">Legal</h2>
                <ul className="text-gray-500 font-medium">
                  <li className="mb-4">
                    <button
                      onClick={() => togglePopup("privacy")}
                      className="hover:underline text-gray-500"
                    >
                      Privacy Policy
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => togglePopup("terms")}
                      className="hover:underline text-gray-500"
                    >
                      Terms & Conditions
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
      {popupContent && (
        <Popup
          isOpen={!!popupContent}
          onClose={closePopup}
          content={popupContent}
        />
      )}
    </>
  );
}
