export type Article = {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  thumbnail: string;
  likes: number;
  comments?: [];
  author?: {
    id: string;
    name: string;
    avatar: string;
  };
};
