import { defineComponent, ref, Teleport, Transition, watch } from 'vue'
import createStyleElement from './createStyleElement'

const Animate_Duration = 200

export const VueDialog = defineComponent({
  name: 'VueDialog',
  props: {
    open: {
      type: Boolean,
      default: () => false,
    },
    cacheChild: {
      type: Boolean,
      default: () => false,
    },
  },
  setup(props, { slots }) {
    const bgOpen = ref(false)

    let timerId: number | null = null
    let styleElement: HTMLStyleElement | null = null
    let isFirst = true

    watch(
      () => props.open,
      (_open) => {
        if (timerId) {
          clearTimeout(timerId)
          timerId = null
        }
        if (_open) {
          styleElement = createStyleElement()
          bgOpen.value = true
          styleElement && document.head.appendChild(styleElement)
        }
        else {
          if (!isFirst) {
            timerId = window.setTimeout(() => {
              bgOpen.value = false
              styleElement?.remove()
              styleElement = null
            }, Animate_Duration)
          }
        }

        isFirst = false
      },
      {
        immediate: true,
      },
    )

    return () => (
      <Teleport to="body">
        <section class="rt_dialog" style={{ display: bgOpen.value ? '' : 'none' }}>
          <Transition
            enter-active-class="rt_animated rt_animate_zoomIn"
            leave-active-class="rt_animated rt_animate_zoomOut"
          >

            {
              props.cacheChild
                ? (
                    <div v-show={props.open} style={{ width: '100%', height: '100%' }}>
                      {slots.default?.()}
                    </div>
                  )
                : (props.open && slots.default?.())
            }

          </Transition>
        </section>
      </Teleport>
    )
  },
})
