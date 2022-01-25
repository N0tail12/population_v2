async function fetchTown() {
  let apiKey = process.env.VUE_APP_X_API_KEY;
  return await fetch("https://opendata.resas-portal.go.jp/api/v1/prefectures", {
    method: "GET",
    headers: {
      "X-API-KEY": apiKey,
    },
  }).then((res) => res.json());
}
export default { fetchTown };
