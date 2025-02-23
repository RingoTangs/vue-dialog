export default function createStyleElement() {
  const width = document.body.clientWidth || document.documentElement.clientWidth
  const scrollWidth = window.innerWidth - width
  const styleElement = document.createElement('style')
  styleElement.textContent = `html body {
      overflow-y: hidden;
      width: calc(100% - ${scrollWidth}px);
      }`

  return styleElement
}
