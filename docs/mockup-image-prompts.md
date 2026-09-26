# Prompts to replace the drawn "Example layout" visuals

The site's example layouts are drawn in code, as SVG and CSS: the specials board, the shared postcards, the mailer back and the homepage hero stack. This file has prompts to recreate each one as a realistic AI-generated product image. For real-world scene photography (cafés, doorsteps, desks), see `image-prompts.md`.

---

## What gets replaced

| # | Replaces | Component | Where it appears | New file (`src/assets/images/examples/`) |
|---|---|---|---|---|
| 1 | Homepage hero stack (board + postcard) | `BoardMockup` + `PostcardMockup` | `/` hero | `hero-board-and-postcard.webp` |
| 2 | Specials board | `BoardMockup` | `/` options card, `/` host section, `/advertising-boards` hero | `example-board.webp` |
| 3 | Household postcard, front | `PostcardMockup` | `/` options card, `/shared-mailers` hero and front/back | `example-postcard-household.webp` |
| 4 | Business postcard, front | `PostcardMockup variant="business"` | `/` "Why shared advertising" | `example-postcard-business.webp` |
| 5 | Postcard, back | `MailerBackMockup` | `/shared-mailers` front/back | `example-postcard-back.webp` |
| 6 | "How a board is laid out" swatches | CSS `.anatomy__swatch` | `/advertising-boards` | `anatomy-host.webp`, `anatomy-ads.webp`, `anatomy-print.webp` |

**Keep in CSS, don't generate:** the brand mark and favicon (a logo must be exact vector), the CTA band's circle and square, the numbered step badges, chips and buttons. They're brand shapes, cost nothing to load, and stay sharp at any size.

---

## Choose an approach

### A. Blank panels plus live text overlay (recommended)
Generate each board or postcard with **every panel blank**. The site then lays the existing SVG text (business names, specials, "Your ad here") exactly over the panels.

- Spelling is always correct, and the text stays crisp and readable by screen readers.
- One image serves every variant. The "Your ad here" highlight moves between panels without regenerating.
- Fictional names can be changed later in code.

### B. Text rendered by the image model
Use a model that handles typography well (ChatGPT/GPT image, Ideogram, Imagen 3+, Flux 1.1 Pro). Paste the **Text to render** block for each image, then proofread every word. You'll need separate images for each "Your ad here" variant.

Each prompt below works for both. For **A**, use it as written. For **B**, append its *Text to render* block.

---

## Non-negotiables (both approaches)

1. Use **only** the fictional business names listed here. Reject any image where the model invents extra names, phone numbers, URLs, addresses, prices, QR codes or logos.
2. **No real brands**: no Canada Post indicia, logos or red mailboxes, and no real company or venue names.
3. **Layout proportions matter.** On boards, the host's specials area is the top **two-thirds** and advertisers share the bottom third in **four equal panels**. On postcards, the ad spaces are **equal, clearly separated** panels.
4. Images still go inside the site's **"Example layout"** label, and each one gets alt text (supplied below).
5. Never show a digital screen version.

---

## Master style block (append to every prompt)

```
Photorealistic product mockup photograph, printed matte card stock and a real wooden-framed board, soft diffused studio daylight from the upper left, gentle natural shadow, crisp edges, true-to-life colour. Brand palette: ink navy #1C2A44, brick red #C8452F, mustard #E9B949, pale blue-grey #DDE4EE, blush #F6DCD5, warm off-white #FFFCF6, background seamless warm paper #F7F3EA. Clean, calm, premium but approachable, like a small print studio's portfolio shot. Straight-on or very slight angle, nothing cropped, generous even margin around the object.
```

## Negative prompt

```
extra text, invented names, gibberish lettering, misspelled words, phone numbers, URLs, prices, QR codes, barcodes, logos, Canada Post, postage indicia, stamps with country names, digital screen, monitor, hands, people, clutter, busy background, dramatic shadows, vignette, fisheye, heavy perspective, 3D render look, cartoon, glossy plastic, neon, gradients
```

For approach **A**, add `any text at all, letters, words` to the negative prompt.

---

## 1. Homepage hero: board and postcard together
- **File:** `hero-board-and-postcard.webp` · **Ratio:** 1:1 (`--ar 1:1`) · **Size:** 2000 × 2000
- **Alt:** "Example layout: a specials board with four advertiser panels, and a shared postcard with six advertiser spaces."

