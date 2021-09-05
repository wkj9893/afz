function color(start: number, end: number) {
  return (str: string) => {
    return `\x1b[${start}m${str}\x1b[${end}m`
  }
}

export const lightGreen = color(92, 39)
export const lightRed = color(91, 39)
