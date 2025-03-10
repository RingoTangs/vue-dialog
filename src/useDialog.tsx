import type { Component, ExtractPublicPropTypes } from 'vue'
import type { ElementHolderRef } from './ElementHolder'
import { h, ref } from 'vue'
import { ElementHolder } from './ElementHolder'

type ExtractProps<T> = T extends Component<infer P> ?
  Partial<Omit<ExtractPublicPropTypes<P>, 'open'>> : never

type ComponentPropsOrFn<T> = ExtractProps<T> | (() => ExtractProps<T>)

interface ShowFn {
  <T extends Component<object & { open: boolean }>>(component: T, props: ComponentPropsOrFn<T>): void
}

export function useDialog() {
  const holderRef = ref<ElementHolderRef>()

  const open = ref(false)

  const close = () => {
    open.value = false
  }

  const show: ShowFn = (component, props) => {
    const getFinalProps = () => typeof props === 'function' ? props() : props
    const fc = () => h(component, { ...getFinalProps(), open: open.value })
    holderRef.value?.setElement(fc)
    setTimeout(() => open.value = true, 0)
  }

  return [{ show, close }, () => <ElementHolder ref={holderRef} />] as const
}
