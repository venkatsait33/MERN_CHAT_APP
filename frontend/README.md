
```markdown
# Chatty - Frontend

🚀 **Chatty** is a real-time chat application built with **React.js, TailwindCSS, DaisyUI, Zustand**, and **Socket.io-client** for seamless messaging.

## Features
✅ User authentication with JWT  
✅ Real-time messaging with Socket.io  
✅ Online user status tracking  
✅ Upload & preview images via Cloudinary  
✅ Dynamic theme switching (light/dark mode)  

## Tech Stack
- **React.js** - Frontend framework  
- **TailwindCSS & DaisyUI** - UI Styling  
- **Axios** - API requests  
- **Zustand** - State management  
- **Socket.io-client** - Real-time communication  

## Installation & Setup
1. **Clone the repo:**
   ```sh
   git clone https://github.com/your-repo/chatty.git
   cd chatty/frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Create `.env` file in the frontend folder**:
   ```sh
   VITE_BACKEND_URL=http://localhost:5000
   ```
4. **Run the development server:**
   ```sh
   npm run dev
   ```
5. **Deploy on Vercel**:
   ```sh
   vercel deploy
   ```

## Deployment
To prevent **404 errors** on page refresh, add a `vercel.json`:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

---
📌 **Backend:** [See Backend README](../backend/README.md)
```

---

