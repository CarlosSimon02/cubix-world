const handleServerActionResponse = <T>(response: ServerActionResponse<T>) => {
  if (response.error) {
    throw new Error(response.error);
  }
  return response.data;
};

export default handleServerActionResponse;
