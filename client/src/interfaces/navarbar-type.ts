export type NavbarProps = {
    users: { [username: string]: number };
    onUserClick: (username: string, userId: number) => void;
    currentUsername: string;
    userStatus: { [userId: number]: boolean };
    currentRecipientUsername: string | null;
  };