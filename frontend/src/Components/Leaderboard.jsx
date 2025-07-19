
import React, { useState } from 'react';
import { toast } from 'sonner';

export default function LeaderboardList({ users, onClaim }) {
  const [historyMap, setHistoryMap] = useState({});
  const [openUserId, setOpenUserId] = useState(null);

  const fetchHistory = async (userId) => {
    if (openUserId === userId) {
      setOpenUserId(null);
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/history/${userId}`);
      const data = await res.json();
      setHistoryMap((prev) => ({ ...prev, [userId]: data }));
      setOpenUserId(userId);
    } catch (err) {
      toast.error("Failed to load history");
    }
  };

  return (
    <div className="w-full max-w-[450px] md:max-w-[400px] bg-[#1F2430] rounded-2xl overflow-y-auto" style={{ maxHeight: '400px' }}>
      {users.slice(3).map((u, idx) => (
        <div key={u._id} className="px-4 py-3 border-b border-[#2A3040] hover:bg-[#203a43] transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-0">
            <div className="flex items-center gap-3">
              <span className="text-[#CCCCCC] font-medium text-sm sm:text-base">{idx + 4}.</span>
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#203a43] flex items-center justify-center text-sm sm:text-base">
                <span className="text-[#CCCCCC] font-semibold">{u.name.charAt(0)}</span>
              </div>
              <span className="text-white font-medium text-sm sm:text-base">{u.name}</span>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <span className="text-[#00FF9E] font-bold text-sm sm:text-base">{u.totalPoints.toLocaleString()}</span>
              <button
                onClick={() => onClaim(u._id)}
                className="px-7 py-1 sm:w-9 sm:h-9 flex items-center justify-center bg-[#00FF9E] hover:bg-[#8E44AD] text-[#0F111A] text-sm sm:text-base font-bold transition rounded-xl"
                title="Claim Points"
              >
                Claim
              </button>
            </div>
          </div>

          <div className="mt-2 text-right">
            <button
              className="text-xs text-blue-400 hover:underline"
              onClick={() => fetchHistory(u._id)}
            >
              {openUserId === u._id ? 'Hide History' : 'View History'}
            </button>
          </div>

          {openUserId === u._id && (
            <ul className="mt-2 text-sm text-[#CCCCCC] pl-4 list-disc">
              {historyMap[u._id]?.length === 0 ? (
                <li>No claims yet</li>
              ) : (
                historyMap[u._id].map((h, i) => (
                  <li key={i}>
                    +{h.claimedPoints} points on {new Date(h.claimedAt).toLocaleString()}
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}
