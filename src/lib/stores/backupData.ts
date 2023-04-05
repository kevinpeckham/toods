import { readable } from "svelte/store";

const data = `
[
  {
    "id": 0,
    "completed": false,
    "created": "2023-04-03",
    "description": "sustainability report",
    "due": "",
    "friction": ":::",
    "joy": "",
    "next": true,
    "tags": [
      "graphics"
    ],
    "priority": "+++"
  },
  {
    "id": 1,
    "completed": false,
    "created": "2023-04-03",
    "description": "verde website",
    "due": "2022-12-31",
    "friction": "::",
    "joy": "~",
    "next": true,
    "tags": [
      "web"
    ],
    "priority": "+++"
  },
  {
    "id": 2,
    "completed": true,
    "friction": "",
    "created": "2023-04-03",
    "description": "cancel height",
    "due": "2023-04-12",
    "joy": "",
    "next": true,
    "tags": [
      "budgeting"
    ],
    "priority": ""
  },
  {
    "id": 3,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "Alex Meeting",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "sales"
    ],
    "priority": ""
  },
  {
    "id": 4,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "Breakfast of Champions text adventure game",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "ideas"
    ],
    "priority": ""
  },
  {
    "id": 5,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "fix dev environment: Zenith Terminals",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "zenith",
      "web"
    ],
    "priority": ""
  },
  {
    "id": 6,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "Philadelphia Payroll taxes",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "lj"
    ],
    "priority": ""
  },
  {
    "id": 7,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "Migrate LJ website to Vercel (or Deno?)",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "lj"
    ],
    "priority": ""
  },
  {
    "id": 8,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "bug: web bugs",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "slx"
    ],
    "priority": ""
  },
  {
    "id": 9,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "code review: Zenith Capital",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "adam"
    ],
    "priority": ""
  },
  {
    "id": 10,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "bug: safari and iOS buttons",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "slx",
      "web"
    ],
    "priority": ""
  },
  {
    "id": 11,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "bug: dropdown breaking screen width on customer stories page",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "slx",
      "web"
    ],
    "priority": ""
  },
  {
    "id": 12,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "bug: home page about copy: make it less awkward",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "slx",
      "web"
    ],
    "priority": ""
  },
  {
    "id": 13,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "bug: missing NPR from SLX home page",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "slx",
      "web"
    ],
    "priority": ""
  },
  {
    "id": 14,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "bug: SLX state of security, is it represented?",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "slx",
      "web"
    ],
    "priority": ""
  },
  {
    "id": 15,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "content: new news stories to home page",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "slx",
      "web"
    ],
    "priority": ""
  },
  {
    "id": 16,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "bug: home images @md breakpoint",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "slx",
      "web"
    ],
    "priority": ""
  },
  {
    "id": 17,
    "completed": true,
    "friction": "",
    "created": "2023-04-03",
    "description": "",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [],
    "priority": ""
  },
  {
    "id": 18,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "migrate: resources",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "slx",
      "web"
    ],
    "priority": ""
  },
  {
    "id": 19,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "migrate: google analytics",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "slx",
      "web"
    ],
    "priority": 0
  },
  {
    "id": 20,
    "completed": true,
    "friction": "",
    "created": "2023-04-03",
    "description": "",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [],
    "priority": 0
  },
  {
    "id": 21,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "opt-out synching",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "slx",
      "pardot"
    ],
    "priority": 0
  },
  {
    "id": 22,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "bug: container query poly-fill issue",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "slx",
      "web"
    ],
    "priority": 0
  },
  {
    "id": 23,
    "completed": true,
    "friction": "",
    "created": "2023-04-03",
    "description": "",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [],
    "priority": 0
  },
  {
    "id": 24,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "content: add securelogix overview flyer",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "slx",
      "web"
    ],
    "priority": 0
  },
  {
    "id": 25,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "email signature",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "f&m"
    ],
    "priority": 2
  },
  {
    "id": 26,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "ideas: games for Leo",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp"
    ],
    "priority": 0
  },
  {
    "id": 27,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "ideas: grief game?",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp"
    ],
    "priority": 0
  },
  {
    "id": 28,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "review and cut expenses",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "lj"
    ],
    "priority": 0
  },
  {
    "id": 29,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "s-corp status to philadelphia",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "lj",
      "taxes"
    ],
    "priority": 0
  },
  {
    "id": 30,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "did we invoice verde email sig?",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "lj",
      "billing"
    ],
    "priority": 0
  },
  {
    "id": 31,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "did we invoice Sage for PPTX work?",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "lj",
      "billing"
    ],
    "priority": 0
  },
  {
    "id": 32,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "reach out to Jim",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "friends"
    ],
    "priority": 3
  },
  {
    "id": 33,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "reach out to Dave Lane",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "friends"
    ],
    "priority": 2
  },
  {
    "id": 34,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "Petro new sites: css updates",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "petro"
    ],
    "priority": 0
  },
  {
    "id": 35,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "reach out to Eric Bell",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "frends"
    ],
    "priority": 0
  },
  {
    "id": 36,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "reach out to Rachel",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "friends"
    ],
    "priority": 0
  },
  {
    "id": 37,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "dentist appointment",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "health"
    ],
    "priority": 0
  },
  {
    "id": 38,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "eye doctor appointment",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "health"
    ],
    "priority": 0
  },
  {
    "id": 39,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "gp appointment + colonoscopy",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "health"
    ],
    "priority": 0
  },
  {
    "id": 40,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "dermatologist appointment ",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "health"
    ],
    "priority": 0
  },
  {
    "id": 41,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "Rust",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "learn"
    ],
    "priority": 0
  },
  {
    "id": 42,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "Raycast: keep exploring, using",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [],
    "priority": 0
  },
  {
    "id": 43,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "Pugify: migrate & fix bugs",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "side"
    ],
    "priority": 0
  },
  {
    "id": 44,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "Vug: keep developing",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "side"
    ],
    "priority": 0
  },
  {
    "id": 45,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "Prisma: learn",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "learn"
    ],
    "priority": 0
  },
  {
    "id": 46,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "SQLite: learn",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "learn"
    ],
    "priority": 0
  },
  {
    "id": 47,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "Email Signature",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "lj",
      "marketing"
    ],
    "priority": 0
  },
  {
    "id": 48,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "New Archery Mug for Maggie",
    "due": "",
    "joy": "~~~",
    "next": false,
    "tags": [
      "kp",
      "maggie"
    ],
    "priority": 3
  },
  {
    "id": 49,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "SkinnyPug: maintain",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "side"
    ],
    "priority": 0
  },
  {
    "id": 50,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "Reach out to Quinn",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "friends"
    ],
    "priority": 0
  },
  {
    "id": 51,
    "completed": false,
    "friction": "::",
    "created": "2023-04-03",
    "description": "reach out to Charlie",
    "due": "",
    "joy": "~~~",
    "next": false,
    "tags": [
      "kp",
      "friends"
    ],
    "priority": 2
  },
  {
    "id": 52,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "reach out to Mel",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "friends"
    ],
    "priority": 0
  },
  {
    "id": 53,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "reach out to Rush ",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "friends"
    ],
    "priority": 0
  },
  {
    "id": 54,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "reach out to Regan & Eric",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "friends"
    ],
    "priority": 0
  },
  {
    "id": 55,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "philly shirt for Maggie",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "maggie"
    ],
    "priority": 0
  },
  {
    "id": 56,
    "completed": false,
    "friction": ":::",
    "created": "2023-04-03",
    "description": "reach out to Mike D",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "friends"
    ],
    "priority": 3
  },
  {
    "id": 57,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "coordinate PGW inspection?",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "home"
    ],
    "priority": 0
  },
  {
    "id": 58,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "fix back door",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "home"
    ],
    "priority": 0
  },
  {
    "id": 59,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "replace air filter",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "home"
    ],
    "priority": 0
  },
  {
    "id": 60,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "rating of 3 priority gets highlighted",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "toods"
    ],
    "priority": 0
  },
  {
    "id": 61,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "reach out to Naki",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [
      "kp",
      "friends"
    ],
    "priority": 0
  },
  {
    "id": 62,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [],
    "priority": 0
  },
  {
    "id": 63,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [],
    "priority": 0
  },
  {
    "id": 64,
    "completed": false,
    "friction": "",
    "created": "2023-04-03",
    "description": "",
    "due": "",
    "joy": "",
    "next": false,
    "tags": [],
    "priority": 0
  }
]
`;

export const backup_data = data;
