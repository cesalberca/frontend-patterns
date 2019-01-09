export async function wait(seconds: number): Promise<void> {
  return new Promise(resolve => {
    window.setTimeout(() => {
      resolve()
    }, seconds * 1000)
  })
}

export async function waitUntilOr(seconds: number, value: () => boolean): Promise<void> {
  return new Promise(resolve => {
    let hasValueChanged = false
    let hasTimeoutRanOut = false

    window.setTimeout(() => {
      hasTimeoutRanOut = true
    }, seconds * 1000)

    const interval = window.setInterval(() => {
      hasValueChanged = value()

      if (hasValueChanged || hasTimeoutRanOut) {
        resolve()
        window.clearInterval(interval)
      }
    }, 100)

  })
}
