import environment from "./env";
import app from './configuration/config';
import logger from './helpers/logger';
const PORT = environment.getPort();

app.listen(PORT, () => {
  logger.info(`Yatter API Server is listening on port ${PORT}`);
});