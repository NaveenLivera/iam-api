import mongoose from "mongoose";


export interface IAuth {
  _uid: mongoose.Types.ObjectId;
  token: string;
  expiryDate: Date;
}
