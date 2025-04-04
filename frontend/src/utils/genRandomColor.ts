/**
 * Generates a random color that is readable (not too light, dark, or gray)
 * @returns {string} A hexadecimal color code
 */
export function generateRandomReadableColor() {
  // Min and max values for RGB components to ensure readability
  const MIN_VALUE = 30;  // Not too dark
  const MAX_VALUE = 220; // Not too light
  const SATURATION_THRESHOLD = 30; // To avoid gray colors
  
  let r = 0, g = 0, b = 0;
  let isReadable = false;
  
  while (!isReadable) {
    // Generate random RGB values within our range
    r = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE);
    g = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE);
    b = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1) + MIN_VALUE);
    
    // Calculate max difference between RGB components to check for grayness
    const maxDiff = Math.max(
      Math.abs(r - g),
      Math.abs(r - b),
      Math.abs(g - b)
    );
    
    // Check if color is not too gray
    if (maxDiff >= SATURATION_THRESHOLD) {
      isReadable = true;
    }
  }
  
  // Convert to hex format
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

// Example usage
// const color = generateRandomReadableColor();
// console.log(color);