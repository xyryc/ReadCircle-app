# ReadCircle 📚

ReadCircle is a full-stack social platform for sharing and discovering book recommendations. Users can sign up, post their favorite books with reviews and images, and browse recommendations from the community.

## Screenshots
Coming Soon!



## Features

- 📖 **Share Book Recommendations:** Post books with title, caption, rating, and cover image.
- 🌟 **Rate Books:** Give each book a rating from 1 to 5 stars.
- 🖼️ **Image Upload:** Upload book cover images (stored via Cloudinary).
- 👤 **User Profiles:** View your recommendations and manage your account.
- 🔒 **Authentication:** Secure registration and login with JWT.
- 🏠 **Feed:** Browse recent recommendations from all users.
- 🗑️ **Delete:** Remove your own recommendations.
- 🎨 **Modern UI:** Built with React Native, Expo, and Tailwind CSS (NativeWind).

## Project Structure

- `/backend` # Node.js/Express API server
- `/mobile` # React Native (Expo) mobile app

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn
- [MongoDB](https://www.mongodb.com/) database
- [Cloudinary](https://cloudinary.com/) account for image uploads

---

#### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/ReadCircle.git
cd ReadCircle
```

#### 2. Backend Setup

Create a `.env` file in /backend with:

```sh
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
API_URL=https://readcircle-app-backend-dqtz.onrender.com/
```

Start the backend server:

```sh
npm run dev
```

#### 3. Mobile App Setup
```sh
cd ../mobile
npm install
```

Start the Expo app:
```sh
npx expo start
```

- Use the Expo Go app or an emulator to preview the app.

## Environment Variables
- **Backend**: See `.env` example above.
- **Mobile**: The API URL is set in `mobile/constants/api.ts`.

## Tech Stack
- **Frontend**: React Native, Expo, NativeWind (Tailwind CSS for RN), Zustand (state)
- **Backend**: Node.js, Express, MongoDB, Mongoose, Cloudinary, JWT
- **Other**: Expo Router, AsyncStorage, date-fns

## Folder Structure
`backend/` - Express API (see `backend/src/index.js`)
`mobile/` - Expo React Native app (see `mobile/app/_layout.tsx`)

## License
This project is licensed under the [MIT License](./LICENSE).

## Contributing
Pull requests welcome! For major changes, please open an issue first.