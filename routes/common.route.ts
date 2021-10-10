import { Application, Request, Response } from "express"

export class CommonRoutes {

  public route(app: Application) {
    app.get('/', (req: Request, res: Response) => {
      res.status(200).json({ error: false, message: 'GET is working' });
    });
    app.post('/', (req: Request, res: Response) => {
      res.status(200).json({ error: false, message: 'POST is working' });
    });
    app.put('/', (req: Request, res: Response) => {
      res.status(200).json({ error: false, message: 'PUT is working' });
    });
    app.delete('/', (req: Request, res: Response) => {
      res.status(200).json({ error: false, message: 'DELETE is working' });
    });
    app.patch('/', (req: Request, res: Response) => {
      res.status(200).json({ error: false, message: 'PATCH is working' });
    });
  }
}
