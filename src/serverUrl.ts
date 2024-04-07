import { BASE_URL } from "./features/constants";
const { DEV, PROD } = import.meta.env;
export let SERVER_URL: string;

if (DEV) {
  SERVER_URL = BASE_URL; // адрес сервера на локалке
} else if (PROD) {
  SERVER_URL = "https://idp-project-server.onrender.com"; // адрес сервера после выгрузки
}
