import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCheckCircle,
  faTimesCircle,
  faChevronDown,
  faChevronUp,
  faSearch,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";

const SeeRequests = () => {
  const requests = useSelector((state) => state.user.requests) || [];
  const [expandedRequest, setExpandedRequest] = useState(null);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const getStatusBadge = (status) => {
    let style, text, icon;
    switch (status) {
      case "pending":
        style = "bg-yellow-100 text-yellow-700";
        text = "Pending";
        icon = faClock;
        break;
      case "approved":
        style = "bg-green-100 text-green-700";
        text = "Approved";
        icon = faCheckCircle;
        break;
      case "rejected":
        style = "bg-red-100 text-red-700";
        text = "Rejected";
        icon = faTimesCircle;
        break;
      default:
        style = "bg-gray-100 text-gray-700";
        text = "Unknown";
        icon = faQuestion;
    }

    return (
      <span
        className={`${style} font-medium text-sm px-2.5 py-0.5 rounded-full flex items-center`}
      >
        <FontAwesomeIcon icon={icon} className="mr-1" />
        {text}
      </span>
    );
  };

  const toggleExpand = (id) => {
    setExpandedRequest(expandedRequest === id ? null : id);
  };

  const filteredRequests = requests.filter(
    (request) =>
      (filter === "all" || request.status === filter) &&
      (request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Requests</h1>

      {requests.length === 0 ? (
        <div className="bg-white border rounded-lg shadow-lg p-8 text-center">
          <p className="text-xl text-gray-600">You have no requests yet</p>
        </div>
      ) : (
        <>
          <div className="mb-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search requests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div className="space-y-4">
            {filteredRequests.map(
              ({ requestID, title, description, status, date }) => (
                <div
                  key={requestID}
                  className="bg-white border rounded-lg shadow-md overflow-hidden transition duration-300 hover:shadow-lg"
                >
                  <div
                    className="flex justify-between items-center p-4 cursor-pointer"
                    onClick={() => toggleExpand(requestID)}
                  >
                    <div className="flex-grow">
                      <h2 className="text-xl font-semibold">{title}</h2>
                      <div className="flex items-center mt-2">
                        {getStatusBadge(status)}
                        <span className="text-sm text-gray-500 ml-2">
                          {date}
                        </span>
                      </div>
                    </div>
                    <FontAwesomeIcon
                      icon={
                        expandedRequest === requestID
                          ? faChevronUp
                          : faChevronDown
                      }
                      className="text-gray-400"
                    />
                  </div>
                  {expandedRequest === requestID && (
                    <div className="p-4 bg-gray-50 border-t">
                      <h3 className="font-semibold mb-2">Description:</h3>
                      <p className="text-gray-700">{description}</p>
                    </div>
                  )}
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default SeeRequests;
