export function stringToColor(str: string, brightness: number = 50, opacity: number = 1): string {
  if (!str.trim().length) throw new Error('Invalid input string');

  const trimmedStr = str.trim();
  const firstChar = trimmedStr[0].toLowerCase();
  const charCode = firstChar.charCodeAt(0);

  // Generate a consistent hex color based on the first character's ASCII value
  const baseHue = (charCode - 97) * 14; // 'a' -> 0, 'b' -> 14, ..., 'z' -> 364
  const saturation = 70; // Fixed saturation for a nice color palette
  const lightness = brightness; // Use the brightness parameter

  // Ensure opacity is between 0 and 1
  const clampedOpacity = Math.max(0, Math.min(1, opacity));

  // Convert HSL to RGBA
  function hslToRgba(h: number, s: number, l: number, a: number): string {
    s /= 100;
    l /= 100;
    const k = (n: number) => (n + h / 30) % 12;
    const aCoefficient = s * Math.min(l, 1 - l);
    const f = (n: number) =>
      l - aCoefficient * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
    const to255 = (x: number) => Math.round(x * 255);
    return `rgba(${to255(f(0))}, ${to255(f(8))}, ${to255(f(4))}, ${a})`;
  }

  return hslToRgba(baseHue, saturation, lightness, clampedOpacity);
}
