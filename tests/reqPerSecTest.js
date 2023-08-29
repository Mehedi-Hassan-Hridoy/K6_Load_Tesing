import http from "k6/http";
import { sleep } from "k6";
import exec from "k6/execution";
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export const options = {
  
  scenarios: {
    constant_vus: {
      executor: 'constant-vus',
      vus: 30,      
      duration: '2m',
    },
  },
  thresholds: {
    'http_req_duration': ['p(95)<5000'], // 95% of requests should complete within 5000ms
    'http_req_failed': ['rate<0.05'],    // Failed requests should be less than 5%
    'http_reqs': ['rate>25'],            // Request rate should be more than 25 per second
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
    "request_per_second.html": htmlReport(data),
  };
}
