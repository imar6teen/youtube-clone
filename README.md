# Youtube Clone
## Overview
This project only to learn about Server Sent Events (SSE) and HTTP Live Streaming (HLS) with FFMPEG. The Tech Stack that I've used here is:

- Typescript
- React
- Express.js
- MongoDB
- HLS & FFMPEG for adaptive bitrate and create multiple resolution video
- SSE
- HTTP
- Google OAUTH

So basically the flow is just like on YouTube, where the user's first page is videos that can be picked. User can also login with their google account using Google OAUTH. If user logged in, user can upload video, the video will be appear with multiple resolution from 144p to 720p, This flow HLS and FFMPEG is used. When user watching video, the comment section is update automatically when other user commenting to that video, in this flow SSE is used. SSE is one of method to update comment from server without the client requesting for it, client only request once and response will comes in stream as long connection is keep alive. 
## Installation
First of all, prepare the MongoDB instance. And then make sure the machine who runs the server has FFMPEG installed. After that create API key for google OAUTH and store it on root folder. Lastly, update every .env (client and server). And thats it!

Command to run client and server :

- client

```bash
cd client
npm run dev
```

- server

```bash
cd server
npm run dev
```

NOTE : All of it run on dev environment, it can be run on production but need to reconfig CORS and .env


## Disclaimer
This is project only focus on the Backend.