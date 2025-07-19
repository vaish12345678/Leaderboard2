import { useState } from "react";

export default function LeaderboardList({ users, onClaim, openClaimHistory }) {
  const [search, setSearch] = useState("");

  const handleClaim = (id, name) => {
    onClaim(id,name);
  };

  const filteredUsers = users
    .slice(3)
    .filter((u) => u.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div
      className="w-full max-w-[450px] md:max-w-[400px] bg-[#1F2430] rounded-2xl overflow-y-auto"
      style={{ maxHeight: "400px" }}
    >
    
      <div className="p-4">
        <input
          type="text"
          placeholder="Search user..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full px-4 py-2 mb-2 rounded-lg border border-[#2A3040] bg-[#0F111A] text-white placeholder-[#5A6170] focus:outline-none focus:border-[#00FF9E]"
        />
      </div>

      {filteredUsers.map((u) => (
        <div
          key={u._id}
          className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 border-b border-[#2A3040] hover:bg-[#203a43] transition-all gap-3 sm:gap-0"
        >
          
          <div className="flex items-center gap-3">
            <span className="text-[#CCCCCC] font-medium text-sm sm:text-base">
              {users.indexOf(u) + 1}.
            </span>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#203a43] flex items-center justify-center text-sm sm:text-base">
              <span className="text-[#00FF9E] font-semibold uppercase">
                {u.name.charAt(0)}
              </span>
            </div>
            <span className="text-white font-medium text-sm sm:text-base">
              {u.name}
            </span>
          </div>

         
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-end gap-2 sm:gap-4">
            <span className="text-[#00FF9E] font-bold text-sm sm:text-base">
              {u.totalPoints.toLocaleString()}
            </span>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => handleClaim(u._id, u.name)} 
                className="px-4 py-1 h-8 sm:h-9 bg-[#00FF9E] hover:bg-[#8E44AD] text-[#0F111A] text-xs sm:text-sm font-bold rounded-lg"
                title="Add point"
              >
                Claim
              </button>

              <button
                onClick={() => openClaimHistory(u)}
                className="h-8 sm:h-9 px-3 text-xs sm:text-sm text-blue-400 hover:underline rounded-lg"
                title="View claim history"
              >
                View History
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
