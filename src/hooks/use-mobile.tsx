
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkMobile = () => {
      const width = window.innerWidth
      setIsMobile(width < MOBILE_BREAKPOINT)
    }

    // Check on mount
    checkMobile()
    
    // Add event listener for resize with debounce for better performance
    let timeoutId: number | undefined
    const handleResize = () => {
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
      timeoutId = window.setTimeout(checkMobile, 100)
    }
    
    window.addEventListener("resize", handleResize)
    window.addEventListener("orientationchange", () => {
      // On orientation change, wait a bit to get accurate dimensions
      setTimeout(checkMobile, 100)
    })
    
    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("orientationchange", checkMobile)
      if (timeoutId) {
        clearTimeout(timeoutId)
      }
    }
  }, [])

  // Return false as a fallback if undefined (server-side rendering)
  return isMobile === undefined ? false : isMobile
}
