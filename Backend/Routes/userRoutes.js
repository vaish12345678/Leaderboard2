import express from "express";
import { getUsers, addUser, claimPoints, getLeaderboard,getClaimHistory } from "../controllers/userController.js";

const router = express.Router();

router.get('/users', getUsers);
router.post('/add', addUser);
router.post('/claim', claimPoints);
router.get('/leaderboard', getLeaderboard);
router.get('/history/:userId', getClaimHistory);
export default router;
