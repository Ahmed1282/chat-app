const API_URL2 = import.meta.env.VITE_API_GETMESSAGES_URL;

export const fetchMessagesBySenderAndReceiver = async (senderId: number, receiverId: number) => {
  const response = await fetch(`${API_URL2}?sender_id=${senderId}&receiver_id=${receiverId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};
