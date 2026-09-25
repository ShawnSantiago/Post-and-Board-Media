# Image prompts — Post and Board Media

Prompts for generating photography-style images for the website. They work with most tools (Midjourney, DALL·E / ChatGPT, Imagen, Firefly, Ideogram, Flux). Paste the **style block** and the **negative prompt** alongside each image prompt.

The site currently uses drawn SVG mockups (`src/components/mockups/`). These images add real-world warmth around them. They don't replace the labelled example layouts.

---

## Rules before you generate

These follow the site's honesty rules. Please don't skip them.

1. **No readable text or logos in generated images.** Image tools misspell text, and invented brand names could look like real businesses. Keep boards and postcards blank or abstract (coloured blocks), then overlay the real SVG layout afterwards (see *Compositing* below).
2. **No real places or businesses.** Don't prompt for named cafés, streets or landmarks ("Locke Street", "Hamilton waterfront"). A recognisable venue could imply a partnership that doesn't exist.
3. **No Canada Post branding.** No red Canada Post mailboxes, logos, trucks or uniforms.
4. **No digital screens.** Digital advertising is a future interest-only option. Don't show screens as if they're installed.
5. **No fake social proof.** No crowds admiring a board, no "results" imagery, no charts, no dashboards, no people pointing at graphs.
6. **People are optional and never the focus.** Prefer hands, backs of heads or out-of-focus figures. Don't generate a face and present it as Shawn, a client or a host.
7. **Label images that show a board or mailer in use** with a small caption such as *"Illustrative image"* (the same idea as "Example layout").

---

## Style block (append to every prompt)

```
Editorial documentary photography, natural window light, warm and calm, shallow depth of field, 35mm lens, true-to-life colours, slightly muted, subtle film grain. Colour palette leans toward ink navy (#1C2A44), brick red (#C8452F), mustard yellow (#E9B949) and warm off-white paper (#F7F3EA), with natural wood and brick tones. Uncluttered composition with generous negative space. Real, lived-in local business, not a staged ad shoot.
```

## Negative prompt (use where the tool supports it)

```
text, letters, words, numbers, logos, brand names, watermarks, signage with writing, Canada Post, red mailbox, maple leaf logo, digital screen, TV, monitor, tablet display, charts, graphs, dashboard, laptop screen, people pointing, stock photo smile, thumbs up, crowd, blue purple gradient, neon, futuristic, 3D render, cartoon, CGI, oversaturated, HDR, distorted hands, extra fingers
```

For tools without a negative prompt field (e.g. ChatGPT or DALL·E), add this to the end of the prompt: *"No readable text, logos or brand names anywhere in the image. No screens, charts, or Canada Post branding."*

---

## Images

Each entry lists the suggested file name, where it goes, the aspect ratio and the alt text. Put finished files in `src/assets/images/` so Astro can optimise them.

### 1. Homepage hero: board inside a café
- **File:** `hero-cafe-board.jpg` · **Ratio:** 4:3 (Midjourney `--ar 4:3`) · **Min size:** 2000 px wide
- **Where:** homepage hero, behind or beside the existing board and postcard mockup.

```
Interior of a small independent neighbourhood café in the morning, a wall-mounted rectangular board in a dark walnut frame hangs beside the order counter at eye level. The board's upper two-thirds is a solid deep navy panel, the lower third is divided into four equal blank pastel rectangles (mustard, off-white, pale blue-grey, brick red) with no writing. Espresso machine softly out of focus, ceramic cups, a potted plant, exposed brick and warm wood. One customer's shoulder blurred in the foreground. Camera slightly angled, board clearly visible and flat enough to overlay artwork later.
```
- **Alt text:** "Illustrative image of a café with a specials board beside the counter, with a section for local advertisers."

### 2. Board close-up, straight on
- **File:** `board-straight-on.jpg` · **Ratio:** 3:4 portrait · **Where:** `/advertising-boards` hero or the "How a board is laid out" section.

```
Straight-on, front-facing photo of a framed rectangular board mounted on a painted plaster wall inside a small restaurant. Dark walnut wooden frame. Top two-thirds is a smooth matte deep navy surface, bottom third split into four equal blank rectangular panels in mustard, warm white, pale blue-grey and brick red, separated by thin gaps. No writing on any surface. Soft side light from a window, a pendant lamp edge at the top of the frame, a sliver of a wooden counter at the bottom. Perfectly level, minimal perspective distortion.
```
- **Alt text:** "Illustrative image of an advertising board with a large host area and four advertiser panels."
- **Tip:** this image is designed to have the real `BoardMockup` SVG overlaid on the board face.

### 3. Shared mailer arriving at home
- **File:** `mailer-at-door.jpg` · **Ratio:** 3:2 · **Where:** `/shared-mailers` hero or the homepage "Delivered to a defined area" card.

```
Close-up of a person's hands holding a glossy postcard just taken from a residential wall-mounted mail slot on a painted front door, autumn light, a doormat and potted mums blurred in the background. The postcard face shows a navy header band and a neat grid of six blank coloured rectangles (mustard, pale blue-grey, blush pink, warm white, navy) with no writing. Hands natural and relaxed, cozy knit sleeve. Generic residential Ontario-style home, no house numbers visible.
```
- **Alt text:** "Illustrative image of hands holding a shared postcard from a front-door mail slot."

