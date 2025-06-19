import cron from "cron";
import https from "https";

// const job = new cron.CronJob("* * * * *", function () {
const job = new cron.CronJob("*/14 * * * *", function () {
  https
    .get(process.env.API_URL, (res) => {
      console.log(process.env.API_URL);
      if (res.statusCode === 200) console.log("GET request sent successfully");
      else console.log("GET request failed", res.statusCode);
    })
    .on("error", (e) => console.error("Error while sending request", e));
});

export default job;
