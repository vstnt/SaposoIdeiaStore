  // Limita a descrição pelo número de caracteres
  export const truncateCharacters = (description: string, maxChars: number) => {
    if (description.length > maxChars) {
      return description.slice(0, maxChars) + '...';
    }
    return description;
  };

  // Limita a descrição pelo número de palavras
  export const truncateWords = (description: string, maxWords: number) => {
    const words = description.split(' ');
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    return description;
  };
