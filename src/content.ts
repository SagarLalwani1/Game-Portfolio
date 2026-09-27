export type Story = {
  id: string;
  title: string;
  year: string;
  eyebrow: string;
  summary: string;
  details: string[];
  tech: string[];
};

export const stories: Record<string, Story> = {
  firstC: {
    id: "firstC",
    title: "The First C Program",
    year: "2019",
    eyebrow: "THE BEGINNING",
    summary:
      "The first programs were simple printf/scanf exercises. Fibonacci and factorial were the first problems that made programming feel genuinely fascinating.",
    details: [
      "I joined MGIT in 2019 for Electronics & Communication Engineering because I wanted to build machines and robots.",
      "C was my first programming language in college.",
      "Fibonacci and factorial were early problems that made the connection between logic and a working program click.",
    ],
    tech: ["C", "Programming fundamentals"],
  },
  mike: {
    id: "mike",
    title: "Mike — IBM Watson Chatbot",
    year: "2019",
    eyebrow: "EARLY AI",
    summary:
      "A mall-information chatbot built with IBM Watson, before today's LLM era.",
    details: [
      "The chatbot was named Mike and was designed around a mall's information.",
      "It could answer questions such as which stores were on which floor and common mall FAQs.",
      "The interesting part of the project was working with conversational AI in 2019, when modern LLM-based chatbots were not yet the normal development model.",
    ],
    tech: ["IBM Watson", "Chatbot", "FAQ / knowledge data"],
  },
  smartVehicle: {
    id: "smartVehicle",
    title: "Smart Vehicle",
    year: "2019–2020",
    eyebrow: "ROBOTICS",
    summary:
      "An obstacle-avoiding robot using an ultrasonic sensor and a servo-controlled decision mechanism.",
    details: [
      "The ultrasonic sensor detected obstacles in front of the robot.",
      "A servo motor was used to inspect directions and help decide where the robot should move.",
      "This was one of the early projects where software logic directly controlled physical movement.",
    ],
    tech: ["Arduino", "Ultrasonic sensor", "Servo motor", "Embedded systems"],
  },
  bb8: {
    id: "bb8",
    title: "BB-8",
    year: "2020",
    eyebrow: "BUILDING THINGS",
    summary:
      "A physical BB-8-inspired robot built around an inflatable beach ball body.",
    details: [
      "The build used an Arduino Uno, motor shield, geared motors and an HC-05 Bluetooth module.",
      "The body was constructed around an inflatable beach ball using newspaper, canvas and glue.",
      "The original build also used a styrofoam head, magnets and other improvised components.",
      "Some components became difficult to source during lockdown, so the build was not completed exactly as originally planned.",
    ],
    tech: ["Arduino Uno", "HC-05", "DC motors", "Bluetooth", "Mechanical build"],
  },
};