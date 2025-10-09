import React, { useContext, useEffect, useState } from "react";
import axios from "../../util/axiosInstance";
import { UserInfoContext } from "../../context/contextApi";
import { AlertCircle, Loader2, Trophy, Download } from "lucide-react";
import Layout from "../../components/Layout";

const Achievements = () => {
  const { user } = useContext(UserInfoContext);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAchievements = async () => {
    if (!user?.id) return;
    try {
      setLoading(true);
      const res = await axios.get(`/api/achievements/${user.id}`);
      setAchievements(res.data.data || []);
    } catch (err) {
      console.error("Error fetching achievements:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, [user?.id]);

  // ✅ Download Achievements as JSON
  const handleDownload = () => {
    const blob = new Blob([JSON.stringify(achievements, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `achievements_${user?.id}.json`;
    link.click();
  };

  return (
  
      <div className="p-6 space-y-6 overflow-auto text-gray-800">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-800">
            <Trophy size={28} className="text-yellow-600 " /> My Achievements
          </h1>
          {achievements.length > 0 && (
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow hover:bg-indigo-700 transition"
            >
              <Download size={18} /> Download
            </button>
          )}
        </div>
        <h2 className="text-gray-500 text-sm">
          You can view and download your achievements here.
        </h2>

        <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
          {loading ? (
            <div className="flex justify-center py-10 text-indigo-600">
              <Loader2 className="animate-spin w-10 h-10" />
            </div>
          ) : achievements.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-gray-500 py-16 bg-gray-50 rounded-xl shadow-inner">
              <AlertCircle size={50} className="mb-4 text-gray-400" />
              <p className="text-lg font-medium">No Achievements yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement) => (
                <div
                  key={achievement._id}
                  className="bg-white p-4 rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {achievement.title || "Untitled Achievement"}
                  </h2>
                  <p className="text-gray-600 mb-2">
                    {achievement.body || "No description provided."}
                  </p>
                  <p className="text-sm text-gray-400">
                    Awarded on:{" "}
                    {achievement.createdAt
                      ? new Date(achievement.createdAt).toLocaleDateString()
                      : "—"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    
  );
};

export default Achievements;
