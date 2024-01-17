import { httpAxios } from "../httpAxios";

export async function HomeService() {
  const swiper = await httpAxios
    .get("api/home-screen-data")
    .then((response) => response.data);
  return swiper;
}
