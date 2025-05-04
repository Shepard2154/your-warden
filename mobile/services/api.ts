const BASE_URL = 'http://192.168.0.6:3000';

export const fetchAnswer = async ({query}: {query: string}) => {
  const endpoint = `${BASE_URL}/message`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({ question: query }),
  });

  if (!response.ok) {
    // @ts-ignore
    throw Error("Failed to fetch answer from warden", response.statusText);
  }

  const data = await response.json();
  
  return data.candidates[0].content.parts[0].text;
}