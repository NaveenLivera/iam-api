import mongoose from "mongoose";

export interface IUser {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName?: string;
  email: string;
  username: string;
}

export interface ILoginUser {
  _uid: mongoose.Types.ObjectId;
  firstName: string;
  lastName?: string;
  email: string;
  username: string;
  password: string;
}

export interface INewUser {
  firstName: string;
  lastName?: string;
  email: string;
  username: string;
  password: string;
}

export interface IIAMUserResponse {
  _uid: mongoose.Types.ObjectId;
  firstName: string;
  lastName?: string;
  email: string;
  username: string;
  token: string;
}

export interface IIAMLoginRequest {
  email: string;
  password: string;
}

export interface IIAMLoginResponse {
  status: string;
  message: string;
  data: {
    token: string
  }
}

