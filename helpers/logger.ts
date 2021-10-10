import chalk from 'chalk';
import environment from '../env';
class Logger {
  /**
   *
   * @param msg
   */
  info(msg: string): void {
    if (environment.getDebugMode()) {
      console.info(chalk.blueBright(`info: ${msg} [${this.getDatetime()}]`));
    }
  }
  /**
   *
   * @param msg
   */
  error(msg: string): void {
    if (environment.getDebugMode()) {
      console.error(chalk.redBright(`error: ${msg}`));
    }
  }
  /**
   *
   * @param msg
   */
  warn(msg: string): void {
    if (environment.getDebugMode()) {
      console.warn(chalk.yellowBright(`warning: ${msg}`));
    }
  }
  /**
   *
   * @param data
   */
  log(data: any): void {
    if (environment.getDebugMode()) {
      console.log(data);
    }
  }

  private getDatetime(): string {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} `;
  }
}

export default new Logger();
