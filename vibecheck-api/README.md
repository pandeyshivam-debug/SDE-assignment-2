
# VIBECHECK API

A simple and professional RESTful API built with Express.js and MongoDB for sharing user-generated "vibes". The API supports authentication, vibe posting, pagination, and personalized feeds using JWT tokens.

---

## Features

- JWT-based authentication (Signup)
- Post a vibe (protected route)
- Get all vibes (with populated user info)
- Get vibe by ID
- Like a vibe
- Pagination support
- Personalized feed based on following
- Authorization middleware
- Postman-tested endpoints

---

##  Application Flow

### 1. **User Signup**  
`POST /api/v1/auth/signup`

<img src="./screenshots/signup.png" alt="./screenshots/signup.png" width="600px" />

---

### 2. **Create a Vibe (Authorized)**  
`POST /api/v1/vibes`

Header:
```
Authorization: Bearer <your_token>
```

<img src="./screenshots/post-single-vibe.png" alt="./screenshots/post-single-vibe.png" width="600px" />

---

### 3. **Unauthorized Vibe Creation**  
Trying to post a vibe without a valid token returns:

```json
{
  "message": "Not authorized, no token"
}
```

<img src="./screenshots/post-vibes-error-handling.png" alt="./screenshots/post-vibes-error-handling.png" width="600px" />

---

### 4. **Get All Vibes**  
`GET /api/v1/vibes`

<img src="./screenshots/get-all-vibes.png" alt="./screenshots/get-all-vibes.png" width="600px" />

---

### 5. **Get Single Vibe by ID**  
`GET /api/v1/vibes/:id`

<img src="./screenshots/get-single-vibe.png" alt="./screenshots/get-single-vibe.png" width="600px" />

---

### 6. **Like a Vibe**  

<img src="./screenshots/like.png" alt="./screenshots/like.png" width="600px" />

---

### 7. **Get a User's Feed**  

<img src="./screenshots/get-feed.png" alt="./screenshots/get-feed.png" width="600px" />

---

### 8. **Pagination Support**  
`GET /api/v1/vibes?limit=2&page=2`

<img src="./screenshots/pagination-2.png" alt="./screenshots/pagination-2.png" width="600px" />

---

### 9. **Personalized Feed**  
`GET /api/v1/feed`

Header:
```
Authorization: Bearer <your_token>
```

<img src="./screenshots/get-feed.png" alt="./screenshots/get-feed.png" width="600px" />

---

## Database and Data

<img src="./screenshots/db.png" alt="./screenshots/db.png" width="600px" />
<img src="./screenshots/data.png" alt="./screenshots/data.png" width="600px" />

---

## Project Structure

```
project/
├── config/
│   ├── db.js
├── controllers/
│   ├── authController.js
├── middleware/
│   ├── auth.js
│   └── error.js
|   └── isOwner.js
├── routes/
│   └── auth.js
│   └── comments.js
│   └── users.js
├── screenshots/
├── utils/
│   └── errorResponse.js
│   └── generateToken.js
├── .gitignore
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

---
