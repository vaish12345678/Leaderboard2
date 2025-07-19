

import User from "../models/User.js";
import ClaimHistory from "../models/ClaimHistory.js";

export const getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

export const claimPoints = async (req, res) => {
  const { userId } = req.body;
  const points = Math.floor(Math.random() * 10) + 1;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.totalPoints += points;
  await user.save();

  const history = new ClaimHistory({ user: userId, claimedPoints: points });
  await history.save();

  res.json({ message: 'Points claimed!', points, user });
};


export const getLeaderboard = async (req, res) => {
  const users = await User.find().sort({ totalPoints: -1 });
  res.json(users);
};


export const addUser = async (req, res) => {
  const { name } = req.body;
  const user = new User({ name });
  await user.save();
  res.status(201).json(user);
};



export const getClaimHistory = async (req, res) => {
  try {
    const { userId } = req.params;
    const history = await ClaimHistory.find({ user: userId })
      .sort({ claimedAt: -1 })
      .select('-__v');

    res.status(200).json(history);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch history" });
  }
};
