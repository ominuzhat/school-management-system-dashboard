const isDevelopment: boolean = process.env.NODE_ENV === "development";

// const productionUrl: string = "https://api.sms.codecanvascreation.com";
const productionUrl: string = "https://api.extrohost.com";

const localUrl: string = "http://127.0.0.1:8000"; // A
export const webSocketBaseUrl: string = "ws://localhost:8000"; // A

export const baseUrl: string = isDevelopment ? localUrl : productionUrl;

export const TOKEN_NAME: string = "access";