### 4. Mailer flat lay
- **File:** `mailer-flatlay.jpg` · **Ratio:** 16:9 · **Where:** the shared-mailers "Front and back" section, or a social preview background.

```
Overhead flat lay on a light oak kitchen table: a small fanned stack of identical postcards, each with a navy header band and a grid of blank coloured ad panels (mustard, pale blue-grey, blush, warm white, navy), no text. A mug of coffee, a pair of reading glasses, a folded tea towel in navy and white stripes, morning sunlight casting soft shadows. Lots of empty table space on the right side for headline text.
```
- **Alt text:** "Illustrative image of a stack of shared postcards on a kitchen table."

### 5. Business-address mailer on a reception desk
- **File:** `mailer-business-desk.jpg` · **Ratio:** 3:2 · **Where:** the shared-mailers "Business-address campaigns" card.

```
A small stack of postcards and envelopes resting on the reception counter of a light-industrial small business office, a bell, a pen cup and a plant nearby, windows with soft daylight, exposed ductwork softly out of focus. The top postcard shows a navy header band and blank coloured rectangles, no writing. Calm, practical, everyday workplace.
```
- **Alt text:** "Illustrative image of mail, including a shared postcard, on a business reception counter."

### 6. Host venue: owner's hand updating the specials area
- **File:** `host-updating-board.jpg` · **Ratio:** 4:3 · **Where:** `/host-a-board` hero, or the homepage "Give your specials a better home" section.

```
Behind-the-counter view in a neighbourhood café: a café owner's hand, apron visible, writing on the upper navy section of a wall-mounted board with a white liquid chalk marker, the stroke still abstract (no readable words). The lower section of the board has four blank coloured advertiser panels. Pastry case and coffee grinder softly blurred. Warm, unhurried, early morning before opening.
```
- **Alt text:** "Illustrative image of a café owner updating the specials area of a board."
- **Note:** only use this if hosts will update their area with a marker. If the host area ends up printed, use image 2 instead so the site doesn't promise something the product doesn't do.

### 7. About page: organised by a real person
- **File:** `about-desk.jpg` · **Ratio:** 3:2 · **Where:** `/about`, replacing or sitting beside the brand-mark panel.

```
Top-down view of a tidy work desk: printed proof sheets of postcard layouts with blank coloured blocks, a steel ruler, a pencil, a cutting mat, paper colour swatches in navy, brick red and mustard, a paper calendar with blank squares, a cup of tea. One hand holding a pencil near a proof, face not visible. Daylight from a window, calm and organised.
```
- **Alt text:** "Desk with postcard layout proofs, colour swatches and a ruler."

### 8. Paper texture (background)
- **File:** `paper-texture.jpg` · **Ratio:** square, tileable · **Where:** optional subtle background on cream sections, at 5–8% opacity.

```
Seamless tileable texture of warm off-white uncoated paper stock, very fine fibres, subtle tooth, even flat lighting, no shadows, no folds, no marks.
```
- **Alt text:** none (decorative). Use it as a CSS background, not an `<img>`.

### 9. Social share image (Open Graph)
Don't generate the whole card with AI, because it would mangle the name and tagline. Instead:
1. Generate image 4 (flat lay) with empty space on one side.
2. In Figma or Canva, place it at **1200 × 630**, add the wordmark and *"Shared space. Local reach."* in Fraunces and Inter, and keep text 60 px or more from the edges.
3. Save as `public/og-image.jpg`. I can add the `og:image` meta tag when it's ready.

---

## Area pages

Skip generated images for Hamilton, Burlington and Oakville. A fake "Hamilton street" either looks generic or looks like a real street that isn't one, and area pages should earn trust with accurate information. If you want visuals later, use **your own photos** of real public streetscapes (no identifiable people or business signage implying a partnership).

---

## Compositing the real layout onto generated boards and postcards

Generated images keep boards and postcards blank so the actual design can go on top, with correct text and fictional business names:

1. Export the mockup: open the page in a browser, right-click the board or postcard SVG and use *Copy image*, or render `BoardMockup` / `PostcardMockup` to PNG.
2. In Photoshop, Affinity or Photopea: paste it as a layer, use **Free Transform → Perspective / Distort** to match the board's corners, and set the blend mode to *Multiply* at about 90% for a printed look.
3. Add a soft shadow and a little noise so it sits in the photo.
4. Keep the caption *"Illustrative image"* on the page.

---

## Quick checklist for each image

- [ ] No readable text, logos, brand names or real places
- [ ] No Canada Post, no screens, no charts
- [ ] Faces absent or unidentifiable
- [ ] Hands and fingers look natural
- [ ] Colours sit comfortably with navy, brick, mustard and paper
- [ ] At least 2000 px on the long side, exported as JPG (quality 80–85) or WebP
- [ ] Alt text written, and captioned "Illustrative image" where it shows a board or mailer in use
- [ ] You have the right to use it commercially under the tool's licence
