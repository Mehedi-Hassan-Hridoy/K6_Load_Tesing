import http from "k6/http";
import { sleep } from "k6";
import exec from "k6/execution";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  
  thresholds: {
    'http_req_duration': ['p(95)<3000'], 
    'http_req_failed': ['rate<0.01'],
  },
  scenarios: {
    stressTest: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "1m", target: 100 },
        { duration: "9m", target: 100 },
        { duration: "0s", target: 0 },
      ],
      gracefulRampDown: "0s",
    },
  },
};

export default function () {
    const baseURL = "https://reqres.in/";
    const endPoient = "api/users/2";
    const res = http.get(`${baseURL}${endPoient}`)
    console.log(exec.vu.idInTest);
  sleep(1);
}

export function handleSummary(data) {
  return {
    "stress_test.html": htmlReport(data),
  };
}
