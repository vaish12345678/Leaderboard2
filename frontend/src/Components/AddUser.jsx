
import { useState } from "react";
import {toast} from "sonner"
const AddUserForm = ({ onAddUser }) => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    await fetch("http://localhost:5000/api/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, totalPoints: 0 }),
    });
    toast.success("User added!!!")
    setName("");
    onAddUser();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        flex flex-col      /* default: vertical on mobile */
        md:flex-row        /* row on md+ */
        gap-4 items-end
      "
    >
      <div className="flex-grow w-full md:w-auto">
        <label className="block text-[#CCCCCC] mb-2">
          Add New user
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="Enter name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="
              w-full                /* full width mobile & desktop */
              px-5 py-4
              rounded-xl border-2 border-[#2A3040]
              bg-[#0F111A] text-white placeholder-[#5A6170]
              focus:outline-none focus:border-[#00FF9E]
            "
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#5A6170]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="
          w-full               
          md:w-auto          
          bg-gradient-to-r from-[#00FF9E] to-[#00D88F]
          text-[#0F111A] px-6 py-4 rounded-xl font-bold
          hover:shadow-lg hover:shadow-[#00FF9E]/30 transition-all
        "
      >
        Add Member
      </button>

    </form>
  );
};

export default AddUserForm;
