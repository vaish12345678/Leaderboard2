import React from 'react';

const ClaimHistoryModal = ({ isOpen, onClose, user, history }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#0F111A] text-white p-6 rounded-xl w-full max-w-md shadow-xl border border-[#2A3040]">
        <h2 className="text-xl font-bold mb-4">
          Claim History for {user.name}
        </h2>

        {history.length === 0 ? (
          <p className="text-sm text-gray-400">No claim history found.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((item, index) => (
              <li key={index} className="text-sm border-b border-[#2A3040] pb-2">
                <span className="text-green-400">+{item.claimedPoints} points</span> <br />
                <span className="text-gray-400">
                  {new Date(item.claimedAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#00FF9E] text-[#0F111A] rounded hover:bg-[#00D88F]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClaimHistoryModal;
