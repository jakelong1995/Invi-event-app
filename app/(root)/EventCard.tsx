import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { getAsync } from "../../../api";

const EventCard = ({
  id,
  eventName,
  startDate,
  eventLocation,
  image,
  eventLink,
  onClick,
}) => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventsData = await getAsync("event-management");
        setEvents(eventsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const navigate = useNavigate();
  const navigateManageEvent = (itemId) => {
    navigate(`/event-management/${itemId}`);
  };

  // Function to extract time from a date string
  const extractDateTime = (dateTimeString) => {
    const dateObject = new Date(dateTimeString);

    // Options for formatting the date
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const formattedDate = dateObject.toLocaleDateString("en-US", options);

    // Options for formatting the time
    const timeOptions = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };

    const formattedTime = dateObject.toLocaleTimeString("en-US", timeOptions);

    return `${formattedDate}, ${formattedTime}`;
  };
  return (
    <div className="flex bg-white p-4 rounded-xl w-full gap-4">
      <div className="flex flex-col gap-2 w-full">
        <p className="text-gray-500">{extractDateTime(startDate)}</p>
        <h2 className="text-gray-800 font-semibold text-xl">{eventName}</h2>
        <div className="flex gap-1 items-center text-gray-500 ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
            />
          </svg>
          <p>
            {eventLocation}
            {/* {eventLink} */}
          </p>
        </div>
        <button
          className="w-fit gap-2 px-3 py-2 bg-black bg-opacity-5 hover:bg-gray-500 hover:text-white hover: border-none rounded-lg inline-flex text-gray-500 text-sm font-semibold"
          onClick={() => navigateManageEvent(id)}
        >
          <p> Manage Event</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M3 10a.75.75 0 0 1 .75-.75h10.638L10.23 5.29a.75.75 0 1 1 1.04-1.08l5.5 5.25a.75.75 0 0 1 0 1.08l-5.5 5.25a.75.75 0 1 1-1.04-1.08l4.158-3.96H3.75A.75.75 0 0 1 3 10Z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <img
        className="rounded-lg w-36"
        src={image}
        alt="eventImg"
        onError={(e) => console.error("Error loading image:", e)}
      />
    </div>
  );
};

export default EventCard;
