export type Difficulty = "easy" | "medium" | "hard";

export interface FiltrosUsuario {
  difficulty: Difficulty;
  participants: number;
}

export interface Question {
  type: string;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface Trivia {
  response_code: number;
  results: Question[];
}

export interface CardOptions {
  subcategoria: string;
  difficulty: Difficulty;
  questionText: string;
  priceLevel: number;
  accessibilityLevel: number;
  participants: number;
  onVolver: () => void;
}
