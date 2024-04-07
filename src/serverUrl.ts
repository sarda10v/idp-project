import { BASE_URL } from "./features/constants";
const { DEV } = import.meta.env;
export let SERVER_URL: any;

if (DEV) {
  SERVER_URL = BASE_URL; // адрес сервера на локалке
} else {
  SERVER_URL = "https://idp-project-server.onrender.com"; // адрес сервера после выгрузки
}
