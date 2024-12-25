import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Requests() {
  const [activeToggle, setActiveToggle] = useState(null);

  const handleToggle = (section) => {
    setActiveToggle(activeToggle === section ? null : section);
  };

  return (
    <div id="accordion-collapse" className="px-10 mt-10">
      <h2 id="accordion-collapse-heading-1">
        <button
          type="button"
          onClick={() => handleToggle(1)}
          className="flex items-center justify-between w-[95%] p-5 font-medium rtl:text-right rounded-t-xl border-2 border-gray-300 gap-3"
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
          <p className="mb-2 text-gray-500 text-wrap">{/* Content here */}</p>
        </div>
      </div>

      <h2 id="accordion-collapse-heading-2">
        <button
          type="button"
          onClick={() => handleToggle(2)}
          className="flex items-center justify-between w-[95%] p-5 font-medium rtl:text-right border-2 border-gray-300 gap-3"
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
          className="flex items-center justify-between w-[95%] p-5 font-medium rtl:text-right border-2 border-gray-300 gap-3"
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
  );
}
