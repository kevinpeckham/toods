import { readable } from "svelte/store";

//- utils
import { get_unique_id } from "$utils/idUtils";

//- types
import type { Todo, TodoConstructor } from "$types/todoTypes";

const backup_3 = `
[
  {
      "index": 0,
      "completed": false,
      "friction": 3,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "sustainability report",
      "due": "",
      "next": true,
      "tags": [
          "graphics"
      ],
      "unique": "lg3po561-3vdnps",
      "joy": 0,
      "priority": 3
  },
  {
      "index": 1,
      "completed": false,
      "friction": 2,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "verde website",
      "due": "2022-12-31",
      "next": true,
      "tags": [
          "web"
      ],
      "unique": "lg3po561-lce270",
      "joy": 1,
      "priority": 3
  },
  {
      "index": 2,
      "completed": true,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "cancel height",
      "due": "2023-04-12",
      "next": true,
      "tags": [
          "budgeting"
      ],
      "unique": "lg3po561-iuk42r",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 3,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "Alex Meeting",
      "due": "",
      "next": false,
      "tags": [
          "sales"
      ],
      "unique": "lg3po561-zpttps",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 4,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "Breakfast of Champions text adventure game",
      "due": "",
      "next": false,
      "tags": [
          "ideas"
      ],
      "unique": "lg3po561-gdxv58",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 5,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "fix dev environment: Zenith Terminals",
      "due": "",
      "next": false,
      "tags": [
          "zenith",
          "web"
      ],
      "unique": "lg3po561-jl8e26",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 6,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "Philadelphia Payroll taxes",
      "due": "",
      "next": false,
      "tags": [
          "lj"
      ],
      "unique": "lg3po561-9ozggt",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 7,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "Migrate LJ website to Vercel (or Deno?)",
      "due": "",
      "next": false,
      "tags": [
          "lj"
      ],
      "unique": "lg3po561-yf1wsz",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 8,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "bug: web bugs",
      "due": "",
      "next": false,
      "tags": [
          "slx"
      ],
      "unique": "lg3po561-bttgt4",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 9,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "code review: Zenith Capital",
      "due": "",
      "next": false,
      "tags": [
          "adam"
      ],
      "unique": "lg3po561-2lvy6d",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 10,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "bug: safari and iOS buttons",
      "due": "",
      "next": false,
      "tags": [
          "slx",
          "web"
      ],
      "unique": "lg3po561-zv2ixs",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 11,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "bug: dropdown breaking screen width on customer stories page",
      "due": "",
      "next": false,
      "tags": [
          "slx",
          "web"
      ],
      "unique": "lg3po561-1nfv2d",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 12,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "bug: home page about copy: make it less awkward",
      "due": "",
      "next": false,
      "tags": [
          "slx",
          "web"
      ],
      "unique": "lg3po561-rmxkcw",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 13,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "bug: missing NPR from SLX home page",
      "due": "",
      "next": false,
      "tags": [
          "slx",
          "web"
      ],
      "unique": "lg3po561-dh8isp",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 14,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "bug: SLX state of security, is it represented?",
      "due": "",
      "next": false,
      "tags": [
          "slx",
          "web"
      ],
      "unique": "lg3po561-e64roa",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 15,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "content: new news stories to home page",
      "due": "",
      "next": false,
      "tags": [
          "slx",
          "web"
      ],
      "unique": "lg3po561-ll30t9",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 16,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "bug: home images @md breakpoint",
      "due": "",
      "next": false,
      "tags": [
          "slx",
          "web"
      ],
      "unique": "lg3po561-9gcdn0",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 17,
      "completed": true,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "",
      "due": "",
      "next": false,
      "tags": [],
      "unique": "lg3po561-5obs25",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 18,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "migrate: resources",
      "due": "",
      "next": false,
      "tags": [
          "slx",
          "web"
      ],
      "unique": "lg3po561-aenev2",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 19,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "migrate: google analytics",
      "due": "",
      "next": false,
      "tags": [
          "slx",
          "web"
      ],
      "unique": "lg3po561-7at60r",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 20,
      "completed": true,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "",
      "due": "",
      "next": false,
      "tags": [],
      "unique": "lg3po561-tk1ra8",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 21,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "opt-out synching",
      "due": "",
      "next": false,
      "tags": [
          "slx",
          "pardot"
      ],
      "unique": "lg3po561-rgss6l",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 22,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "bug: container query poly-fill issue",
      "due": "",
      "next": false,
      "tags": [
          "slx",
          "web"
      ],
      "unique": "lg3po561-75qus6",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 23,
      "completed": true,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "",
      "due": "",
      "next": false,
      "tags": [],
      "unique": "lg3po561-bcvqee",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 24,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "content: add securelogix overview flyer",
      "due": "",
      "next": false,
      "tags": [
          "slx",
          "web"
      ],
      "unique": "lg3po561-tivh69",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 25,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "email signature",
      "due": "",
      "next": false,
      "tags": [
          "f&m"
      ],
      "unique": "lg3po561-ue4lzk",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 26,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "ideas: games for Leo",
      "due": "",
      "next": false,
      "tags": [
          "kp"
      ],
      "unique": "lg3po561-or7t28",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 27,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "ideas: grief game?",
      "due": "",
      "next": false,
      "tags": [
          "kp"
      ],
      "unique": "lg3po561-4i3ser",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 28,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "review and cut expenses",
      "due": "",
      "next": false,
      "tags": [
          "lj"
      ],
      "unique": "lg3po561-9oe07s",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 29,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "s-corp status to philadelphia",
      "due": "",
      "next": false,
      "tags": [
          "lj",
          "taxes"
      ],
      "unique": "lg3po561-thtmfs",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 30,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "did we invoice verde email sig?",
      "due": "",
      "next": false,
      "tags": [
          "lj",
          "billing"
      ],
      "unique": "lg3po561-wkxb6r",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 31,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "did we invoice Sage for PPTX work?",
      "due": "",
      "next": false,
      "tags": [
          "lj",
          "billing"
      ],
      "unique": "lg3po561-xvc1ow",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 32,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "reach out to Jim",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "friends"
      ],
      "unique": "lg3po561-ia4dwv",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 33,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "reach out to Dave Lane",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "friends"
      ],
      "unique": "lg3po561-4kq8up",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 34,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "Petro new sites: css updates",
      "due": "",
      "next": false,
      "tags": [
          "petro"
      ],
      "unique": "lg3po561-3ir480",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 35,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "reach out to Eric Bell",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "frends"
      ],
      "unique": "lg3po561-43ihni",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 36,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "reach out to Rachel",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "friends"
      ],
      "unique": "lg3po561-6ljeg8",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 37,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "dentist appointment",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "health"
      ],
      "unique": "lg3po561-89g1lb",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 38,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "eye doctor appointment",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "health"
      ],
      "unique": "lg3po561-qusuj8",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 39,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "gp appointment + colonoscopy",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "health"
      ],
      "unique": "lg3po561-3iiygx",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 40,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "dermatologist appointment ",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "health"
      ],
      "unique": "lg3po561-guzumk",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 41,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "Rust",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "learn"
      ],
      "unique": "lg3po561-sr8tz3",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 42,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "Raycast: keep exploring, using",
      "due": "",
      "next": false,
      "tags": [],
      "unique": "lg3po561-sr89x2",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 43,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "Pugify: migrate & fix bugs",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "side"
      ],
      "unique": "lg3po561-18mvng",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 44,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "Vug: keep developing",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "side"
      ],
      "unique": "lg3po561-wenlyl",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 45,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "Prisma: learn",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "learn"
      ],
      "unique": "lg3po561-7nyejh",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 46,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "SQLite: learn",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "learn"
      ],
      "unique": "lg3po561-rtmpxg",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 47,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "Email Signature",
      "due": "",
      "next": false,
      "tags": [
          "lj",
          "marketing"
      ],
      "unique": "lg3po561-o2gu7j",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 48,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "New Archery Mug for Maggie",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "maggie"
      ],
      "unique": "lg3po561-kjtztz",
      "joy": 3,
      "priority": 0
  },
  {
      "index": 49,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "SkinnyPug: maintain",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "side"
      ],
      "unique": "lg3po561-ibbgw2",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 50,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "Reach out to Quinn",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "friends"
      ],
      "unique": "lg3po561-ozvf3g",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 51,
      "completed": false,
      "friction": 2,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "reach out to Charlie",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "friends"
      ],
      "unique": "lg3po561-bae1wr",
      "joy": 3,
      "priority": 0
  },
  {
      "index": 52,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "reach out to Mel",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "friends"
      ],
      "unique": "lg3po561-ptiw6h",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 53,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "reach out to Rush ",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "friends"
      ],
      "unique": "lg3po561-r87df8",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 54,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "reach out to Regan & Eric",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "friends"
      ],
      "unique": "lg3po561-r54u8x",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 55,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "philly shirt for Maggie",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "maggie"
      ],
      "unique": "lg3po561-q1fely",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 56,
      "completed": false,
      "friction": 3,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "reach out to Mike D",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "friends"
      ],
      "unique": "lg3po561-yjhpyi",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 57,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "coordinate PGW inspection?",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "home"
      ],
      "unique": "lg3po561-f9qy7h",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 58,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "fix back door",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "home"
      ],
      "unique": "lg3po561-kzueul",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 59,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "replace air filter",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "home"
      ],
      "unique": "lg3po561-miwds9",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 60,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "rating of 3 priority gets highlighted",
      "due": "",
      "next": false,
      "tags": [
          "toods"
      ],
      "unique": "lg3po561-gd30xj",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 61,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "reach out to Naki",
      "due": "",
      "next": false,
      "tags": [
          "kp",
          "friends"
      ],
      "unique": "lg3po561-yku3mz",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 62,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "",
      "due": "",
      "next": false,
      "tags": [],
      "unique": "lg3po561-viuj46",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 63,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "",
      "due": "",
      "next": false,
      "tags": [],
      "unique": "lg3po561-ojcdjz",
      "joy": 0,
      "priority": 0
  },
  {
      "index": 64,
      "completed": false,
      "friction": 0,
      "created":"2023-04-05T17:04:58.271Z",
      "description": "",
      "due": "",
      "next": false,
      "tags": [],
      "unique": "lg3po561-19nz1a",
      "joy": 0,
      "priority": 0
  }
]
`;

export const backup_data = backup_3;

// const parsed = JSON.parse(backup_2);
// export const enriched: Todo[] = parsed.map((item: TodoConstructor) => {
// 	const {
// 		id,
// 		completed,
// 		friction,
// 		created,
// 		description,
// 		due,
// 		joy,
// 		next,
// 		tags,
// 		unique_id,
// 		priority,
// 	} = item;
// 	const todo = {
// 		id,
// 		completed,
// 		friction:
// 			typeof item.friction === "string" && item.friction != ""
// 				? item.friction.length
// 				: 0,
// 		created,
// 		description,
// 		due,
// 		next,
// 		tags,
// 		unique_id,
// 		joy: typeof item.joy === "string" && item.joy != "" ? item.joy.length : 0,
// 		priority:
// 			typeof item.priority === "string" && item.priority != ""
// 				? Number(item.priority.length)
// 				: 0,
// 	} as Todo;
// 	return todo;
// });
