import exp from 'node:constants';

export function groupAndSortByProperty<T>(arr: T[], groupBy: keyof T, sortGroupBy?: keyof T): T[][] {
  // Step 1: Group by the specified property
  const grouped = arr.reduce((acc: { [key: string]: T[] }, obj: T) => {
    const key = String(obj[groupBy]);
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
  // Step 2: Sort each group alphabetically by the property
  for (let key in grouped) {
    const sortProp = !sortGroupBy ? groupBy : sortGroupBy
    grouped[key].sort((a, b) => String(a[sortProp]).localeCompare(String(b[sortProp])));
  }
  // Step 3: Convert the grouped object into a 2D array and sort the outer array alphabetically by the property
  return Object.keys(grouped)
    .sort((a, b) => a.localeCompare(b))
    .map(key => grouped[key]);
}