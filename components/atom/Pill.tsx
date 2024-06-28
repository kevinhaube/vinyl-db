import { stringToColor } from '@/utils/color/stringToColor';
import { ensureContrast } from '@/utils/color/ensureContrast';

const Pill = ({ text, className }: { text: string, className?: string }) => {
  let pillBg = stringToColor(text, 60, 0.8);
  let pillAccent = stringToColor(text, 70);
  [pillBg, pillAccent] = ensureContrast(pillBg, pillAccent);
  const dynamicStyles = {
    backgroundColor: pillBg,
    borderColor: pillAccent,
    color: pillAccent,
  };
  return (
    /* any bg, border, text, or padding attributes given in `className`
     *  will override the default `millennialGray` */
    <span
        className={`rounded-full whitespace-nowrap border-2 text-sm px-3 py-1 ${className}`}
        style={dynamicStyles}
    >
        {text}
    </span>
  )
}

export default Pill