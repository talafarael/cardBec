interface TelegramUser {
  allowWriteToPm: boolean;
  firstName: string;
  id: string;
  languageCode: string;
  lastName: string;
  username: string;
}

export interface TelegramData {
  authDate: Date; // Изменяем тип на Date
  chatInstance: string;
  chatType: string;
  hash: string;
  user: TelegramUser;
}
