import axios from "axios";

export const AxiosRequest = async (url, body = null, headers = null, method) => {

  try {
    const response = await axios({
      method: method,
      url: url,
      data: body,
      headers: headers,
    });
    return response;
  } catch (err) {
    console.error(err.response);
    return err.response;
  }
}
