import Image from "next/image";
import { images, type Slot } from "@/content/images";
import { cn } from "@/lib/utils";

const ratioClass: Record<Slot["ratio"], string> = {
  "16/9": "aspect-video",
  "4/3": "aspect-4/3",
  "21/9": "aspect-21/9",
  "3/4": "aspect-3/4",
  "4/5": "aspect-4/5",
  "1/1": "aspect-square",
};

/** Renders a real photo, or null if the slot is unfilled.
 *  Callers must handle null with a designed no-photo layout — never a grey box. */
export function Photo({
  slot,
  className,
  ratio,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  slot: string;
  className?: string;
  /** override the slot's own ratio when a layout needs a taller or wider crop */
  ratio?: Slot["ratio"];
  sizes?: string;
}) {
  const s = images[slot];
  if (!s?.src) return null;
  return (
    <div className={cn("relative overflow-hidden rounded-lg", ratioClass[ratio ?? s.ratio], className)}>
      <Image
        src={s.src}
        alt={s.alt}
        fill
        sizes={sizes}
        priority={s.priority}
        className="object-cover"
      />
    </div>
  );
}

export function photoExists(slot?: string) {
  return !!(slot && images[slot]?.src);
}
