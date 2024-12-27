import useDynamicTextColor from "../Components/useDynamicTextColor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const { backgroundColor, textColor } = useDynamicTextColor();
  const currentYear = new Date().getFullYear();
  return (

    <footer style={{ color: textColor, backgroundColor: backgroundColor }}>
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span
            className="text-sm  sm:text-center"
            style={{ color: textColor }}
          >
            © {currentYear} <span className="hover:underline">Team™</span>. All
            Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0">
            <a
              href="https://web.facebook.com/itsrealmehdi"
              target="_blank"
              style={{ color: textColor }}
              className=" dark:hover:opacity-80 ms-5 text-xl"
            >
              <FontAwesomeIcon icon={faFacebookF} />
              <span className="sr-only">Facebook page</span>
            </a>
            <a
              href="https://www.instagram.com/itsreal_mehdi/"
              target="_blank"
              style={{ color: textColor }}
              className="dark:hover:opacity-80 ms-5 text-xl"
            >
              <FontAwesomeIcon icon={faInstagram} />

              <span className="sr-only">Instagram account</span>
            </a>
            <a
              href="https://github.com/MehdiGuetta"
              target="_blank"
              style={{ color: textColor }}
              className="dark:hover:opacity-80 ms-5 text-xl"
            >
              <FontAwesomeIcon icon={faGithub} />
              <span className="sr-only">GitHub account</span>
            </a>

            <a
              href="https://www.linkedin.com/in/mehdi-bettioui-126085342/"
              target="_blank"
              style={{ color: textColor }}
              className="dark:hover:opacity-80 ms-5 text-xl"
            >
              <FontAwesomeIcon icon={faLinkedin} />
              <span className="sr-only">Linkedin community</span>
            </a>
            <a
              href="https://x.com/mehdiguetta17"
              target="_blank"
              style={{ color: textColor }}
              className="dark:hover:opacity-80 ms-5 text-xl"
            >
              <FontAwesomeIcon icon={faX} />
              <span className="sr-only">X page</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
