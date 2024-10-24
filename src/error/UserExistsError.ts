export class UserExistsError extends Error {

    statusCode: number;
    constructor(message: string) {
      super(message);
      this.name = 'UserExistsError';
      this.statusCode = 400;
    }
  }

  