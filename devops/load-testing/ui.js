// Performance or load testing using K6

import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  stages: [
    { duration: "10s", target: 5 },
    { duration: "1m", target: 10 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_duration: ["p(90) < 300", "p(95) < 400"],
    "http_req_duration{what:home}": [
      {
        threshold: "p(95) < 200",
        abortOnFail: true,
        delayAbortEval: "10s",
      },
    ],
  },
};

export default function () {
  const root = "http://localhost:3333";

  const pages = ["/about/"];
  for (const page of pages) {
    const resHome = http.get(root, {
      tags: { what: "home" },
    });
    check(resHome, {
      "status was 200": (r) => r.status == 200,
    });
    const resPage = http.get(root + page);
    check(resPage, {
      "status was 200": (r) => r.status == 200,
    });
    sleep(1);
  }
}
