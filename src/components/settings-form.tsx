import { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import axios from "axios";
import Loader from "./loader";
import { API } from "./api";

const SettingsForm = () => {
  const [selectedAlerts, setSelectedAlerts] = useState({
    sms: false,
    email: false,
  });
  const [loading, setLoading] = useState(true);

  // Fetch the current alert settings on component mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await axios.get(`${API}/api/alert-settings/get_settings`, 
            {withCredentials:true}
        );
        const { via_email, via_sms } = response.data;
        setSelectedAlerts({
          sms: via_sms,
          email: via_email,
        });
        setLoading(false);
      } catch (error: any) {
        if (error.response) {
            const { status, data } = error.response;
            if (status === 400 || status === 404 || status === 403) {
              // Display the error message from the API response
              const errorMessage = data.message || data.detail || 'An error occurred. Please try again.';
              toast.error(errorMessage);
            } else {
              // Handle other errors
            toast.error("Failed to load alert settings.");
            }
          }
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  // Toggle the selected alerts
  const toggleAlert = (type: "sms" | "email") => {
    setSelectedAlerts((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  // Save the updated settings
  const handleSaveChanges = async () => {
    try {
      await axios.put(`${API}/api/alert-settings/update_settings`,  {
        via_email: selectedAlerts.email,
        via_sms: selectedAlerts.sms,
      }, {withCredentials: true});
      toast.success("Settings updated successfully!");
    } catch (error) {
      toast.error("Failed to update settings.");
    }
  };

  if (loading) {
    return <Loader/>;
  }

  return (
    <div>
      <div className="bg-white text-primary-black p-4 rounded-lg shadow">
        <h1 className="text-2xl font-bold">Notification Settings</h1>
      </div>

      <div className="bg-white px-4 py-9 rounded-lg shadow mt-5 lg:mt-16">
        <h2 className="text-xl font-bold mb-4">Alert Preferences</h2>
        <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-5">

          {/* SMS Alert */}
          <div
            onClick={() => toggleAlert("sms")}
            className={`h-full p-4 rounded-lg cursor-pointer ${
              selectedAlerts.sms
                ? "border border-blue-500 hover:border-blue-500 text-primary-black"
                : "border text-gray-700"
            }`}
          >
            <div className="w-[300px] h-[300px] flex items-center justify-center mx-auto">
              <img
                src="/sms-setings.png"
                alt="sms"
                className="w-full h-full object-cover mx-auto"
              />
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full border ${
                  selectedAlerts.sms ? "border-4 border-blue-500" : "border-gray-300"
                } transition-colors duration-300`}
              ></div>
              <h3 className="text-lg font-semibold">SMS Alerts</h3>
            </div>
            <p>Receive text messages for upcoming lectures, deadlines, and changes.</p>
          </div>

          {/* Email Alert */}
          <div
            onClick={() => toggleAlert("email")}
            className={`h-full p-4 rounded-lg cursor-pointer ${
              selectedAlerts.email
                ? "border border-blue-500 hover:border-blue-500 text-primary-black"
                : "border text-gray-700"
            }`}
          >
            <div className="w-[300px] h-[300px] flex items-center justify-center mx-auto">
              <img
                src="/email-settings.png"
                alt="email"
                className="w-full h-full object-cover mx-auto"
              />
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-4 h-4 rounded-full border ${
                  selectedAlerts.email ? "border-4 border-blue-500" : "border-gray-300"
                } transition-colors duration-300`}
              ></div>
              <h3 className="text-lg font-semibold">Email Alerts</h3>
            </div>
            <p>Receive email notifications for all important updates and reminders.</p>
          </div>

        </div>
      </div>

      <div className="flex justify-end mt-6">
        <button
          className="bg-primary-black text-white px-4 py-2 rounded-lg shadow hover:bg-primary-gray2"
          onClick={handleSaveChanges}
        >
          Save Changes
        </button>
      </div>

      <Toaster />
    </div>
  );
};

export default SettingsForm;