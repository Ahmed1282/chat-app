const API_URL = 'http://localhost:3000/api/message/create';

export const postMessage = async (messageStr: string, senderId: number, chatId: number) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      sender_id: senderId,
      chat_id: chatId,
      message_str: messageStr,
    }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
