export const charactors = [
  "Abby",
  "Baby",
  "Bandit",
  "Bear",
  "Bella",
  "Boo",
  "Boots",
  "Cali",
  "Casper",
  "Coco",
  "Cuddles",
  "Daisy",
  "Dusty",
  "Felix",
  "Gizmo",
  "Harley",
  "Jack",
  "Kiki",
  "Leo",
  "Lily",
  "Loki",
  "Lucy",
  "Milo",
  "Missy",
  "Nala",
  "Oreo",
  "Princess",
  "Pumpkin",
  "Rascal",
  "Sam",
  "Sammy",
  "Samantha",
  "Snikers",
  "Snowball",
  "Sasha",
  "Spooky",
  "Toby",
  "Trigger",
  "Trouble",
  "Whiskers",
];

export const backgrounds = [
  "b6e3f4",
  "c0aede",
  "d1d4f9",
  "ffd5dc",
  "ffdfbf",
  "ffffff",
];

export const makeImageSrc = (charactor: string, background: string) => {
  return `https://api.dicebear.com/8.x/notionists-neutral/svg?seed=${charactor}&backgroundColor=${background}`;
};

const getRandomNumber = (n: number): number => Math.floor(Math.random() * n);

export const randomProfile = () => {
  return {
    charactor: charactors[getRandomNumber(charactors.length)],
    background: backgrounds[getRandomNumber(backgrounds.length)],
  };
};
