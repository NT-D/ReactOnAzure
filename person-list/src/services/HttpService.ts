import HttpError from "../errors/HttpError";
import InvalidArgumentError from "../errors/InvalidArgumentError";

export enum HttpMethod {
  Get = "Get",
  Post = "Post",
  Put = "Put",
  Delete = "Delete"
}

export const fetchPersonStatus = async <T>(
  apiEndpoint: string,
  method: HttpMethod,
  requestHeaders?: Object,
  body?: {}
): Promise<T> => {
  let headers = {
    "Content-Type": "application/json"
  };
  headers = { ...requestHeaders, ...headers };

  const request: RequestInit = {
    method,
    headers,
    mode: "cors",
    body: JSON.stringify(body)
  };

  try {
    const response: Response = await fetch(apiEndpoint, request);
    checkIfExpectedResponse(method, response);

    try {
      return (await response.json()) as T;
    } catch (error) {
      // PUT and Delete method may come here if API return as 204 (No content)
      return {} as T;
    }
  } catch (error) {
   
    if ((error as HttpError).statusCode === 404)
      console.error("Please fix to correct endpoint");
    throw error;
     
  }
};

const checkIfExpectedResponse = (method: HttpMethod, response: Response) => {
  let expectedStatuses: number[];
  switch (method) {
    case HttpMethod.Get:
      expectedStatuses = [200];
      break;
    case HttpMethod.Post:
      expectedStatuses = [200, 201];
      break;
    case HttpMethod.Put:
      expectedStatuses = [200, 204];
      break;
    case HttpMethod.Delete:
      expectedStatuses = [204];
      break;
    default:
      throw new InvalidArgumentError(
        "Unexpected http method. You should use correct Http Method (GET, POST, PUT, DELETE)"
      );
  }

  const isExpected = expectedStatuses.includes(response.status);
  if (!isExpected) throw new HttpError(response.status, response.statusText);
};
