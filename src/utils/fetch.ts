export const handleFetchApi = async (url: string, options: RequestInit) => {
  try {
    const response = await fetch(`${url}`, options);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  } catch (error) {
    throw new Error(error as string);
  }
};
