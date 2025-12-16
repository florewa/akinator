<script setup lang="ts">
import type { KnowledgeNode } from "@/types/types.ts";

defineProps<{ node: KnowledgeNode }>();
</script>

<template>
  <li class="tree-item" v-if="node">
    <template v-if="node.type === 'breed'">
      <div class="tree-item__content is-breed">🐶 {{ node.text }}</div>
    </template>

    <template v-else>
      <div class="tree-item__content is-question">❓ {{ node.text }}</div>
      <ul class="tree-item__children">
        <li class="tree-branch tree-branch--yes">
          <span class="tree-branch__label">Да</span>
          <TreeItem v-if="node.yes" :node="node.yes" />
        </li>
        <li class="tree-branch tree-branch--no">
          <span class="tree-branch__label">Нет</span>
          <TreeItem v-if="node.no" :node="node.no" />
        </li>
      </ul>
    </template>
  </li>
</template>

<style scoped lang="scss">
.tree-item {
  list-style: none;

  &__content {
    padding: 8px 12px;
    border-radius: 8px;
    margin-bottom: 5px;
    display: inline-block;
    font-size: 0.9rem;
    font-weight: 600;

    &.is-breed {
      background-color: #e8f5e9;
      color: #2e7d32;
      border: 1px solid #c8e6c9;
    }

    &.is-question {
      background-color: #fff3e0;
      color: #ef6c00;
      border: 1px solid #ffe0b2;
    }
  }

  &__children {
    padding-left: 20px;
    list-style: none;
    border-left: 2px solid #eee;
    margin: 0 0 0 10px;
  }
}

.tree-branch {
  margin-top: 10px;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    left: -20px;
    top: 12px;
    width: 15px;
    height: 2px;
    background-color: #eee;
  }

  &__label {
    font-size: 0.75rem;
    text-transform: uppercase;
    font-weight: bold;
    margin-right: 5px;
    display: block;
    margin-bottom: 3px;
  }

  &--yes .tree-branch__label {
    color: var(--primary-color);
  }
  &--no .tree-branch__label {
    color: var(--danger-color);
  }
}
</style>
