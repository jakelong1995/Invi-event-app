import React from "react";
import { useState, useEffect } from "react";
import { getAsync } from "../../../api";
import { useNavigate } from "react-router-dom";
import EventCard from "./EventCard";
import { Segmented } from "antd";

const EventHomeStructure = () => {
  const [events, setEvents] = useState([]);
  const [currentTab, setCurrentTab] = useState("Upcoming"); // Set default tab
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

  const getCurrentDate = () => {
    const currentDate = new Date();
    return currentDate.toISOString(); // Chuyển đổi ngày hiện tại sang định dạng giống với ngày của Firebase
  };

  // Hàm để phân loại sự kiện thành Upcoming và Past
  const categorizeEvents = (events) => {
    const currentDate = getCurrentDate();

    const upcomingEvents = events.filter(
      (event) => event.data.startDate > currentDate
    );
    const pastEvents = events.filter(
      (event) => event.data.startDate <= currentDate
    );

    return { upcomingEvents, pastEvents };
  };

  const { upcomingEvents, pastEvents } = categorizeEvents(events);
  const handleTabChange = (tab) => {
    setCurrentTab(tab);
  };
  return (
    <div className="flex flex-col items-center p-2 mb-6">
      {/* tab */}
      <div className="flex justify-between items-center w-full">
        <h1 className="font-semibold text-3xl">Events</h1>
        <Segmented
          block
          className="flex w-52 bg-gray-100 rounded-lg p-1 font-medium text-sm"
          options={["Upcoming", "Past"]}
          onChange={handleTabChange}
        />
      </div>

      {/* contents */}
      {currentTab === "Upcoming" && (
        <div className="mt-8 flex flex-col gap-4 w-full max-w-2xl">
          {upcomingEvents.map((event) => (
            <div key={event.id}>
              <EventCard
                id={event.id}
                eventName={event.data.eventName}
                startDate={event.data.startDate}
                eventLocation={event.data.eventLocation}
                eventLink={event.data.eventLink}
                color={event.data.color.value}
                image={event.data.image}
                onClick={() => navigateManageEvent(event.id)}
              />
            </div>
          ))}
        </div>
      )}

      {currentTab === "Past" && (
        <div className="mt-8 flex flex-col gap-4 w-full max-w-2xl">
          {pastEvents.map((event) => (
            <div key={event.id}>
              <EventCard
                id={event.id}
                eventName={event.data.eventName}
                startDate={event.data.startDate}
                eventLocation={event.data.eventLocation}
                eventLink={event.data.eventLink}
                color={event.data.color.value}
                image={event.data.image}
                onClick={() => navigateManageEvent(event.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EventHomeStructure;