```
Product mockup composition on a seamless warm paper background: on the left, slightly rotated counter-clockwise, a portrait wooden-framed specials board (dark walnut frame). The board's upper two-thirds is a deep ink-navy panel with a thin dotted mustard divider line under a title area; the lower third is a warm off-white band holding four equal rectangular advertiser panels in a 2 × 2 grid — mustard, off-white, pale blue-grey and brick red — with small gaps between them. Overlapping the board's lower right corner, slightly rotated clockwise, lies a landscape postcard: a navy header band across the top and a 3 × 2 grid of six equal advertiser panels below in pale blue-grey, off-white, mustard, blush, off-white and navy. Soft shadows ground both objects; the postcard casts a light shadow onto the board frame.
```

<details><summary>Text to render (approach B)</summary>

```
Board title (centred, elegant serif, cream on navy): "Today's Specials"
Board specials, left column / right column (small sans, cream / mustard):
  "Soup of the day" — "Squash & ginger"
  "Breakfast wrap" — "Until 11 am"
  "Iced maple latte" — "Seasonal"
  "Trivia night" — "Thursdays"
Board footer line (italic serif, pale): "Ask us about catering"
Advertiser band label (tiny caps, grey): "LOCAL BUSINESSES"
Board ad panels (small caps category / serif name / small sans line):
  mustard:   "BAKERY" / "Maple & Rye" / "Fresh bread daily"
  off-white: "REPAIR SHOP" / "Northend Bikes" / "Tune-ups & repairs"
  blue-grey: "EYE CARE" / "Clearview" / "Booking eye exams"
  brick red (white text): "PLUMBING" / "Harbourline" / "Licensed & local"
Postcard header (serif, white on navy): "Good neighbours, nearby"   right side tiny mustard caps: "SHARED MAILER"
Postcard panels: "LANDSCAPING / Greenway Yards / Spring clean-ups", "DENTAL / Brightside / New patients welcome", "PIZZERIA / Corner Slice / Order for pickup", "PET GROOMING / Tidy Paws / Walk-ins on Saturdays", "TUTORING / Northstar / Grades 1 to 12", "HVAC / Steadyheat / Furnace tune-ups" (white text on navy)
No other text anywhere.
```
</details>

---

## 2. Specials board (straight on)
- **File:** `example-board.webp` · **Ratio:** 12:17 portrait (`--ar 12:17`, or 2:3 if unsupported) · **Size:** 1200 × 1700
- **Alt:** "Example layout of an advertising board: the venue's specials take the top two-thirds and four local advertisers share the bottom section."

```
Straight-on product photograph of a portrait wall board in a dark walnut wooden frame, centred on a seamless warm paper background with a soft shadow beneath. Inside the frame: the upper two-thirds is a smooth matte deep ink-navy surface with a thin dotted mustard line near the top where a title would sit; the lower third is a warm off-white band containing four equal rectangular advertiser panels in a 2 × 2 grid with narrow even gaps — top-left mustard, top-right off-white, bottom-left pale blue-grey, bottom-right brick red — each with softly rounded corners and a hairline border. Perfectly level, no perspective distortion, frame fully in view.
```

<details><summary>Text to render (approach B)</summary>

Use the **board** lines from image 1. For a "Your ad here" variant, replace one panel with: *a white panel with a dashed brick-red outline, centred serif "Your ad here", small grey "One defined space"*. Generate one variant per position you need: the homepage uses the top-right panel, `/advertising-boards` the bottom-left.
</details>

---

## 3. Shared postcard, household (front)
- **File:** `example-postcard-household.webp` · **Ratio:** 8:5 (`--ar 8:5`) · **Size:** 1600 × 1000
- **Alt:** "Example layout of a shared postcard: a header and six equal, clearly separated spaces for local businesses."

```
Top-down product photograph of a single landscape postcard on matte card stock lying flat on a seamless warm paper background, soft natural shadow. A solid ink-navy header band runs across the top fifth. Below it, a 3 × 2 grid of six equal rectangular advertiser panels with even gutters, each with slightly rounded corners and a hairline warm-grey border: row one pale blue-grey, off-white, mustard; row two blush pink, off-white, ink navy. Each panel has a small solid coloured dot in its top-left corner. Clean white margin around the grid. Card perfectly square to the camera.
```

<details><summary>Text to render (approach B)</summary>

Postcard lines from image 1. "Your ad here" variants: the homepage uses the bottom-middle panel; `/shared-mailers` uses the top-right panel.
</details>

---

## 4. Shared postcard, business addresses (front)
- **File:** `example-postcard-business.webp` · **Ratio:** 8:5 · **Size:** 1600 × 1000
- **Alt:** "Example layout of a business-address shared postcard with six separate spaces for business-to-business services."

Same prompt as image 3. For approach A, reuse image 3 itself; only the overlay text differs.

<details><summary>Text to render (approach B)</summary>

