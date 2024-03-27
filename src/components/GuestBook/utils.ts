export const charactors = [
  "Trigger",
  "Oreo",
  "Trouble",
  "Sasha",
  "Whiskers",
  "Milo",
  "Missy",
  "Abby",
  "Toby",
  "Snikers",
  "Jack",
  "Spooky",
  "Samantha",
  "Cali",
  "Harley",
  "Coco",
  "Lucy",
  "Felix",
  "Sam",
  "Pumpkin",
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
