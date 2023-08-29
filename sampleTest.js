import http from "k6/http";
import { sleep } from "k6";
import exec from "k6/execution";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  
  thresholds: {
    http_req_duration: [
      { threshold: "p(90)<35", abortOnFail: true, delayAbortEval: "10s" },
    ],
  },
  scenarios: {
    perVUIteration: {
      executor: "per-vu-iterations",
      vus: 3,
      iterations: 9,
    },
    sharedIteration: {
      executor: "shared-iterations",
      vus: 3,
      iterations: 9,
    },
    constantsVUs: {
      executor: "constant-vus",
      vus: 5,
      duration: "3s",
    },
    rampingVUs: {
      executor: "ramping-vus",
      startVUs: 0,
      stages: [
        { duration: "5s", target: 10 },
        { duration: "30s", target: 25 },
        { duration: "0s", target: 0 },
      ],
      gracefulRampDown: "0s",
    },
  },
  // duration:"10s"
};

export default function () {
  //const res = http.get('https://test.k6.io');
    const baseURL = "https://reqres.in/";
    const endPoient = "api/users/2";
    const res = http.get(`${baseURL}${endPoient}`)
  //console.log(exec.vu.idInTest);
  sleep(1);
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data),
  };
}
