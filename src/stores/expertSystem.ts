import { defineStore } from "pinia";
import { ref } from "vue";

import type { KnowledgeNode } from "@/types/types.ts";

const INITIAL_DATA: KnowledgeNode = { id: 1, type: "breed", text: "Дворняга" };

export const useExpertSystemStore = defineStore("expertSystem", () => {
  const database = ref<KnowledgeNode>(JSON.parse(JSON.stringify(INITIAL_DATA)));
  const mode = ref<"menu" | "game" | "learning" | "view" | "search">("menu");
  const learningTargetNode = ref<KnowledgeNode | null>(null);

  const notification = ref<{ show: boolean; title: string; message: string }>({
    show: false,
    title: "",
    message: "",
  });

  const showNotify = (title: string, message: string) => {
    notification.value = { show: true, title, message };
  };

  const closeNotify = () => {
    notification.value.show = false;
  };

  const initialize = () => {
    const saved = localStorage.getItem("dog_expert_system");
    if (saved) database.value = JSON.parse(saved);
  };

  const saveDB = () => {
    localStorage.setItem("dog_expert_system", JSON.stringify(database.value));
    showNotify("Успешно", "База знаний сохранена в браузере!");
  };

  const resetDB = () => {
    if (confirm("Точно сбросить? Все знания пропадут.")) {
      database.value = JSON.parse(JSON.stringify(INITIAL_DATA));
      saveDB();
      showNotify("Сброс", "База знаний вернулась к заводским настройкам.");
    }
  };

  const setMode = (newMode: typeof mode.value) => {
    mode.value = newMode;
  };

  const startLearning = (failingNode: KnowledgeNode) => {
    learningTargetNode.value = failingNode;
    setMode("learning");
  };

  const applyLearning = (data: {
    breed: string;
    question: string;
    isYes: boolean;
  }) => {
    if (!learningTargetNode.value) return;
    const target = learningTargetNode.value;
    const newBreedNode: KnowledgeNode = {
      id: Date.now(),
      type: "breed",
      text: data.breed,
    };
    const oldBreedNode = { ...target };

    target.type = "question";
    target.text = data.question;

    if (data.isYes) {
      target.yes = newBreedNode;
      target.no = oldBreedNode;
    } else {
      target.yes = oldBreedNode;
      target.no = newBreedNode;
    }

    saveDB();
    showNotify("Обучение завершено", "Я запомнил новую породу! Спасибо.");
    setMode("menu");
    learningTargetNode.value = null;
  };

  return {
    database,
    mode,
    learningTargetNode,
    notification,
    showNotify,
    closeNotify,
    initialize,
    saveDB,
    resetDB,
    setMode,
    startLearning,
    applyLearning,
  };
});
