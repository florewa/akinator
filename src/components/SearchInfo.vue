<script setup lang="ts">
import { ref, watch } from "vue";

import VButton from "@/components/ui/VButton/VButton.vue";
import type {
  KnowledgeNode,
  SearchPathStep,
  SearchResult,
} from "@/types/types.ts";

const props = defineProps<{ database: KnowledgeNode }>();
const emit = defineEmits<{ (e: "back"): void }>();

const query = ref("");
const result = ref<SearchResult | null>(null);
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const findObjectPath = (
  node: KnowledgeNode,
  target: string,
  path: SearchPathStep[] = [],
): SearchResult | null => {
  if (node.type === "breed") {
    if (node.text.toLowerCase().includes(target.toLowerCase())) {
      return { found: true, path, node };
    }
    return null;
  }
  if (node.yes) {
    const res = findObjectPath(node.yes, target, [
      ...path,
      { q: node.text, a: "Да" },
    ]);
    if (res) return res;
  }
  if (node.no) {
    const res = findObjectPath(node.no, target, [
      ...path,
      { q: node.text, a: "Нет" },
    ]);
    if (res) return res;
  }
  return null;
};

watch(query, (newVal) => {
  if (debounceTimer) clearTimeout(debounceTimer);

  if (!newVal.trim()) {
    result.value = null;
    return;
  }

  debounceTimer = setTimeout(() => {
    result.value = findObjectPath(props.database, newVal.trim());
  }, 300);
});
</script>

<template>
  <div class="search-info">
    <h2>🔍 Поиск</h2>

    <div class="search-info__bar">
      <input v-model="query" placeholder="Введите породу (например: Мопс)..." />
    </div>

    <div v-if="result" class="search-result search-result--found">
      <h3>🐶 {{ result.node.text }}</h3>
      <div class="search-result__path">
        <div v-for="(step, i) in result.path" :key="i" class="path-step">
          <span class="path-step__q">{{ step.q }}</span>
          <span class="path-step__arrow">➜</span>
          <span class="path-step__a" :class="step.a === 'Да' ? 'yes' : 'no'">
            {{ step.a }}
          </span>
        </div>
      </div>
    </div>

    <div
      v-else-if="query && !result"
      class="search-result search-result--empty"
    >
      😔 Такой собаки я не знаю.
    </div>

    <VButton variant="secondary" @click="emit('back')" class="mt-auto">
      Назад
    </VButton>
  </div>
</template>

<style scoped lang="scss">
.search-info {
  display: flex;
  flex-direction: column;
  height: 100%;

  &__bar {
    display: flex;
    margin-bottom: 20px;
    position: relative;

    input {
      width: 100%;
      padding: 16px 20px;
      border-radius: 50px;
      border: 2px solid #eee;
      font-size: 1rem;
      outline: none;
      transition:
        border-color 0.2s ease,
        box-shadow 0.2s ease;

      &:focus {
        border-color: var(--accent);
        box-shadow: 0 4px 12px rgba(108, 99, 255, 0.1);
      }

      &::placeholder {
        color: #bbb;
      }
    }
  }
}

.search-result {
  background: #f8f9fa;
  border-radius: 16px;
  padding: 20px;
  text-align: left;
  border: 1px solid #eee;
  animation: fadeIn 0.3s ease;

  &--empty {
    color: var(--danger-color);
    text-align: center;
    font-weight: bold;
    background: #fff5f5;
    border-color: #ffebee;
  }

  &__path {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
}

.path-step {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  gap: 10px;

  &__q {
    flex: 1;
    color: var(--text-main);
  }
  &__arrow {
    color: #ccc;
    font-size: 0.8em;
  }
  &__a {
    font-weight: 800;
    text-transform: uppercase;
    font-size: 0.85rem;
    padding: 4px 8px;
    border-radius: 6px;

    &.yes {
      color: #155724;
      background: #d4edda;
    }
    &.no {
      color: #721c24;
      background: #f8d7da;
    }
  }
}

.mt-auto {
  margin-top: 64px;
  padding-top: 20px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(5px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
