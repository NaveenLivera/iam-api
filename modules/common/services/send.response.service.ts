import { Response } from 'express';
import { HTTPCODES } from "../types/http-codes.type";

class SendResponseService {
    public response(http_status: HTTPCODES, status: string, msg: string, data: any, res: Response) {
        if (data) {
            res.status(http_status).json({
                STATUS: status,
                MESSAGE: msg,
                DATA: data
            });

        } else {
            res.status(http_status).json({
                STATUS: status,
                MESSAGE: msg,
                DATA: {}
            });
        }
    }
}

export default new SendResponseService().response;
