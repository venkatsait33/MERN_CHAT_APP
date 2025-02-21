{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "redirects": [
    {
      "source": "/api/(.*)",
      "destination": "https://mernrealtimechatappbackend.vercel.app",
      "statusCode": 200
    }
  ]
}
