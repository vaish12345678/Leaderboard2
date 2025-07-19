import mongoose from "mongoose"

const claimHistorySchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
},
  claimedPoints: Number,
  claimedAt: { type: Date, default: Date.now }
});

const ClaimHistory = mongoose.model('ClaimHistory', claimHistorySchema);
export default ClaimHistory;

