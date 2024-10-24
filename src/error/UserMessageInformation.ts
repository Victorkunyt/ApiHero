export class MessageInformation {
    statusCode: number;
    message: string;
    name: string
    
    constructor(message: string) {
      this.name = 'MessageInformation'
      this.statusCode = 200;  
      this.message = message;

    }
  }
  