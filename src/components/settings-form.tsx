import { useState } from "react";
import Layout from "./layout"


const SettingsForm = () => {
    const [selectedAlerts, setSelectedAlerts] = useState({
        sms: true,
        email: false,
      });
    
      const toggleAlert = (type: "sms" | "email") => {
        setSelectedAlerts((prev) => ({
          ...prev,
          [type]: !prev[type],
        }));
      };

  return (
   <Layout>
        <div className="bg-white text-primary-black p-4 rounded-lg shadow">
            <h1 className="text-2xl font-bold">Notification Settings</h1>
        </div>

        <div className="bg-white px-4 py-9 rounded-lg shadow mt-5 lg:mt-16">
            <h2 className="text-xl font-bold mb-4">Alert Preferences</h2>
            <div className="h-full grid grid-cols-1 lg:grid-cols-2 gap-5">

                <div
                onClick={() => toggleAlert("sms")}
                className={`h-full p-4 rounded-lg cursor-pointer ${
                    selectedAlerts.sms
                    ? "border border-blue-500 hover:border-blue-500 text-primary-black"
                    : "border text-gray-700"
                }`}
                >
                <div className="w-[300px] h-[300px] flex items-center justify-center mx-auto">
                    <img src="/sms-setings.png" alt="sms" className="w-full h-full object-cover mx-auto"/>
                </div>
               <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border ${selectedAlerts.sms ? "border-4 border-blue-500" : 
                        "border-gray-300"} transition-colors duration-300`}></div>
                    <h3 className="text-lg font-semibold">SMS Alerts</h3>
               </div>
                <p>Receive text messages for upcoming lectures, deadlines, and changes.</p>
                </div>

                <div
                onClick={() => toggleAlert("email")}
                className={`h-full p-4 rounded-lg cursor-pointer ${
                    selectedAlerts.email
                    ? "border border-blue-500 hover:border-blue-500 text-primary-black"
                    : "border text-gray-700"
                }`}
                >
                <div className="w-[300px] h-[300px] flex items-center justify-center mx-auto">
                    <img src="/email-settings.png" alt="sms" className="w-full h-full object-cover mx-auto"/>
                </div>
               <div className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border ${selectedAlerts.email ? "border-4 border-blue-500" : 
                        "border-gray-300"} transition-colors duration-300`}></div>
                    <h3 className="text-lg font-semibold">Email Alerts</h3>
               </div>
                <p>Receive email notifications for all important updates and reminders.</p>
                </div>

            </div>
        </div>

        <div className="flex justify-end mt-6">
            <button
                className="bg-primary-black text-white px-4 py-2 rounded-lg shadow hover:bg-primary-gray2"
            >
                Save Changes
            </button>
        </div>


   </Layout>
  )
}

export default SettingsForm