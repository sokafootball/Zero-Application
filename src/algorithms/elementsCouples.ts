export const getElementsCouples = (
  array: unknown[]
): (unknown[] | unknown)[] => {
  const pairs: (unknown[] | unknown)[] = [];
  const availableElements = [...array];

  while (availableElements.length >= 2) {
    const index1 = Math.floor(Math.random() * availableElements.length);
    let index2 = Math.floor(Math.random() * availableElements.length);
    while (index2 === index1) {
      index2 = Math.floor(Math.random() * availableElements.length);
    }

    const element1 = availableElements[index1];
    const element2 = availableElements[index2];
    pairs.push([element1, element2]);

    if (index1 > index2) {
      availableElements.splice(index1, 1);
      availableElements.splice(index2, 1);
    } else {
      availableElements.splice(index2, 1);
      availableElements.splice(index1, 1);
    }
  }

  if (availableElements.length === 1) {
    pairs.push(availableElements[0]);
  }

  return pairs;
};
