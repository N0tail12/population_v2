const apiKey = process.env.VUE_APP_X_API_KEY;
const apiUrl = process.env.VUE_APP_API_URL;

async function fetchTown() {
  console.log(apiUrl);
  return await fetch(`${apiUrl}/prefectures`, {
    method: "GET",
    headers: {
      "X-API-KEY": apiKey,
    },
  }).then((res) => res.json());
}

async function fetchPopulation(index) {
  return await fetch(
    `${apiUrl}/population/composition/perYear?cityCode=-&prefCode=${index}`,
    {
      method: "GET",
      headers: {
        "X-API-KEY": apiKey,
      },
    }
  ).then((res) => res.json());
}
export default { fetchTown, fetchPopulation };
