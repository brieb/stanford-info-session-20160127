export enum Method { POST, GET, PUT }

export function fetchJson(url: string, method: Method, data?: any): Promise<any> {
  let headers: Headers = new Headers();
  headers.append("Content-Type", "application/json");

  let options: RequestInit = {
    method: Method[method],
    headers: headers
  };
  if (data != null) {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options)
    .then(function(response: Response): any {
      if (response.status === 204) {
        return;
      }
      return response.json();
    })
    .catch(function(e: Error) {
      console.error(e, e.stack);
      throw e;
    });
}
