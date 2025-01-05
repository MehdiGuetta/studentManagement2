import { useSelector } from "react-redux";

const SeeRequests = () => {
  const requests = useSelector((state) => state.user.requests ) || [];

  const getStatusBadge = (status) => {
    let style, text;
    switch (status) {
      case "pending":
        style = "bg-yellow-100 text-yellow-700 text-lg";
        text = "Pending";
        break;
      case "approved":
        style = "bg-green-100 text-green-700 text-lg";
        text = "Approved";
        break;
      case "rejected":
        style = "bg-red-100 text-red-700 text-lg";
        text = "Rejected";
    }

    return (
      <span className={`${style} font-medium me-2 px-2.5 py-0.5 rounded`}>
        {text}
      </span>
    );
  };

  return (
    <>
      {requests.length === 0 ? (
        <div className="w-full bg-white border-b-2 text-center rounded-bl-xl rounded-br-xl shadow shadow-gray-200 p-20 text-2xl">
          You have no request yet
        </div>
      ) : (
        <div className="w-full bg-white border-b-2 rounded-bl-xl rounded-br-xl shadow shadow-gray-200">
          {requests.map(({ requestID, title, description, status, date }) => (
            <div
              key={requestID}
              className="flex flex-col justify-end items-center gap-3 px-10 py-10"
            >
              <div className="w-full flex justify-between p-">
                <h1 className="text-2xl font-bold pr-2 ">
                  {title} | {getStatusBadge(status)}
                </h1>
                <h1>{date}</h1>
              </div>
              <h1 className="inline-flex justify-start w-full text-xl">
                Description:
              </h1>
              <p className="inline-flex justify-start w-full px-10 text-lg break-all">
                {description}
              </p>
              <hr className="w-full h-px my-2 bg-black border-0" />
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default SeeRequests;
