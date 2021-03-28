import axios from "axios";

const client = ({ req }) => {
  if (typeof window === "undefined") {
    // we are on the server, need to connect to nginx
    return axios.create({
      baseURL: "http://ingress-nginx-controller.kube-system.svc.cluster.local",
      headers: req.headers,
    });
  } else {
    // we are on the browser
    return axios.create({
      baseURL: "/",
    });
  }
};

export default client;
