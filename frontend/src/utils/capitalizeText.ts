export const capitalizeText = (text: string): string => {
    return text
      .split(" ") // Divide el texto en palabras
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
      .join(" "); // Une las palabras de nuevo en un string
  }