import { IUser, INewUser } from "../types/user.type";
import users from '../schemas/user.schema';
import mongoose from "mongoose";

export class UserService {
  public createUser(userParams: INewUser, callback: mongoose.Callback) {
    const user = new users(userParams);
    user.save(callback);
  }

  public editUser(_uid: mongoose.Types.ObjectId, userParams: IUser, callback: mongoose.Callback) {
    users.findOneAndUpdate({ _uid: _uid }, userParams, null, callback)
  }

  public deleteUser(_uid: mongoose.Types.ObjectId, callback: mongoose.Callback) {
    users.findOneAndUpdate({ _uid: _uid }, { isDeleted: true }, callback);
  }

  public restoreUser(_uid: mongoose.Types.ObjectId, callback: mongoose.Callback) {
    users.findOneAndUpdate({ _uid: _uid }, { isDeleted: false }, callback);
  }

  public filterUsers(filters: any, callback: mongoose.Callback) {
    users.find(filters, callback);
  }
}
