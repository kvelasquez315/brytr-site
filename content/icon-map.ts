/* THE ICON SET IS GONE. THIS FILE IS NOW ONLY A TYPE.
 *
 * The client: "I don't think we should be using icons at all. I would rather we bring our own
 * visual sense to it with our images and how we have the site designed, rather than using these
 * icons that look very AI and not great. I can't even tell what's going on with them."
 *
 * He is right, and the second sentence is the diagnosis. These were twenty-eight abstract
 * pictograms - wholeHome, twoTiers, dayNight, weatherSealed, hoaPaperwork - drawn to carry ideas
 * that no 24px glyph can carry. A reader does not decode "two tiers" or "weather sealed" from a
 * shape; they read the label underneath, which means the glyph was decoration occupying the most
 * prominent position in every row it appeared in.
 *
 * So nothing renders one any more, on any page, and components/icons/index.tsx - 479 lines of
 * them - is deleted. What is left is the NAME, because `icon` is still a field on every service,
 * system and offering in content/, and those keys are meaningful data: they say what KIND of thing
 * a service is, and a future design might key a photograph or a colour off them rather than a
 * drawing. Removing the field as well would be a content migration across four files to delete
 * information that costs nothing to keep.
 *
 * If a visual system does come back it should be photography, and it should be chosen here. */
export const iconKeys = [
  "wholeHome",
  "roofline",
  "christmas",
  "soffit",
  "pathLight",
  "hardscape",
  "pergola",
  "gameday",
  "seasonal",
  "commercial",
  "sceneStack",
  "schedule",
  "zones",
  "dimmer",
  "installCount",
  "stars",
  "hardHat",
  "twoTiers",
  "verified",
  "measured",
  "yearlyCost",
  "ladder",
  "financing",
  "sameDay",
  "hoaPaperwork",
  "warranty",
  "weatherSealed",
  "dayNight",
] as const;

export type IconKey = (typeof iconKeys)[number];
