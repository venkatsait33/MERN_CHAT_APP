**MERN ChatApp - Chatty (Task Summary for Today)**

### Features Implemented:

1. **User Authentication:**
   - Created **SignUp Page** allowing users to register with **name, email, and password**.
   - Created **SignIn Page** where users can log in using **email and password**.
   - Implemented **JWT Authentication**:
     - On successful login, a JWT token is generated and stored in a **cookie**.
     - Used **cookie-parser** to handle cookies securely.
     
2. **Homepage & Navigation:**
   - Designed a **Homepage** that users are redirected to upon successful login.
   - Implemented a **Navbar** containing:
     - **Logo**
     - **User Profile Button** (Navigates to the profile page)
     - **Settings Page Button** (Allows users to change the theme of the app)
     - **Logout Button** (Clears the user session and cookies, effectively logging them out)

3. **User Profile Page:**
   - Users can upload a **profile picture** using **Cloudinary** for image storage.
   - Profile page displays **user details**.
   
4. **Settings Page:**
   - Implemented theme settings to allow users to **change the theme of the app**.

5. **Logout Functionality:**
   - Clicking on **Logout** clears the authentication **token from cookies** and redirects the user to the login page.
   - Used **cookie-parser** and Express middleware to handle session cleanup.

6. **Chat Container Implementation:**
   - Created **ChatContainer** with three main sections:
     - **ChatHeader:** Displays the selected user's **name** and **online/offline status**.
     - **Message Section:** Shows the messages exchanged between the logged-in user and the selected user.
     - **ChatInput:** Allows users to send text and images.
   - Implemented **Image Preview** before sending.
   - Images are uploaded and stored using **Cloudinary** in the backend **message.controller**.

### Next Steps:
- Implement **Socket.io** to fetch and display messages in **real-time**. ⚡

### Tech Stack Used:

#### Frontend:
- **ReactJS**
- **DaisyUI** (for UI components)
- **TailwindCSS** (for styling)
- **Axios** (for API requests)
- **Zustand** (for state management)
- **Lucide-react** (for icons)
- **React-hot-toast** (for notifications)

#### Backend:
- **Node.js**
- **Express.js**
- **MongoDB** (Database)
- **JWT Authentication** (for user auth)
- **Cloudinary** (for profile image and message image storage)
- **bcrypt** (for password hashing)
- **cookie-parser** (for handling cookies)
- **dotenv** (for environment variables)
- **CORS** (for cross-origin requests)

---
This completes the tasks for today. Moving forward, the next steps include setting up **real-time messaging using Socket.io** and integrating chat functionalities. 🚀