```
Header (serif, white on navy): "Local services for your business"   right: "SHARED MAILER"
Panels (category / name / line):
  blue-grey: "OFFICE CLEANING" / "Brightline" / "Evening crews"
  off-white: "IT SUPPORT" / "Keystone IT" / "Small-office help"
  mustard:   "CATERING" / "Longtable" / "Team lunches"
  blush:     "SIGNAGE" / "Tallpost Signs" / "Storefront signs"
  off-white: "BOOKKEEPING" / "Ledgerwise" / "Monthly bookkeeping"
  navy (white text): "COURIER" / "Quickstep" / "Same-day local runs"
No other text anywhere.
```
</details>

---

## 5. Shared postcard (back)
- **File:** `example-postcard-back.webp` · **Ratio:** 8:5 · **Size:** 1600 × 1000
- **Alt:** "Example layout of the back of a shared postcard: three more ad spaces on the left and a blank address and postage area on the right."

```
Top-down product photograph of the back of a landscape postcard on matte card stock, flat on a seamless warm paper background, soft shadow. Left half: three equal horizontal advertiser panels stacked vertically with even gaps — blush pink, pale blue-grey, mustard — each with slightly rounded corners. A thin dashed vertical divider line runs down the centre. Right half: an empty dashed-outline rectangle in the top-right corner for postage, three thin grey horizontal lines lower down for an address, otherwise plain off-white card. No stamps, no postal marks.
```

<details><summary>Text to render (approach B)</summary>

```
Left panels (category / name / line):
  blush:     "FLORIST" / "Petal & Stem" / "Same-week bouquets"
  blue-grey: "FITNESS" / "Upstairs Studio" / "Beginner classes"
  mustard:   "BAKERY" / "Maple & Rye" / "Weekend pastries"
Inside the dashed postage box, tiny grey: "Postage"
Above the address lines, tiny grey caps: "ADDRESS AREA"
Bottom right, tiny grey: "Organized by Post & Board Media"
No other text anywhere.
```
</details>

---

## 6. "How a board is laid out" detail crops (three small images)
- **Files:** `anatomy-host.webp`, `anatomy-ads.webp`, `anatomy-print.webp` · **Ratio:** 4:3 · **Size:** 800 × 600
- **Alt:** decorative (`alt=""`), because the card text beside each image explains it.

```
(a) anatomy-host — Macro close-up of the upper section of a dark-walnut-framed board: smooth matte ink-navy surface filling most of the frame, a thin dotted mustard line, soft raking light showing fine paper texture. No text.

(b) anatomy-ads — Macro close-up of the lower band of the same board: four equal rectangular panels side by side in mustard, off-white, pale blue-grey and brick red, narrow even gaps, hairline borders, soft light. No text.

(c) anatomy-print — Extreme close-up of the corner where the walnut frame meets the printed board surface, showing crisp print edge, matte card texture and the fine grain of the wood. No text.
```
Use the master style block, but replace "centred product" wording with "macro detail, shallow depth of field".

---

## One message to generate the whole set (ChatGPT or other chat-based generators)

```
I'm building a website for "Post and Board Media", a local advertising business (shared mailers and advertising boards inside local venues). I need a consistent set of photorealistic product-mockup images. Generate them one at a time, waiting for my OK between each.

Global style for every image: [paste master style block]
Avoid: [paste negative prompt]
Important: leave every panel completely blank — no text, letters, logos or numbers anywhere. I will add the text myself.

Image 1 — [paste prompt 1], square 1:1.
Image 2 — [paste prompt 2], portrait 12:17.
Image 3 — [paste prompt 3], landscape 8:5.
Image 4 — [paste prompt 5], landscape 8:5.
Images 5–7 — [paste prompts 6a–6c], 4:3.

Keep the frame wood tone, card stock, lighting and colours identical across the set.
```

For approach B, remove the "leave every panel blank" line and add each image's *Text to render* block.

---

## Before you send them back: checklist

- [ ] Board: host area is about two-thirds; four **equal** ad panels
- [ ] Postcards: six (front) or three (back) **equal**, clearly separated panels
- [ ] Colours match the palette, with no stray purple, teal or neon
- [ ] **Approach A:** no text at all. **Approach B:** every word matches the lists above exactly, with nothing extra
- [ ] No Canada Post marks, stamps with country names, QR codes, phone numbers or URLs
- [ ] Object is centred, straight and not cropped, with an even margin
- [ ] At least the listed size; saved as WebP or PNG

Save them to `src/assets/images/examples/` with the file names above. I'll swap them into the components, keep the "Example layout" labels and alt text, and for approach A overlay the live text so it stays sharp and editable.
