import { Response } from 'express';
import { HTTPCODES } from "../types/http-codes.type";

class InternalErrorResponseService {
    public response(err: any, res: Response) {
        res.status(HTTPCODES.ERR_INTERNAL_SERVER_ERROR).json({
            STATUS: 'failure',
            MESSAGE: 'Internal server error: IAM_ERROR',
            DATA: err
        });
    }
}

export default new InternalErrorResponseService().response;
