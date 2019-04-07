import { useEffect, useState } from "react"
import { THEME } from "./constants"

const { breakpoints } = THEME

const useMedia = breakpoint => {

  const [matches, setMatches] = useState()

  const queries = Object.entries(breakpoints).reduce((acc, [breakpoint, width], index, array) => {

    let query = ""
  
    const [, previousWidth] = array[index - 1] || []
    const [, nextWidth] = array[index + 1] || []
  
    if (previousWidth) {
      query += `(min-width: ${previousWidth + 1}px)`
    }
  
    if (previousWidth && nextWidth) {
      query += " and "
    }
  
    if (nextWidth) {
      query += `(max-width: ${width}px)`
    }
  
    acc[breakpoint] = query
  
    return acc
  }, {})

  useEffect(() => {
    const mediaQueryList = window.matchMedia(queries[breakpoint])
    setMatches(mediaQueryList.matches)

    const handleChange = e => setMatches(e.matches)
    mediaQueryList.addEventListener("change", handleChange)
    return () => mediaQueryList.removeEventListener("change", handleChange)
  }, [breakpoint])

  return matches
}

export default useMedia
