export const uploadFile = async (
  path: string,
  data: FormData,
  authToken: string
) => {
  const headers = new Headers({
    Authorization: "Bearer " + authToken,
  });

  const response = await fetch(path + "/upload/", {
    method: "POST",
    headers,
    body: data,
  });

  const res = await response.json();
  return res;
};

export const removeFile = async (path: string, authToken: string) => {
  const headers = new Headers({
    Authorization: "Bearer " + authToken,
  });

  const response = await fetch(path, {
    method: "DELETE",
    headers,
  });

  const res = await response.json();
  return res;
};
