function getPluralSuffix(count: number): string {
  return count > 1 ? 's' : '';
}

function getRandomElement(array: string[]): string {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export { getPluralSuffix, getRandomElement };
