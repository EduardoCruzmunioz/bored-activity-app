import type { Trivia, Difficulty } from "./interface/trivia";

export const CATEGORIAS_MAP: Record<number, string> = {
  10: "Books",
  11: "Film",
  12: "Music",
  14: "Video Game",
  15: "Board Games",
  29: "Comics",
  31: "Japanese Anime",
  32: "Cartoon",
};

const CATEGORIAS_IDS = Object.keys(CATEGORIAS_MAP).map(Number);

export async function cargarActividad(
  difficulty: Difficulty,
): Promise<{ data: Trivia; categoryId: number }> {
  const categoryIdRandom =
    CATEGORIAS_IDS[Math.floor(Math.random() * CATEGORIAS_IDS.length)];
  const url = `https://opentdb.com/api.php?amount=1&category=${categoryIdRandom}&difficulty=${difficulty}`;
  const response = await fetch(url);
  const data: Trivia = await response.json();

  return { data, categoryId: categoryIdRandom };
}
