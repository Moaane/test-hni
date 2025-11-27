export function debounce(fn: (...args: any[]) => void, delay = 300) {
  let timer: any
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
