import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import useDynamicTextColor from "../../Components/useDynamicTextColor";

export default function Requests() {
  const user = useSelector((state) => state.user);
  const [activeToggle, setActiveToggle] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const requestId = "ID" + new Date().getTime();
  const dispatch = useDispatch();
  const { backgroundColor, textColor } = useDynamicTextColor();

  const handleToggle = (section) => {
    setActiveToggle(activeToggle === section ? null : section);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setTitle(value);
    } else if (name === "description") {
      setDescription(value);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();

    const newRequest = {
      requestID: requestId,
      title: title,
      description: description,
      status: "pending",
      date: new Date().toLocaleString("en-EN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
      id_user: user.id,
    };

    try {
      const response = await axios.put(
        `https://676187c546efb37323720b38.mockapi.io/stagiaires/${user.id}`,
        { ...user, requests: [...user.requests, newRequest] }
      );
      dispatch({ type: "ADD_REQUEST", payload: newRequest });
      console.log("Request added successfully!");
      console.log("API Response:", response.data);

      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed to update user data:", error);
    }
  };

  return (
    <>
      {user.admin ? (
        <div id="accordion-collapse" className="px-10 mt-10">
          <h2 id="accordion-collapse-heading-1">
            <button
              type="submit"
              onClick={() => handleToggle(1)}
              className="flex items-center justify-between bg-white w-[95%] p-5 font-medium rtl:text-right rounded-t-xl border-2 border-gray-300 gap-3"
              aria-expanded={activeToggle === 1}
              aria-controls="accordion-collapse-body-1"
            >
              <span className="bg-yellow-100 text-yellow-700 text-lg font-medium me-2 px-2.5 py-0.5 rounded">
                Under review
              </span>
              {activeToggle === 1 ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </button>
          </h2>
          <div
            id="accordion-collapse-body-1"
            className="overflow-hidden w-[95%] transition-[max-height] duration-300 ease-in-out"
            style={{ maxHeight: activeToggle === 1 ? "1000px" : "0" }}
            aria-labelledby="accordion-collapse-heading-1"
          >
            <div className="p-5 border border-b-0 border-gray-200">
              <p className="mb-2 text-gray-500 text-wrap">
                {/* Content here */}
              </p>
            </div>
          </div>

          <h2 id="accordion-collapse-heading-2">
            <button
              type="button"
              onClick={() => handleToggle(2)}
              className="flex items-center justify-between bg-white w-[95%] p-5 font-medium rtl:text-right border-2 border-gray-300 gap-3"
              aria-expanded={activeToggle === 2}
              aria-controls="accordion-collapse-body-2"
            >
              <span className="bg-green-100 text-green-700 text-lg font-medium me-2 px-2.5 py-0.5 rounded">
                Accepted
              </span>
              {activeToggle === 2 ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </button>
          </h2>
          <div
            id="accordion-collapse-body-2"
            className="overflow-hidden w-[95%] transition-[max-height] duration-300 ease-in-out"
            style={{ maxHeight: activeToggle === 2 ? "1000px" : "0" }}
            aria-labelledby="accordion-collapse-heading-2"
          >
            <div className="p-5 border border-b-0 border-gray-200">
              <p className="mb-2 text-gray-500">{/* Content here */}</p>
            </div>
          </div>

          <h2 id="accordion-collapse-heading-3">
            <button
              type="button"
              onClick={() => handleToggle(3)}
              className="flex items-center justify-between bg-white w-[95%] p-5 font-medium rtl:text-right border-2 border-gray-300 gap-3"
              aria-expanded={activeToggle === 3}
              aria-controls="accordion-collapse-body-3"
            >
              <span className="bg-red-100 text-red-700 text-lg font-medium me-2 px-2.5 py-0.5 rounded">
                Rejected
              </span>
              {activeToggle === 3 ? (
                <FontAwesomeIcon icon={faChevronUp} />
              ) : (
                <FontAwesomeIcon icon={faChevronDown} />
              )}
            </button>
          </h2>
          <div
            id="accordion-collapse-body-3"
            className="overflow-hidden w-[95%] transition-[max-height] duration-300 ease-in-out"
            style={{ maxHeight: activeToggle === 3 ? "1000px" : "0" }}
            aria-labelledby="accordion-collapse-heading-3"
          >
            <div className="p-5 border border-b-0 border-gray-200">
              <p className="mb-2 text-gray-500">{/* Content here */}</p>
            </div>
          </div>
        </div>
      ) : (
        <form className="max-w-md mx-auto my-10 bg-white p-10 h-quto w-full">
          <legend className="text-3xl font-semibold mb-5">Request form</legend>
          <div className="relative z-0 w-full mb-5 group pb-8">
            <input
              onChange={handleChange}
              type="text"
              name="title"
              id="title"
              className="block py-2.5 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="title"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto  peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Object
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <textarea
              onChange={handleChange}
              name="description"
              id="description"
              className="block pt-3 px-0 w-full text-lg text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="description"
              className="peer-focus:font-medium absolute text-lg text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Description
            </label>
          </div>
          <button
            onClick={handleApply}
            type="button"
            className="w-full text-white focus:ring-4 hover:opacity-80 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none "
            style={{
              color: textColor,
              backgroundColor: backgroundColor,
              border: `1px solid ${textColor}`,
            }}
          >
            Apply Form
          </button>
        </form>
      )}
    </>
  );
}
