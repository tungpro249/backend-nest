export class ResponseData<D> {
  data: D | D[];
  code: number;
  message: string;
  pagination?: any;

  constructor(data: D | D[], code: number, message: string, pagination?: any) {
    this.data = data;
    this.code = code;
    this.message = message;
    if (pagination) this.pagination = pagination;
    return this;
  }
}
