import { stringToColor } from '@/utils/color/stringToColor';
import { ensureContrast } from '@/utils/color/ensureContrast';

const Pill = ({ text, className }: { text: string, className?: string }) => {
  let pillBg = stringToColor(text, "last", 60, 0.8);
  let pillAccent = stringToColor(text, "last", 70);
  [pillBg, pillAccent] = ensureContrast(pillBg, pillAccent);
  const dynamicStyles = {
    backgroundColor: pillBg,
    borderColor: pillAccent,
    color: pillAccent,
  };
  return (
    <p
        className={`rounded-full whitespace-nowrap border-2 text-sm px-3 py-1 ${className}`}
        style={dynamicStyles}
    >
        {text}
    </p>
  )
}

export default Pill