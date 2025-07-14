process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import axios from "axios";
import { createHash } from "crypto";

const config = {
  username: "admin",
  password: "", // PASSWORD
};

const sha256 = (str) => createHash("sha256").update(str).digest("hex");

const axiosInstance = axios.create({
  baseURL: "https://192.168.1.1",
  insecureHTTPParser: true,
});

async function getEcntToken() {
  const { data: loginPage } = await axiosInstance.get("/cgi-bin/login.asp");
  const post_par = loginPage.match(/post_par="([^"]*)"/)[1];

  const credentials = new URLSearchParams({
    username: sha256(config.username + post_par),
    password: sha256(config.password + post_par),
  });

  const { data } = await axiosInstance.post(
    `/cgi-bin/check_auth.json?post_par=${post_par}`,
    credentials,
    {
      headers: {
        Cookie: "loginTimes=0",
      },
    }
  );

  return { ecntToken: data.ecntToken, post_par };
}

async function logout(token) {
  await axiosInstance.get("/cgi-bin/logout.cgi", {
    headers: {
      Cookie: `ecntToken=${token}`,
    },
  });
}

async function main() {
  const { ecntToken, post_par } = await getEcntToken();

  console.log({ ecntToken, post_par });

  await logout(ecntToken);
}

main().catch(console.error);
