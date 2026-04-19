const games = [
  {
    name: 'Children Game',
    folder: 'children-game',
    imagePath: '/children-game.webp',
    characters: [
      {
        name: 'Climber',
        imagePath: 'climber.png',
        x: 0.75,
        y: 0.258,
        xTol: 0.01,
        yTol: 0.02,
      },
      {
        name: 'Huddled',
        imagePath: 'huddled.png',
        x: 0.258,
        y: 0.581,
        xTol: 0.015,
        yTol: 0.015,
      },
      {
        name: 'Swimmer',
        imagePath: 'swimmer.png',
        x: 0.141,
        y: 0.284,
        xTol: 0.01,
        yTol: 0.01,
      },
    ],
  },
  {
    name: 'Dutch Proverbs',
    folder: 'dutch-proverbs',
    imagePath: '/dutch-proverbs.webp',
    characters: [
      {
        name: 'Farmer',
        imagePath: 'farmer.png',
        x: 0.475,
        y: 0.107,
        xTol: 0.02,
        yTol: 0.03,
      },
      {
        name: 'Fisherman',
        imagePath: 'fisherman.png',
        x: 0.987,
        y: 0.184,
        xTol: 0.01,
        yTol: 0.015,
      },
      {
        name: 'PDA',
        imagePath: 'pda.png',
        x: 0.123,
        y: 0.133,
        xTol: 0.015,
        yTol: 0.015,
      },
    ],
  },
  {
    name: 'Railway Station',
    folder: 'railway-station',
    imagePath: '/railway-station.webp',
    characters: [
      {
        name: 'Conductor',
        imagePath: 'conductor.png',
        x: 0.206,
        y: 0.505,
        xTol: 0.006,
        yTol: 0.017,
      },
      {
        name: 'PDA',
        imagePath: 'pda.png',
        x: 0.478,
        y: 0.495,
        xTol: 0.01,
        yTol: 0.02,
      },
      {
        name: 'Reader',
        imagePath: 'reader.png',
        x: 0.91,
        y: 0.518,
        xTol: 0.015,
        yTol: 0.025,
      },
    ],
  },
];

const leaderboardSeed = [
  {
    gameId: 1,
    entries: [
      { name: 'Alice', time: 28.4 },
      { name: 'Bob', time: 12.7 },
      { name: 'Charlie', time: 22.1 },
    ],
  },
  {
    gameId: 2,
    entries: [
      { name: 'Dylan', time: 23.2 },
      { name: 'Eve', time: 25.8 },
      { name: 'Frank', time: 13.5 },
    ],
  },
  {
    gameId: 3,
    entries: [
      { name: 'Greg', time: 34.2 },
      { name: 'Holly', time: 17.8 },
      { name: 'Ivan', time: 26.5 },
    ],
  },
];

export { games, leaderboardSeed };
