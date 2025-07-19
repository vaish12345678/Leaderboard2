

import React, { useState, useEffect } from 'react';
import TopThree from './Components/TopThree';
import { Toaster,toast } from "sonner";

import LeaderboardList from './Components/LeaderboardList';
import AddUser from "./Components/AddUser"
import ClaimHistoryModal from './Components/ClaimHistoryModal';

export default function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [history, setHistory] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchUsers = async () => {
    const res = await fetch('http://localhost:5000/api/leaderboard');
    setUsers(await res.json());
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleClaim = async (id,name) => {
    await fetch('http://localhost:5000/api/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: id }),
    });
    toast.success(`Points claimed for ${name}!`);
    fetchUsers();
  };

  const openClaimHistory = async (user) => {
    const res = await fetch(`http://localhost:5000/api/history/${user._id}`);
    const data = await res.json();
    setSelectedUser(user);
    setHistory(data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    setHistory([]);
  };

  return (
    <div className="min-h-screen bg-[#0F111A] flex flex-col items-center pt-10 px-4">
      <Toaster richColors position="top-right" />
      <AddUser onAddUser={fetchUsers} />
      <br /><br />

      <TopThree users={users} onClaim={handleClaim} />
      <LeaderboardList
        users={users}
        onClaim={handleClaim}
        openClaimHistory={openClaimHistory}
      />

      {/* Show Modal */}
      <ClaimHistoryModal
        isOpen={isModalOpen}
        onClose={closeModal}
        user={selectedUser}
        history={history}
      />
      <br /><br /><br />
    </div>
  );
}
