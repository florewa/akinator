<script setup lang="ts">
import { ref, onMounted } from "vue";

import VButton from "@/components/ui/VButton/VButton.vue";
import VModal from "@/components/ui/VModal/VModal.vue";
import type { HistoryStep, KnowledgeNode } from "@/types/types.ts";

const props = defineProps<{ database: KnowledgeNode }>();
const emit = defineEmits<{
  (e: "game-over"): void;
  (e: "needs-learning", failingNode: KnowledgeNode): void;
  (e: "back"): void;
}>();

const currentNode = ref<KnowledgeNode>(props.database);
const history = ref<HistoryStep[]>([]);
const showWhy = ref(false);

const successModalOpen = ref(false);

onMounted(() => {
  currentNode.value = props.database;
  history.value = [];
});

const handleAnswer = (isYes: boolean) => {
  if (currentNode.value.type === "question") {
    history.value.push({
      question: currentNode.value.text,
      answer: isYes ? "Да" : "Нет",
    });
    if (isYes && currentNode.value.yes)
      currentNode.value = currentNode.value.yes;
    else if (!isYes && currentNode.value.no)
      currentNode.value = currentNode.value.no;
  } else {
    if (isYes) {
      successModalOpen.value = true;
    } else {
      emit("needs-learning", currentNode.value);
    }
  }
};

const finishGame = () => {
  successModalOpen.value = false;
  emit("game-over");
};
</script>

<template>
  <div class="game-session">
    <div class="game-session__card">
      <span class="game-session__label">
        {{ currentNode.type === "question" ? "Вопрос" : "Я думаю это..." }}
      </span>

      <h2 class="game-session__text">
        {{ currentNode.text }}<span v-if="currentNode.type === 'breed'">?</span>
      </h2>

      <div class="game-session__actions">
        <VButton variant="primary" @click="handleAnswer(true)">Да</VButton>
        <VButton variant="danger" @click="handleAnswer(false)">Нет</VButton>
      </div>

      <button
        v-if="currentNode.type === 'question'"
        @click="showWhy = !showWhy"
        class="game-session__why-link"
      >
        🤔 Почему такой вопрос?
      </button>
    </div>

    <div v-if="showWhy" class="why-bubble">
      <h3>История:</h3>
      <ul class="why-bubble__list">
        <li v-for="(step, idx) in history" :key="idx" class="why-bubble__item">
          <span>{{ step.question }}</span>
          <span
            class="why-bubble__tag"
            :class="step.answer === 'Да' ? 'yes' : 'no'"
          >
            {{ step.answer }}
          </span>
        </li>
      </ul>
    </div>

    <div class="game-session__footer">
      <VButton variant="ghost" @click="emit('back')">Прервать игру</VButton>
    </div>

    <VModal :is-open="successModalOpen" title="Ура! 🎉" @close="finishGame">
      <p style="text-align: center">
        Я угадал! Это действительно <b>{{ currentNode.text }}</b
        >. <br />
        Я становлюсь умнее с каждым разом.
      </p>
      <template #footer>
        <VButton @click="finishGame">В меню</VButton>
      </template>
    </VModal>
  </div>
</template>

<style scoped lang="scss">
.game-session {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__card {
    text-align: center;
    margin-bottom: 20px;
    width: 100%;
  }

  &__label {
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 1px;
    color: #999;
    font-weight: 800;
  }

  &__text {
    font-size: 1.8rem;
    margin: 20px 0 30px;
    color: var(--text-main);
  }

  &__actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    width: 100%;
    margin-bottom: 20px;
  }

  &__why-link {
    background: none;
    border: none;
    color: var(--accent);
    text-decoration: underline;
    cursor: pointer;
    font-size: 0.9rem;
  }

  &__footer {
    width: 100%;
    margin-top: 20px;
  }
}

.why-bubble {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 16px;
  width: 100%;
  text-align: left;
  font-size: 0.9rem;
  border: 1px solid #eee;

  h3 {
    margin: 0 0 10px;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 6px 0;
    border-bottom: 1px solid #eee;
  }

  &__tag {
    font-weight: bold;
    &.yes {
      color: var(--accent);
    }
    &.no {
      color: var(--danger);
    }
  }
}
</style>
