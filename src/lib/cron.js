import cron from "cron";
import https from "https";
import dotenv from "dotenv";
dotenv.config();

// === Config: Thay đổi tại đây ===
const INTERVAL_MODE = "seconds"; // Hoặc "minutes"

const CRON_EXPRESSION =
  INTERVAL_MODE === "seconds" ? "*/14 * * * * *" : "0 */14 * * * *";

// === Cron Job ===
const job = new cron.CronJob(CRON_EXPRESSION, function () {
  const apiUrl = process.env.API_URL;

  console.log("⏰ Sending request to:", apiUrl);

  https
    .get(apiUrl, (res) => {
      if (res.statusCode === 200) {
        console.log("✅ GET request sent successfully");
      } else {
        console.log("❌ GET request failed", res.statusCode);
      }
    })
    .on("error", (e) => {
      console.error("⚠️ Error while sending request", e);
    });
});

export default job;
