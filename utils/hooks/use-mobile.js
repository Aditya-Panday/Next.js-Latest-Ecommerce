"use client";

import { useState, useEffect } from "react";

export function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false); // State to track if the device is mobile

  useEffect(() => {
    if (typeof window === "undefined") return; // Prevent running on the server

    setIsMobile(window.innerWidth < breakpoint); // Set initial value based on window width

    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint); // Update state when window resizes
    };

    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Cleanup event listener on unmount
    };
  }, [breakpoint]); // Runs when `breakpoint` value changes

  return isMobile; // Returns true if screen width is less than the breakpoint, else false
}
