import { useState, useEffect } from "react";
import { getAsync, createAsync } from "../../../api";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImageSelect from "./ImageSelect";
import ThemeColor from "./ThemeColor";
import { colors } from "../../common/Colors";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

const CreateEvent = () => {
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const getDefaultStartDate = () => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 8, 0, 0, 0); // Round to the next hour
    return currentDate.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
  };

  const getDefaultEndDate = () => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 9, 0, 0, 0); // Round to the next hour
    return currentDate.toISOString().slice(0, 16); // Format as "YYYY-MM-DDTHH:mm"
  };

  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    eventName: "",
    startDate: getDefaultStartDate(),
    endDate: getDefaultEndDate(),
    eventOnline: false,
    eventLink: "",
    eventLocation: "",
    requireApproval: false,
    capacity: "",
    image:
      "https://firebasestorage.googleapis.com/v0/b/event-invitation-project.appspot.com/o/goodvibes.webp?alt=media&token=05eece16-0515-45c3-a570-aabaa6322fb7", // Assuming you want to upload an image
    color: selectedColor,
    typeFace: "",
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prevData) => {
      return { ...prevData, [name]: type === "checkbox" ? checked : value };
    });
  };

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

  const handleAdd = async (event) => {
    event.preventDefault();

    // Check if event name is provided
    if (!formData.eventName.trim()) {
      toast.error("Event Name is required");
      return;
    }

    try {
      // Create an event based on user input
      const eventData = {
        eventName: formData.eventName,
        startDate: formData.startDate,
        endDate: formData.endDate,
        eventOnline: formData.eventOnline,
        eventLink: formData.eventLink,
        eventLocation: formData.eventLocation,
        requireApproval: formData.requireApproval,
        capacity: formData.capacity,
        image: formData.image,
        color: formData.color,
        typeFace: formData.typeFace,
      };

      // Add the new event to the API
      await createAsync("event-management", eventData);

      // Refetch the updated events data after adding a new event
      const updatedEventsData = await getAsync("event-management");
      setEvents(updatedEventsData);

      // Clear the form after adding the event
      setFormData({
        eventName: "",
        startDate: getDefaultStartDate(),
        endDate: getDefaultEndDate(),
        eventOnline: false,
        eventLink: "",
        eventLocation: "",
        requireApproval: false,
        capacity: "",
        image:
          "https://firebasestorage.googleapis.com/v0/b/event-invitation-project.appspot.com/o/goodvibes.webp?alt=media&token=05eece16-0515-45c3-a570-aabaa6322fb7",
        color: selectedColor,
        typeFace: "",
      });
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  return (
    <div className="mx-auto p-4 flex flex-col items-center min-h-screen gap-4">
      <Header />
      <div className="max-w-3xl">
        <form className="bg-white m-4 p-4 rounded-xl sm:flex gap-6 mx-auto justify-between w-full">
          {/* 1st column */}
          <div className="flex flex-col gap-6">
            {/* title */}
            <input
              className="font-semibold text-3xl text-gray-700 placeholder-gray-300"
              type="text"
              placeholder="Event Name"
              value={formData.eventName}
              onChange={handleChange}
              name="eventName"
              id="eventname"
            />
            {/* Date */}
            <div className="bg-gray-100 rounded-lg p-2 flex flex-col">
              <div className="flex justify-between items-center m-2">
                <div>Start</div>
                <input
                  className="bg-gray-200 p-2 rounded"
                  type="datetime-local"
                  placeholder="Start Date"
                  value={formData.startDate}
                  onChange={handleChange}
                  name="startDate"
                  id="startdate"
                />
              </div>
              <div className="flex justify-between items-center m-2">
                <div>End</div>
                <input
                  className="bg-gray-200 p-2 rounded"
                  type="datetime-local"
                  placeholder="End Date"
                  value={formData.endDate}
                  onChange={handleChange}
                  name="endDate"
                  id="enddate"
                />
              </div>
            </div>
            {/* Event Options */}
            <div className="flex flex-col gap-2">
              <div className="text-sm font-medium text-gray-500">
                Event Options
              </div>

              <div className="bg-gray-100 rounded-lg p-2 gap-2 flex flex-col">
                <div className="flex gap-4 m-2 justify-between">
                  <div className="flex gap-2">
                    <span className="material-symbols-rounded text-gray-500">
                      person_check
                    </span>
                    <div>Require Approval </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={formData.requireApproval}
                      onChange={handleChange}
                      name="requireApproval"
                      id="requireapproval"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4  dark:peer-focus:ring-gray-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-800"></div>
                  </label>
                </div>
                <hr />
                <div className="flex gap-4 m-2 justify-between items-center">
                  <div className="flex gap-2">
                    <span className="material-symbols-rounded text-gray-500">
                      group_add
                    </span>
                    <div>Capacity</div>
                  </div>
                  <input
                    className="bg-gray-200 p-2 rounded text-right w-28"
                    type="number"
                    placeholder="Unlimited"
                    value={formData.capacity}
                    onChange={handleChange}
                    name="capacity"
                    id="capacity"
                  />
                </div>
                <hr />
                <div className="flex gap-4 m-2 justify-between">
                  <div className="flex gap-2">
                    <span className="material-symbols-rounded text-gray-500">
                      language
                    </span>
                    <div>Online Event</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      value={formData.eventOnline}
                      onChange={handleChange}
                      name="eventOnline"
                      id="eventonline"
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4  dark:peer-focus:ring-gray-800 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-gray-800"></div>
                  </label>
                </div>

                {formData.eventOnline ? (
                  // Render Event Link field if eventOnline is true
                  <input
                    className="bg-gray-200 p-2 rounded m-2"
                    type="url"
                    placeholder="Event Link"
                    value={formData.eventLink}
                    onChange={handleChange}
                    name="eventLink"
                    id="eventlink"
                  />
                ) : (
                  // Render Event Location field if eventOnline is false
                  <input
                    className="bg-gray-200 p-2 rounded m-2"
                    type="text"
                    placeholder="Event Location"
                    value={formData.eventLocation}
                    onChange={handleChange}
                    name="eventLocation"
                    id="eventlocation"
                  />
                )}
              </div>
            </div>

            <button
              onClick={handleAdd}
              className="px-6 py-2 rounded-lg text-white text-lg font-medium hover:opacity-90 border-none"
              style={{ backgroundColor: selectedColor.value }}
            >
              Add Event
            </button>
          </div>

          {/* Second column */}
          <div className="flex flex-col gap-6 w-full">
            <ImageSelect
              onImageSelect={(selectedImage) => console.log(selectedImage)}
            />
            <div className="bg-gray-100 rounded-lg p-2 gap-2">
              <ThemeColor
                selected={selectedColor}
                setSelected={setSelectedColor}
              />
            </div>
          </div>
        </form>
        <Footer />
      </div>
    </div>
  );
};
export default CreateEvent;
