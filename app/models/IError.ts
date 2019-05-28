
interface IError {
  status: string,
  code: number
  developerMessage: string,
}

export class MyError implements IError{
  code: number;
  developerMessage: string;
  status: string;

  constructor(status: string, code: number, developerMessage: string) {
    this.code =  code;
    this.developerMessage = developerMessage;
    this.status = status;
  }

}