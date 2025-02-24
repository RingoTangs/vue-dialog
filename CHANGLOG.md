# 2025-02-24

修复用户在使用 useDialog 时，如果使用响应式对象，无法响应式更新问题。
在调用 show 函数时, 传入的 props 是一个函数，返回一个对象，可以解决这个问题。

```typescript
function useCustomDialog() {
  const text = ref('hello')
  const dialog = useDialog()
  dialog.show(HelloComponent, () => {
    return {
      text: text.value
    }
  })
}
```
