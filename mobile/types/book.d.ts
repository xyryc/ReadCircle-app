export interface Book {
  _id: string;
  title: string;
  caption: string;
  image: string;
  rating: number;
  user: {
    username: string;
    profileImage: string;
  };
  createdAt: string;
}
