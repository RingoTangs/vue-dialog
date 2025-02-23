# vue-dialog

Imperative dialog component for Vue 3.x.

## Features
- Easy to use and integrate.
- Custom your dialogs.
- Support Imperative dialog component.

## Installation

```bash
npm install @ringotangs/vue-dialog
```

```typescript
// main.ts
import '@ringotangs/vue-dialog/style.css'
```

## Basic Example

```vue
<script setup lang="ts">
import { VueDialog } from '@ringotangs/vue-dialog'
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
  <div>
    <button type="button" @click="open = !open">
      按钮
    </button>
    <VueDialog :open="open">
      <div @click="open = false">
        Inner
      </div>
    </VueDialog>
  </div>
</template>
```

## Imperative Dialog

1. Custom Dialog

```vue
<script setup lang="ts">
// HelloModal
import { VueDialog } from '@ringotangs/vue-dialog'
import { Input } from 'ant-design-vue'

// Note: use custom dialog, must has open prop
const props = defineProps<{ open: boolean, inputText: string }>()
const emits = defineEmits<{
  (e: 'close'): void
  (e: 'update:inputText', value: string): void
}>()
</script>

<template>
  <VueDialog :open="props.open" cache-child>
    <div class="w-full h-full flex items-center justify-around">
      <div class="w-200px h-200px bg-red">
        <Input
          placeholder="请输入文本内容"
          :value="props.inputText"
          @change="(e) => emits('update:inputText', (e.target as HTMLInputElement).value)"
        />
        <button type="button" @click="() => emits('close')">
          关闭
        </button>
      </div>
    </div>
  </VueDialog>
</template>
```

2. import useDialog hook

```tsx
// useHelloModal
import { useDialog } from '@ringotangs/vue-dialog'
import { ref } from 'vue'
import HelloModal from './HelloModal.vue'

export function useHelloModal() {
  const [dialog, holder] = useDialog()
  const inputText = ref('')

  const show = () => {
    dialog.show(
      HelloModal,
      {
        'onClose': () => {
          dialog.close()
        },
        'inputText': inputText.value,
        'onUpdate:inputText': val => inputText.value = val,
      }
    )
  }

  return [{ show }, holder] as const
}
```

3. use custom hook

```vue
<script setup lang="ts">
import { useHelloModal } from './components/useHelloModal'
const [helloModal, ModalHolder] = useHelloModal()
</script>

<template>
  <div class="h-2000px">
    <button type="button" @click="() => helloModal.show()">
      按钮
    </button>
    <ModalHolder />
  </div>
</template>
```

## Note

1. When using imperative dialogs, custom components must include the `open` attribute.
2. In VueDialog, setting `cache-child`  prop means that child nodes will not be re-rendered.
