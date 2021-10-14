import {Response} from 'express';
import {HTTPCODES} from "../types/http-codes.type";

class InsufficientDataResponseService {
  public response(res: Response) {
    res.status(HTTPCODES.SUCCESS).json({
      status: 'failure',
      message: 'Insufficient Parameters',
      data: {}
    });
  }
}

export default new InsufficientDataResponseService().response;
