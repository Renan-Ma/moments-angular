export interface Moment {
  id?: Number;
  title: string;
  description: string;
  image: string;
  created_at?: string;
  updated_at?: string;
  teste: string;
  coments?: [{ text: string; username: string }];
}
