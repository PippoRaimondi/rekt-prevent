export type MailMessage = {
  to: string;
  subject: string;
  body: string;
};

export interface MailService {
  send(message: MailMessage): Promise<void>;
}
