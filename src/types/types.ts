export type NodeType = "question" | "breed";

export interface KnowledgeNode {
  id: number;
  type: NodeType;
  text: string;
  yes?: KnowledgeNode; // Ссылка на ветку "Да" (существует только если type === 'question')
  no?: KnowledgeNode; // Ссылка на ветку "Нет"
}

export interface HistoryStep {
  question: string;
  answer: "Да" | "Нет";
}

export interface SearchPathStep {
  q: string;
  a: string;
}

export interface SearchResult {
  found: boolean;
  path: SearchPathStep[];
  node: KnowledgeNode;
}
