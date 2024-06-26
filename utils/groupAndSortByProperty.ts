import exp from 'node:constants';

export function groupAndSortByProperty<T>(arr: T[], property: keyof T): T[][] {
  // Step 1: Group by the specified property
  const grouped = arr.reduce((acc: { [key: string]: T[] }, obj: T) => {
    const key = String(obj[property]);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

  // Step 2: Sort each group alphabetically by the property
  for (let key in grouped) {
    grouped[key].sort((a, b) => String(a[property]).localeCompare(String(b[property])));
  }

  // Step 3: Convert the grouped object into a 2D array and sort the outer array alphabetically by the property
  return Object.keys(grouped)
    .sort((a, b) => a.localeCompare(b))
    .map(key => grouped[key]);
}