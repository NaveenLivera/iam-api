import { AuthService } from "../modules/auth/services/auth.service";
import logger from './../helpers/logger';
import { Request, Response } from "express";
import insufficientDataResponseService from '../modules/common/services/insufficient-data.response.service';
import queryBuilderHelper from "../helpers/query-builder.helper";
import { UserService } from "../modules/user/services/user.service";
import { IIAMUserResponse, ILoginUser, INewUser, IUser } from "../modules/user/types/user.type";
import internalErrorResponseService from "../modules/common/services/internalError.response.service";
import sendResponseService from "../modules/common/services/send.response.service";
import { HTTPCODES } from "../modules/common/types/http-codes.type";
import sha1 from 'sha1';
import mongoose from "mongoose";
import { IAuth } from "../modules/auth/types/auth.type";
import generateUUID from "smc-uuid-generator";

export class UserController {
  private authService: AuthService = new AuthService();
  private userService: UserService = new UserService();

  public login(req: Request, res: Response) {
    logger.info('function login() started execution');

    if (req && req.body && req.body.email && req.body.password) {
      if (req.body.email) {
        req.body.email = req.body.email.toLowerCase();
      }

      let filter: any = {};
      filter = queryBuilderHelper.valueMatcher(filter, 'is_deleted', false);
      filter = queryBuilderHelper.valueMatcher(filter, 'email', req.body.email);

      this.userService.filterUsers(filter, (error: any, dataUser: ILoginUser[]) => {
        if (error) {
          internalErrorResponseService(error, res);
        } else {
          if (dataUser && dataUser.length && dataUser.length === 1) {
            if (sha1(req.body.password) === dataUser[0].password) {
              const token = generateUUID();
              const newAuthToken: IAuth = {
                _uid: dataUser[0]._uid,
                token: token,
                expiryDate: this.createExpiryDate()
              };

              this.authService.updateAuth(dataUser[0]._uid, newAuthToken, (error: any, isCreated: boolean) => {
                if (error) {
                  internalErrorResponseService(error, res);
                } else {
                  sendResponseService(HTTPCODES.SUCCESS, 'success', 'Login Successfully', {
                    _uid: dataUser[0]._uid,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    username: req.body.username,
                    token: token
                  }, res);
                }
              });
            } else {
              sendResponseService(HTTPCODES.SUCCESS, 'failure', 'Password doesn\'t match', null, res);

            }
          } else {
            sendResponseService(HTTPCODES.SUCCESS, 'failure', 'Email is not found!', null, res);
          }
        }
      });

    } else {
      insufficientDataResponseService(res);

    }

    logger.info('function login() ended execution');

  }

  public register(req: Request, res: Response) {
    logger.info('function register() started execution');

    if (req && req.body && req.body.firstName && req.body.username && req.body.email && req.body.password) {
      if (req.body.email) {
        req.body.email = req.body.email.toLowerCase();
      }
      if (req.body.username) {
        req.body.username = req.body.username.toLowerCase();
      }
      if (req.body.lastName) {
        req.body.username = null;
      }

      let filter: any = {};
      filter = queryBuilderHelper.valueMatcher(filter, 'is_deleted', false);
      filter = queryBuilderHelper.valueMatcher(filter, 'username', req.body.username);
      filter = queryBuilderHelper.valueMatcher(filter, 'email', req.body.email);

      this.userService.filterUsers(filter, (error: any, dataUsers: IUser[]) => {
        if (error) {
          logger.error('Internal Error Found in user filter');
          internalErrorResponseService(error, res);
        } else {
          if (dataUsers && dataUsers.length && dataUsers.length > 0) {
            sendResponseService(HTTPCODES.SUCCESS, 'failure', 'User Already Exists', null, res);
          } else {
            const newUserParams: INewUser = {
              firstName: req.body.firstName,
              lastName: req.body.lastName,
              email: req.body.email,
              username: req.body.username,
              password: sha1(req.body.password)
            };

            this.userService.createUser(newUserParams, async (error: any, result: any) => {
              if (error) {
                internalErrorResponseService(error, res);
              } else {
                const token = generateUUID();
                const newAuthToken: IAuth = {
                  _uid: result._id,
                  token: token,
                  expiryDate: this.createExpiryDate()
                };

                this.authService.createAuth(newAuthToken, (error: any, isCreated: boolean) => {
                  if (error) {
                    internalErrorResponseService(error, res);
                  } else {
                    sendResponseService(HTTPCODES.SUCCESS, 'success', 'User Has Been Created Successfully', {
                      _uid: result._id,
                      firstName: req.body.firstName,
                      lastName: req.body.lastName,
                      email: req.body.email,
                      username: req.body.username,
                      token: token
                    }, res);
                  }
                });
              }
            });
          }
        }
      });
    } else {
      insufficientDataResponseService(res);
    }

    logger.info('function register() ended execution');
  }

  private createExpiryDate(): Date {
    logger.info('function createExpiryDate() started execution');

    let date = new Date();
    date.setDate(date.getDate() + 3);

    logger.info('function createExpiryDate() ended execution');

    return date;
  }

  public getUser(req: Request, res: Response) {
    logger.info('function getUser() started execution');
    if (req && req.query && req.query.id) {
      this.userService.filterUsers({ _id: req.query.id }, (error: any, dataUser: IUser[]) => {
        if (error) {
          internalErrorResponseService(error, res);
        } else {
          if (dataUser && dataUser.length && dataUser.length === 1) {
            sendResponseService(HTTPCODES.SUCCESS, 'success', 'User founded', {
              _uid: dataUser[0]._id,
              firstName: dataUser[0].firstName,
              lastName: dataUser[0].lastName,
              email: dataUser[0].email,
              username: dataUser[0].username
            },
              res);
          }
        }
      });
    } else {
      insufficientDataResponseService(res);

    }

    logger.info('function getUser() ended execution');
  }
}

