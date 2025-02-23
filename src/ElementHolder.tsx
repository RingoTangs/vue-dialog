import type { VNode } from 'vue'
import { defineComponent, shallowRef } from 'vue'

type Ele = (() => VNode) | null

export interface ElementHolderRef {
  setElement: (element: Ele) => void
}

export const ElementHolder = defineComponent({
  name: 'ElementHolder',
  setup(_, { expose }) {
    const elementSRef = shallowRef<Ele>()

    expose({
      setElement: (element: Ele) => elementSRef.value = element,
    })

    return () => {
      return (
        <>
          {elementSRef.value?.()}
        </>
      )
    }
  },
})
