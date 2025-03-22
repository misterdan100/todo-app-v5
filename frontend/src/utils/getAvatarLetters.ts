export const getAvatarLetters = (name: string): string => {
    if (!name) return ""; // Handle empty or undefined names
  
    const words = name.trim().split(" ");
    if (words.length === 1) {
      // If it's a single word, return the first two letters
      return words[0].slice(0, 2).toUpperCase();
    }
  
    // If it's multiple words, return the first letter of the first two words
    return (words[0][0] + words[1][0]).toUpperCase();
  };