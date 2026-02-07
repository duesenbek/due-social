# Due Social

**Due Social** is a social media application backend and frontend that allows users to register, login, create posts, like posts, and reply to posts. It features a secure authentication system using JWT and a responsive UI.

## Technologies

*   **Node.js**: Runtime environment.
*   **Express**: Web framework for Node.js.
*   **MongoDB**: NoSQL database for storing users and posts.
*   **Mongoose**: ODM library for MongoDB and Node.js.
*   **JWT (JSON Web Token)**: Secure user authentication.
*   **bcryptjs**: Password hashing.
*   **Render**: Cloud platform for deployment.
*   **Postman**: API testing and documentation.

## Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/duesenbek/due-social.git
    cd due-social
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add the following:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```

4.  **Start the server:**
    ```bash
    npm start
    ```
    Or for development:
    ```bash
    npm run dev
    ```

## API Documentation

### Auth
*   **Register**: `POST /api/auth/register`
    *   Body: `{ "name": "User", "email": "user@example.com", "password": "password" }`
*   **Login**: `POST /api/auth/login`
    *   Body: `{ "email": "user@example.com", "password": "password" }`

### Posts
*   **Get All Posts**: `GET /api/posts`
*   **Create Post**: `POST /api/posts` (Requires Auth)
    *   Body: `{ "content": "Hello World" }`
*   **Like Post**: `PUT /api/posts/like` (Requires Auth)
    *   Body: `{ "postId": "post_id" }`
*   **Reply to Post**: `POST /api/posts` (Requires Auth)
    *   Body: `{ "content": "This is a reply", "replyTo": "parent_post_id" }`
*   **Delete Post**: `DELETE /api/posts/:id` (Requires Auth)

## Features

*   **Register**: Create a new user account.
*   **Login**: Authenticate existing users and receive a JWT.
*   **JWT Auth**: Secure routes protected by JSON Web Tokens.
*   **Create Post**: Users can publish text-based posts.
*   **Like**: Users can like and unlike posts.
*   **Reply**: Users can reply to existing posts (threaded comments).
*   **Delete**: Users can delete their own posts and replies.
*   **Protected Routes**: API endpoints that require authentication.

## Deployment

**Render URL**: [https://due-social.onrender.com](https://due-social.onrender.com)

## Screenshots

### Deployment
**Render Dashboard**
![Render Dashboard](screenshots/deployment_render_dashboard.png)

### Database (MongoDB)
**Clusters Overview**
![MongoDB Clusters](screenshots/mongodb_clusters_overview.png)

**Cluster Metrics**
![MongoDB Metrics](screenshots/mongodb_cluster_metrics.png)

**Posts Collection**
![Posts Collection](screenshots/mongodb_posts_collection.png)

**Users Collection**
![Users Collection](screenshots/mongodb_users_collection.png)

### Application UI
**Login Page**
![Login Page](screenshots/app_login_page.png)

**Register Page**
![Register Page](screenshots/app_register_page.png)

**Feed Page**
![Feed Page](screenshots/app_feed_page.png)

### API Testing (Postman)
**Register User**
![Register Test](screenshots/api_register_test.png)

**Login User (Token Response)**
![Login Test](screenshots/api_login_test.png)

**Create Post**
![Create Post Test](screenshots/api_create_post_test.png)

**Get Posts**
![Get Posts Test](screenshots/api_fetch_posts_test.png)

**Like Post**
![Like Post Test](screenshots/api_like_post_test.png)

**Reply to Post**
![Reply Post Test](screenshots/api_reply_post_test.png)

**Delete Post**
![Delete Post Test](screenshots/api_delete_post_test.png)
