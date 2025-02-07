export const API_KEY = "754a004ba87c4fdd8506532327e212c0";
export const API_URL = "https://api.digitransit.fi/routing/v2/hsl/gtfs/v1";

export const fetchGraphQL = async <T>(
  query: string,
  variables = {}
): Promise<T> => {
  const response = await fetch(
    `${API_URL}?digitransit-subscription-key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
