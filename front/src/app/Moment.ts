export interface Moment {
  id?: Number;
  title: string;
  description: string;
  image: string;
  create_at?: string;
  updated_at?: string;
  coments?: [{ text: string; username: string }];
}
