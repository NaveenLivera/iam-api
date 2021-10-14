import mongoose from "mongoose";

const SCHEMA = mongoose.Schema;

const schema = new SCHEMA({
  _uid: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: false
  },
  expiryDate: {
    type: String,
    required: true,
  }
});

export default mongoose.model('Auth', schema,'auth');
