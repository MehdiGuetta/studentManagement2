import React, { useState } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import useDynamicTextColor from "../../Components/useDynamicTextColor";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ChevronDown, ChevronUp, Clock, CheckCircle2, XCircle, FileText, Calendar, AlignLeft } from 'lucide-react';

export default function Requests() {
  const [activeToggle, setActiveToggle] = useState(null);
  const { backgroundColor, textColor } = useDynamicTextColor();
  const user = useSelector((state) => state.user);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [reqList, setReqList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [updatedRequest, setUpdatedRequest] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const requestId = "ID" + new Date().getTime();

  useEffect(() => {
    axios
      .get(`https://676187c546efb37323720b38.mockapi.io/stagiaires/`)
      .then((res) => {
        const response = res.data;
        const allRequests = response.flatMap((item) => item.requests);
        setUserList(response);
        setReqList(allRequests);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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

    if (!title.trim() || !description.trim()) {
      setError("Title and description are required!");
      return;
    }

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
      await axios.put(
        `https://676187c546efb37323720b38.mockapi.io/stagiaires/${user.id}`,
        { ...user, requests: [...user.requests, newRequest] }
      );
      dispatch({ type: "ADD_REQUEST", payload: newRequest });
      navigate("../see-requests");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Failed to update user data:", error);
    }
  };

  const handleAcceptButton = (requestID, idUser) => {
    const updatedUserList = userList.map((user) => {
      if (user.id === idUser) {
        const updatedRequests = user.requests.map((req) => {
          if (req.requestID === requestID) {
            return { ...req, status: "accepted" };
          }
          return req;
        });
        return { ...user, requests: updatedRequests };
      }
      return user;
    });

    setUserList(updatedUserList);
    setReqList(updatedUserList.flatMap((user) => user.requests));
    const updatedUser = updatedUserList.find((user) => user.id === idUser);
    setUpdatedRequest({ idUser, updatedUser });
  };

  const handleRejectButton = (requestID, idUser) => {
    const updatedUserList = userList.map((user) => {
      if (user.id === idUser) {
        const updatedRequests = user.requests.map((req) => {
          if (req.requestID === requestID) {
            return { ...req, status: "rejected" };
          }
          return req;
        });
        return { ...user, requests: updatedRequests };
      }
      return user;
    });

    setUserList(updatedUserList);
    setReqList(updatedUserList.flatMap((user) => user.requests));
    const updatedUser = updatedUserList.find((user) => user.id === idUser);
    setUpdatedRequest({ idUser, updatedUser });
  };

  useEffect(() => {
    const updateRequestStatus = async () => {
      if (!updatedRequest) return;

      try {
        const { idUser, updatedUser } = updatedRequest;
        await axios.put(
          `https://676187c546efb37323720b38.mockapi.io/stagiaires/${idUser}`,
          { ...updatedUser }
        );
      } catch (error) {
        if (error.response && error.response.status === 429) {
          setTimeout(() => setUpdatedRequest(updatedRequest), 3000);
        } else {
          console.error("Error updating request status:", error);
        }
      }
    };

    updateRequestStatus();
  }, [updatedRequest]);

  const RequestCard = ({ request, onAccept, onReject, showAccept = true, showReject = true }) => (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-4 transition-all duration-200 hover:shadow-md border border-gray-100">
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <FileText className="text-gray-400 mt-1" size={20} />
            <div>
              <h3 className="text-xl font-semibold text-gray-800 leading-tight">{request.title}</h3>
              <div className="flex items-center gap-2 mt-2 text-gray-500">
                <Calendar size={14} />
                <span className="text-sm">{request.date}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-start gap-3 pl-9">
          <AlignLeft className="text-gray-400 mt-1" size={16} />
          <p className="text-gray-600 leading-relaxed">{request.description}</p>
        </div>
        <div className="flex gap-3 mt-2 pl-9">
          {showAccept && (
            <button
              onClick={() => onAccept(request.requestID, request.id_user)}
              className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors duration-200 font-medium"
            >
              <CheckCircle2 size={18} />
              Accept
            </button>
          )}
          {showReject && (
            <button
              onClick={() => onReject(request.requestID, request.id_user)}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200 font-medium"
            >
              <XCircle size={18} />
              Reject
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const AccordionSection = ({ title, icon: Icon, bgColor, textColor, requests, status }) => (
    <div className="mb-6">
      <button
        onClick={() => handleToggle(status)}
        className="flex items-center justify-between w-full p-5 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 border border-gray-100"
      >
        <div className="flex items-center gap-3">
          <span className={`${bgColor} ${textColor} text-lg font-medium px-4 py-2 rounded-lg flex items-center gap-2`}>
            <Icon size={20} />
            {title}
          </span>
        </div>
        {activeToggle === status ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>
      <div
        className={`mt-3 transition-all duration-300 ease-in-out overflow-hidden ${
          activeToggle === status ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="space-y-4 p-2">
          {reqList
            .filter((req) => req.status === status)
            .map((req) => (
              <RequestCard
                key={req.requestID}
                request={req}
                onAccept={handleAcceptButton}
                onReject={handleRejectButton}
                showAccept={status !== "accepted"}
                showReject={status !== "rejected"}
              />
            ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {user.admin ? (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
              <h1 className="text-3xl font-bold text-gray-800">Request Management</h1>
              <p className="text-gray-500 mt-2">Manage and respond to user requests</p>
            </div>
            <AccordionSection
              title="Under Review"
              icon={Clock}
              bgColor="bg-yellow-50"
              textColor="text-yellow-600"
              requests={reqList}
              status="pending"
            />
            <AccordionSection
              title="Accepted"
              icon={CheckCircle2}
              bgColor="bg-green-50"
              textColor="text-green-600"
              requests={reqList}
              status="accepted"
            />
            <AccordionSection
              title="Rejected"
              icon={XCircle}
              bgColor="bg-red-50"
              textColor="text-red-600"
              requests={reqList}
              status="rejected"
            />
          </div>
        ) : (
          <div className="max-w-xl mx-auto">
            <form className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800">Submit a Request</h2>
                <p className="text-gray-500 mt-2">Fill out the form below to submit your request</p>
              </div>
              <div className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                    Title
                  </label>
                  <div className="relative">
                    <FileText className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={title}
                      onChange={handleChange}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="Enter request title"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <div className="relative">
                    <AlignLeft className="absolute left-3 top-3 text-gray-400" size={20} />
                    <textarea
                      id="description"
                      name="description"
                      value={description}
                      onChange={handleChange}
                      rows={4}
                      className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      placeholder="Enter request description"
                      required
                    />
                  </div>
                </div>
                {error && (
                  <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg flex items-center gap-2">
                    <XCircle size={18} />
                    <p className="text-sm">{error}</p>
                  </div>
                )}
                <button
                  onClick={handleApply}
                  type="submit"
                  className="w-full py-3 px-4 text-white font-medium rounded-lg transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
                  style={{
                    backgroundColor: backgroundColor,
                    color: textColor,
                  }}
                >
                  <CheckCircle2 size={20} />
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}