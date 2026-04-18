# Photo Tagging Back-end

[Link To Front End Repository](https://github.com/JohnFerrancol/photo-tagging-frontend)<br/><br/>
[![The Odin Project](https://img.shields.io/badge/The%20Odin%20Project-A9792B?logo=theodinproject&logoColor=fff)](#)

## Overview

This is a project from [The Odin Project](https://theodinproject.com): [Project: Project: Where's Waldo (A Photo Tagging App)](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app). This Photo Tagging App Project is inspired by [Where's Waldo](https://www.theodinproject.com/lessons/nodejs-where-s-waldo-a-photo-tagging-app) game. This is where you are presented with a busy and crowded illustration that contains many different people, objects, and places. Your task is to find a particular character named Waldo, who is hidden somewhere in the illustration.

## Tech Stack

- [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
- [![Node.js](https://img.shields.io/badge/Node.js-6DA55F?logo=node.js&logoColor=white)](#)
- [![Express.js](https://img.shields.io/badge/Express.js-%23404d59.svg?logo=express&logoColor=%2361DAFB)](#)
- [![Postgres](https://img.shields.io/badge/Postgres-%23316192.svg?logo=postgresql&logoColor=white)](#)
- [![Prisma](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)](#)
- [![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=000)](#)
- [![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?logo=supabase&logoColor=fff)](#)

## API Documentation

### Game Routes

```sh
GET /games
```

- Returns all available images

```sh
GET /games/:id
```

- Returns image + characters

### Gameplay Routes

```sh
POST /games/:id/start
```

- Starts game session
- Returns sessionId

```sh
POST /games/:id/guess
```

- Validates user click
- Checks character + coordinates

```sh
POST /games/:id/finish
```

- Ends session
- Calculates time
- Saves leaderboard entry

### Leaderboard Route

```sh
GET /leaderboard/:id
```

- Returns sorted scores

## Project Structure

```sh
photo-tagging-backend/
│
├── prisma/
│   │
│   ├── migrations/
│   └── schema.prisma
│   └── seeder.js
│   │
├── src/
│   │
│   ├── controllers/
│   │   ├── game.controller.js
│   │   └── leaderboard.controller.js
│   │
│   ├── routes/
│   │   ├── game.routes.js
│   │   └── leaderboard.routes.js
│   │
│   ├── services/
│   │   ├── game.service.js
│   │   ├── validation.service.js
│   │   └── session.service.js
│   │
│   ├── config/
│   │   ├── passport.js
│   │   └── prisma.js
│   │   └── supabase.js
│   │
│   ├── app.js
│   └── server.js
│
├── package.json
└── .env
└── .prettierrc
└── eslint.config.js
└── prisma.config.js


```

## Getting Started

### Prerequisites

You will need to install the latest version of npm to get started on using this project

- npm

```sh
npm install npm@latest -g
```

### Installation

Getting started on running the webpack server to your localhost, localhost:8080

1. Cloning the repository

```sh
git clone git@github.com:JohnFerrancol/photo-tagging.git
```

2. Set up the local environment and fill in DATABASE_URL and Supabase information

```sh
cp .env.example .env
```

3. Build the Application

```
npm run build
```

6. Running the Express server

```sh
npm run start
```

4. Open in web browser via: http://localhost:3000

## Roadmap

- [x] Create the Prisma Schema for the 4 models: Image, Character, Session, Leaderboard
- [x] Store the games' photos in a Supabase and integrate them into the Express server
- [x] Create HTTP Request for GET /games to obtain the infromation of the games for the Home Page in the frontend
- [x] Create HTTP Request for GET /games/:gameId to obtain the infromation for the specific game for the Game Page in the frontend
- [ ] Create HTTP Request for GET /leaderboards to obtain the leaderboard for each game for the Leaderboard Page in the frontend
- [ ] Create HTTP Request for POST /games/:gameId/start to start a game and store it in a session
- [ ] Create HTTP Request for POST /games/:gameId/guess to verify the user's guess
- [ ] Create HTTP Request for POST /games/:gameId/finish to save the user's information, like completion time and name, after completing each game
