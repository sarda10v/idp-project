import { BASE_URL } from "./features/constants";
const { NODE_ENV } = process.env;

export let SERVER_URL: any;

if (NODE_ENV === "development") {
  SERVER_URL = BASE_URL; // адрес сервера на локалке
} else {
  SERVER_URL = "https://idp-project-server.onrender.com"; // адрес сервера после выгрузки
}
