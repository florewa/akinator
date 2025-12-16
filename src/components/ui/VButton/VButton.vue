<script setup lang="ts">
type Variant = "primary" | "secondary" | "danger" | "ghost";

interface Props {
  variant?: Variant;
  icon?: string;
}

const props = withDefaults(defineProps<Props>(), {
  variant: "primary",
});
</script>

<template>
  <button :class="['v-button', `v-button--${props.variant}`]">
    <span v-if="props.icon" class="v-button__icon">{{ icon }}</span>
    <span class="v-button__text"><slot /></span>
  </button>
</template>

<style scoped lang="scss">
.v-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  font-family: inherit;
  font-weight: 700;
  font-size: 1rem;
  line-height: 100%;
  border-radius: 16px;
  padding: 16px 32px;
  cursor: pointer;
  border: none;
  transition: all 0.2s ease;
  width: 100%;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
  }

  &--primary {
    color: var(--just-white);
    background: var(--accent);
    &:hover {
      background: var(--accent-dark);
    }
  }

  &--secondary {
    border: 2px solid var(--accent);
    color: var(--accent);
    background: transparent;
    &:hover {
      background: rgba(108, 99, 255, 0.05);
    }
  }

  &--danger {
    background: #ffebee;
    color: var(--danger);
    &:hover {
      background: var(--danger);
      color: white;
    }
  }

  &--ghost {
    color: #888;
    padding: 12px;
    background: rgba(0, 0, 0, 0.1);

    &:hover {
      color: var(--text-main);
      background: rgba(0, 0, 0, 0.2);
    }
  }

  &__icon {
    font-size: 1.2em;
  }
}
</style>
