import axios from "axios";
import Session from "supertokens-auth-react/recipe/session";

const authApiInstance = axios.create({
  baseURL: 'https://ahol-supertokens-test.azurewebsites.net',
  headers: {
    'Content-Type': 'application/json',
  },
  transformRequest: [
    (data: any) => {
      return JSON.stringify(data);
    },
  ],
  transformResponse: [
    (data: any) => {
      return JSON.parse(data);
    },
  ],
});

Session.addAxiosInterceptors(authApiInstance);

async function callAPI() {
    // use axios as you normally do
    let response = await authApiInstance.get("http://yourapi.com");
}