const API_URL = 'http://localhost:3000/api/chat/create'; // Adjust the URL to your actual API endpoint

export const createChat = async (receiverId: number) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      receiver_id: receiverId,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  console.log("chat")
  return response.json();
};
