import { useEffect, useState } from "react"
import { THEME } from "../constants"

const { breakpoints } = THEME

const useMedia = breakpoint => {
  const [matches, setMatches] = useState()

  const queries = Object.entries(breakpoints).reduce((acc, [breakpoint, width], index, array) => {
    let query = ""

    const [, previousWidth] = array[index - 1] || []
    const [, nextWidth] = array[index + 1] || []

    /*
      Construct a series of media queries in the form:
                               (max-width: 320px)
        (min-width: 321px) and (max-width: 600px)
        (min-width: 601px) and (max-width: 900px)
        (min-width: 901px)
    */

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

  useEffect(
    (breakpoint, queries) => {
      const mediaQueryList = window.matchMedia(queries[breakpoint])
      setMatches(mediaQueryList.matches)

      const handleChange = e => setMatches(e.matches)
      mediaQueryList.addListener(handleChange)
      return () => mediaQueryList.removeListener(handleChange)
    },
    [breakpoint, queries]
  )

  return matches
}

export default useMedia
