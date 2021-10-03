enum Environments {
    LOCAL_WINDOWS = 'win',
    DEV_SERVER = 'dev',
    QA_SERVER = 'qa',
    PROD_SERVER = 'prod'
  }
  
  enum HostedPath {
    LOCAL_WINDOWS = './log',
    DEV_SERVER = '/var/www/dev.yaatter.xyz/iam-api/log',
    QA_SERVER = '/var/www/qa.yaatter.xyz/iam-api/log',
    PROD_SERVER = '/var/www/yaatter.xyz/iam-api/log'
  }
  
  class Environment {
    private environment: string;
    private debugMode = false;
  
    constructor(environment: string, mode: boolean) {
      this.environment = environment;
      this.debugMode = mode;
    }
  
    /**
     *
     * @returns API log path
     */
    getAPILogPath(): string|null {
      let path = null;
      if (this.environment === Environments.LOCAL_WINDOWS) {
        path = HostedPath.LOCAL_WINDOWS;
      }
      if (this.environment === Environments.DEV_SERVER) {
        path = HostedPath.DEV_SERVER;
      }
      if (this.environment === Environments.QA_SERVER) {
        path = HostedPath.QA_SERVER;
      }
      if (this.environment === Environments.PROD_SERVER) {
        path = HostedPath.PROD_SERVER;
      }
      return path;
    }
  
    /**
     *
     * @returns port number
     */
    getPort(): number {
      return 2520;
    }
  
    /**
     *
     * @returns Database name
     */
    getDBName(): string {
      let dbName = 'db_yatter_iam_local';
      if (this.environment === Environments.DEV_SERVER) {
        dbName = 'db_yatter_iam_dev';
      }
      if (this.environment === Environments.QA_SERVER) {
        dbName = 'db_yatter_iam_qa';
      }
      if (this.environment === Environments.PROD_SERVER) {
        dbName = 'db_yatter_iam_prod';
      }
      return dbName;
    }
  
    getDebugMode() {
      return this.debugMode;
    }
  
    /**
     *
     * @param path Optional: Router path of the url
     * @returns Full site url with given path
     */
    getUrl(path: string = ''): string {
      let siteName = 'http://localhost:4200/';
      if (this.environment === Environments.DEV_SERVER) {
        siteName = 'https://dev.yaatter.xyz/';
      }
      if (this.environment === Environments.QA_SERVER) {
        siteName = 'https://qa.yaatter.xyz/';
      }
      if (this.environment === Environments.PROD_SERVER) {
        siteName = 'https://yaatter.xyz/';
      }
      return (siteName + path);
    }
  }
  
  export default new Environment(Environments.LOCAL_WINDOWS,true);
  