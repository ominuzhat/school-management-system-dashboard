const isDevelopment: boolean = process.env.NODE_ENV === "development";

const productionUrl: string = "https://api.extrohost.com";

const localUrl: string = "https://api.sms.codecanvascreation.com"; // A
// const localUrl: string = "http://192.168.0.193:9004/api/v1"; // A

export const baseUrl: string = isDevelopment ? localUrl : productionUrl;

export const TOKEN_NAME: string = "access";
