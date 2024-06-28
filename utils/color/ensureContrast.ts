// Function to convert RGBA to its RGB components
function rgbaToRgb(rgba: string): [number, number, number, number] {
  const match = rgba.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+),\s*(\d+(\.\d+)?)\)$/);
  if (!match) {
    throw new Error('Invalid RGBA color');
  }
  return [
    parseInt(match[1], 10),
    parseInt(match[2], 10),
    parseInt(match[3], 10),
    parseFloat(match[4])
  ];
}

// Function to calculate the relative luminance of a color
function luminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Function to calculate the contrast ratio between two colors
function contrastRatio(rgba1: string, rgba2: string): number {
  const [r1, g1, b1] = rgbaToRgb(rgba1);
  const [r2, g2, b2] = rgbaToRgb(rgba2);
  const lum1 = luminance(r1, g1, b1) + 0.05;
  const lum2 = luminance(r2, g2, b2) + 0.05;
  return lum1 > lum2 ? lum1 / lum2 : lum2 / lum1;
}

// Function to adjust the brightness of a color
function adjustBrightness(rgba: string, factor: number): string {
  const [r, g, b, a] = rgbaToRgb(rgba);
  const newR = Math.min(255, Math.max(0, r + factor * 255));
  const newG = Math.min(255, Math.max(0, g + factor * 255));
  const newB = Math.min(255, Math.max(0, b + factor * 255));
  return `rgba(${newR}, ${newG}, ${newB}, ${a})`;
}

// Ensure colors have sufficient contrast
export function ensureContrast(bgColor: string, textColor: string, minContrast: number = 4.5): [string, string] {
  let contrast = contrastRatio(bgColor, textColor);
  let adjustedTextColor = textColor;
  let adjustedBgColor = bgColor;

  if (contrast < minContrast) {
    adjustedTextColor = adjustBrightness(textColor, 0.2);
    contrast = contrastRatio(bgColor, adjustedTextColor);
    if (contrast < minContrast) {
      adjustedBgColor = adjustBrightness(bgColor, -0.2);
    }
  }

  return [adjustedBgColor, adjustedTextColor];
}
