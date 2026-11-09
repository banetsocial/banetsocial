# Banet Social website: Claude Code prompt

Paste everything below this line into Claude Code, inside an empty folder (or save this file in the folder as PROMPT.md and tell Claude Code: "Read PROMPT.md and start").

---

<role>
You are a senior creative developer, art director and AI-video producer building the website of my video business, Banet Social. You care equally about three things: a distinctive cinematic identity that looks like nobody else's, engineering quality (fast, accessible, responsive, bug-free), and spending my AI credits and money carefully. Talk to me in Hebrew. I am a video editor, not a developer: explain decisions in plain words and stop at every checkpoint below.
</role>

<goal>
A one-page site that feels like one continuous camera move. The visitor scrolls and the camera travels through a chain of rooms: each room contains a glowing screen, the camera pushes into that screen, and inside it is the next room. Room inside a room inside a room, with no cuts.

Each room is one category of my work. Its walls are covered with screens, and every screen plays one of my real videos as a clickable card. Clicking a card opens a full-screen player with sound. The journey ends in my office: prices, how we work, and one clear way to reach me (WhatsApp).

Job of the site: in the first second the visitor sees that I make cinematic video, by the third room they believe I'm good, and at the end they message me.
</goal>

<the_journey>
This is the core of the site. Everything else serves it.

Rooms, in order (5 rooms, 4 transitions):
1. The Studio (hero). A luxurious, warm home studio. Logo and headline. Center screen plays my showreel.
2. The Business Room. A bright production office. Wall of screens: business videos (reels, real estate, cafe).
3. The Event Hall. A grand hall with a stage. Screens: events, orchestras, festivals, live music.
4. The AI World. Surreal, dreamlike space, teal light, floating screens: AI productions.
5. The Office. Cozy walnut office. No video wall: prices, process, about me, contact.

Each transition = the camera pushes straight into the central screen of the current room, the screen fills the frame, and its image IS the next room. The last frame of transition N must be identical to the still of room N+1, so the chain is seamless.

How it is built (this is the reliable technique, do not improvise a different one without asking me):
1. Room stills first. Generate one still per room (prompts below). All 5 share one visual world and one camera grammar: symmetrical one-point perspective, eye-level camera, perfectly centered portal screen.
2. Transitions second. For each pair of rooms, generate a first-frame/last-frame video (first frame = room N still, last frame = room N+1 still) with a push-in prompt (below). This is what guarantees continuity.
3. On the site, each transition is turned into a frame sequence (WebP, about 15 fps, 720px wide on mobile and 1280px on desktop) drawn on a canvas and scrubbed by scroll. Scrolling forward plays the push-in, scrolling back reverses it. Do not scrub a <video> element by setting currentTime: it stutters on iPhone.
4. Between transitions, each room "rests" on its still for about one screen of scroll. During the rest, the screen wall comes alive: HTML video cards are placed exactly on top of the painted screens in the still, so my real videos look like they are playing on the room's monitors.
5. Screen positions live in data (rooms.json: for each room, the rectangle of every screen in percent of the image). Because all screens in the stills are flat and front-facing, every overlay is a simple rectangle. Measure the rectangles from the stills yourself (look at the image), then build a hidden calibration mode (?calibrate in the URL) that outlines each screen and lets me drag its corners and copy the corrected JSON, in case something is off by a few pixels.
6. Load progressively: only the current transition and the next one are loaded. A tiny blurred placeholder shows until frames arrive.

Mobile (most of my clients will see this on a phone):
- The room still is cropped to the center (the symmetry keeps the portal screen centered).
- The painted side screens get cropped away, so on mobile the cards are NOT pinned to the wall. Instead they appear as a floating "monitor rail" inside the room: a horizontal swipeable row of vertical 9:16 screens with brass bezels, over the room background. Max 2 videos playing at once.
- The push-in transitions still play, scrubbed by scroll, exactly as on desktop.

Fallbacks:
- prefers-reduced-motion: no scrubbing. Each room is a still, rooms change with a soft crossfade. Cards show posters until tapped.
- Save-Data or a very slow connection: stills and posters only, no frame sequences, no autoplay.
- JavaScript off: a plain readable page with all categories, cards, prices and contact.

Showing as many works as possible:
- Every work lives in works.json with a category. A room shows as many cards as it has painted screens (desktop) or the first 8 in the rail (mobile), featured ones first.
- Each room has a button "כל העבודות בקטגוריה" that opens a full gallery grid of that category (a native <dialog> or an overlay panel) with every work, so nothing is hidden. Adding a work = adding one line to works.json. Document this in README.md.
</the_journey>

<ai_production>
Generation tools: if the Kolbo MCP connector is available to you, use it (my project there is "אתר בנט סושיאל", id 6af06a083b4353e28ac83ba7; put everything you generate into it). If it is not available, write every prompt below into PRODUCTION.md with the exact settings, stop, and tell me. I will generate them and send you the links.

Credit rules (strict):
- Before ANY generation, call the model list, show me the exact credit cost per item and the total, and wait for my approval. Never generate without it.
- My balance is low. Start with existing assets (listed below) and cheap drafts. Images first (cheap), then transitions as Seedance 2.5 drafts (480p-draft). Upgrade only what I approve after seeing the drafts.
- Never buy, subscribe, or suggest a paid plan for anything else.

Existing assets from the first version of this site (look at them before generating anything new):
- 4 Seedance 2.5 draft clips (5s each) and 4 room stills already exist. They were generated as separate loops, not as a seamless chain, so they probably will not connect. Check each: if a still fits a room in the new journey, reuse it as that room's still and only generate what is missing. Tell me what you reuse and what you regenerate.
  - Studio still: https://media.kolbo.ai/kolboai-media/generated-images/6ac392fda2a616431eeb6296/6ac403c723c0b5e96ab7930a/Symmetrical-wide-interior-6af06169f21b250c8cad1f9b-nano-banana-2.png
  - Shooting room still: https://media.kolbo.ai/kolboai-media/generated-images/6ac392fda2a616431eeb6296/6ac403c723c0b5e96ab7930a/Symmetrical-interior-of-a-6af061690f5d1abe6ff36c80-nano-banana-2.png
  - Glowing screen / portal still: https://media.kolbo.ai/kolboai-media/generated-images/6ac392fda2a616431eeb6296/6ac403c723c0b5e96ab7930a/A-large-glowing-screen-on-6af0616af21b250c8cad1f9d-nano-banana-2.png
  - Office still: https://media.kolbo.ai/kolboai-media/generated-images/6ac392fda2a616431eeb6296/6ac403c723c0b5e96ab7930a/Symmetrical-cozy-luxuriou-6af0616983001ab2a6a24ff7-nano-banana-2.jpeg
  - Draft clips: https://media.kolbo.ai/kolboai-media/generated-videos/6ac392fda2a616431eeb6296/6af06a083b4353e28ac83ba7/Total-5-seconds-one-continuous-6af07fc9830616bb31102305-seedance-2-5-draft.mp4 , ...6af07fc9d99856a863784380-seedance-2-5-draft.mp4 , ...6af07fc8e3e064d6b63b5001-seedance-2-5-draft.mp4 , ...6af07fc9d99856a863784382-seedance-2-5-draft.mp4 (same folder as the first)

Shared look for every still (append to each room prompt):
"Symmetrical one-point-perspective wide interior, camera at eye level, exactly centered, 16:9. Warm Jerusalem limestone, dark walnut wood, brushed brass details, soft golden-hour light, subtle olive-green accents, cinematic, photoreal, shallow haze. In the exact center of the back wall: one large glowing screen with a thin brass bezel, the brightest element in the frame. All other screens are flat, front-facing, perfectly rectangular and axis-aligned, no tilt, no perspective skew, matte black with a faint glow, nothing displayed on them. No people, no text, no logos, no watermarks."

Room still prompts:
1. Studio: "A luxurious, intimate home video studio: walnut desk with a cinema camera on a tripod, soft light panels, bookshelves with film reels, a velvet armchair. Four small screens hang in a symmetrical row on each side of the central screen."
2. Business Room: "A bright modern production office in a stone building: clean desks, plants, large windows with soft daylight. The back wall is a symmetrical grid of eight vertical 9:16 screens, four on each side of the central screen."
3. Event Hall: "A grand event hall with crystal chandeliers, round tables with white cloths, a raised stage with warm spotlights. Above the stage, the central screen; on both side walls, a symmetrical column of vertical 9:16 screens, three per side."
4. AI World: "A surreal dreamlike space: the floor is still water reflecting the sky, floating stone arches, teal and deep-blue light with warm brass highlights, gentle floating particles. Vertical 9:16 screens float in mid-air in a symmetrical arc around the central floating screen, three on each side." (For this room, replace the warm golden light in the shared look with teal moonlight, keep brass.)
5. Office: "A cozy, luxurious walnut office: leather chair, desk lamp with a warm glow, framed vintage photographs, a window at dusk over Jerusalem stone buildings. The central element is a large framed screen behind the desk." (The journey ends here, so this screen is not a portal.)

Transition prompt (first-last-frame model, 5 seconds, same for all four, adjust only the room names):
"Total 5 seconds, one continuous shot, no cuts. The camera dollies slowly and steadily straight forward into the glowing central screen of the [room N]. The screen grows until its bezel passes beyond the edges of the frame, and the image inside it becomes the [room N+1], matching the last frame exactly. Smooth, constant speed, no camera shake, no rotation, no people, no text."
Use the first-last-frame tool (first frame = still of room N, last frame = still of room N+1). Pick a Seedance model that supports first and last frame, draft resolution first.
</ai_production>

<my_details>
Most of the interview is already answered. Use these facts exactly. Never invent anything not listed here.
- Brand: בנט סושיאל (Banet Social). Owner: יוסי בנט (Yossi Banet). Video editor and AI content creator: reels for businesses, event and performance video, music clips, cinematic AI productions.
- Area: ביתר עילית and Jerusalem.
- Main action: WhatsApp to 052-4558719 (https://wa.me/972524558719 with a prefilled message "היי יוסי, הגעתי מהאתר"). Secondary: phone call. Email in the footer: yosibanet@gmail.com.
- Language: Hebrew only, fully RTL.
- Equipment worth mentioning: DJI Osmo Pocket 3, DJI Mic 2.
- Logo: https://media.kolbo.ai/kolboai-media/uploaded-images/6ac392fda2a616431eeb6296/6ae28850ae024a694d261076/1793614084205-0524558719.jpg (JPG on black; use mix-blend-mode: screen on dark backgrounds, and ask me for a transparent PNG).
- Brand tokens from version 1 (a starting point, you may refine them in the design plan): walnut #22180F, walnut-2 #3A2919, stone #E6CFA3, stone-dim #B9A07A, brass #C9A15A, olive #5C6B3C, ink #F7EEDD, teal #0F2E36. Fonts: Frank Ruhl Libre (display) and Assistant (text), both free on Google Fonts.

Price list (official, show it in full, never change or discount it):
- רילס לעסק בצילום שטח: 1,300 ₪. Up to one hour of shooting at the business in Beitar Illit or Jerusalem, full edit, music, captions, dynamic design.
- סרטון שיווקי ב־AI: 1,000 ₪. Script, AI visuals, AI voiceover, sound, rhythmic edit and a call to action.
- הפקת AI קולנועית מורכבת: from 3,500 ₪, by length and complexity. Concept, full script, complex shots, full sound design, dubbing or original music, cinematic edit.
- ריטיינר חודשי: 4,200 ₪ a month (instead of 5,200 ₪). 4 full videos a month, monthly planning, creative guidance, editing.
Terms: up to 2 revision rounds included, extra round 150 to 200 ₪. Delivery up to 5 business days from receiving all materials or from the shoot day. Beitar Illit and Jerusalem at no extra charge, outside the area 150 to 250 ₪ by distance. Payment: 50% deposit on order, 50% on completion before the final file is delivered.

Works (seed for assets/data/works.json; all are vertical 9:16 MP4s, 13 to 125 MB each, so they must go through the media pipeline):
- business | הכפלה עסקית | איתמר שולם | https://media.kolbo.ai/utility-downloads/downloaded-5b96b127-76a8-44bf-9d2a-3691e457af14.mp4
- business | ביכלר נדל״ן | סרטון לעסק | https://media.kolbo.ai/utility-downloads/downloaded-3f344859-2a49-4c73-8133-96c8e748a623.mp4
- business | COFFEE | הפקת וידאו לבית קפה | https://media.kolbo.ai/utility-downloads/downloaded-b9e52d3f-280a-4a03-bd4c-2b1ea8ce93bd.mp4
- events | דינר יוקרתי | תיעוד אירוע | https://media.kolbo.ai/utility-downloads/downloaded-4472f7f4-91b5-408a-8353-e083af8591e2.mp4
- events | תזמורת | אולם גולד | https://media.kolbo.ai/utility-downloads/downloaded-7497c667-7356-42c3-8609-82a5a96a3e9d.mp4
- events | פסטיבל סוכות | הפקת שטח | https://media.kolbo.ai/utility-downloads/downloaded-4c9ecdf4-b051-43f9-a13a-fda0b2794cf5.mp4
- events | מוזיקה חיה | הפקת אירוע | https://media.kolbo.ai/utility-downloads/downloaded-5a75362f-4699-40d7-87bb-a7436969a118.mp4
- ai | פרומו | בנט סושיאל | https://media.kolbo.ai/utility-downloads/downloaded-f19312e1-15f3-4186-92a8-061d0215ecd8.mp4
- ai | פרסומת | בנט סושיאל | https://media.kolbo.ai/utility-downloads/downloaded-a551216f-01be-49b4-aecf-7cbb1140352b.mp4
- ai | אטמוספרה | בושם לרכב | https://media.kolbo.ai/utility-downloads/downloaded-da56ae83-bff2-4b83-b3a1-4da271f3330d.mp4
- ai | אני מאמין | סרטון AI | https://media.kolbo.ai/utility-downloads/downloaded-23193904-7542-44d3-a2f7-8764fdd5cc09.mp4
More works: my full portfolio is in the Google Drive folder "בנט סושיאל". The rooms have more screens than I have works, so ask me for more videos per category.
</my_details>

<phase_0_short_interview>
Ask me only what is still missing, in one numbered message, and wait:
1. More videos per category (the rooms have up to 8 screens each), and which one is my showreel for the Studio screen.
2. A one-line pitch and an honest result for any work that has one (views, client outcome). If I have none, the card shows title and client only.
3. Proof numbers I can honestly stand behind (clients, projects, years). If none, there is no numbers strip.
4. A photo of me for the About part, and a transparent PNG logo if I have one.
5. My process steps, if they differ from: שיחת היכרות, תסריט וקונספט, צילום או הפקה, עריכה, מסירה.
6. Whether I have a domain name.
</phase_0_short_interview>

<phase_1_design_plan>
Show me, before building:
- The room list with the asset plan per room: reuse or generate, and the exact credit cost, total included.
- Color and type: final tokens, with one accent used sparingly. Display face must have real Hebrew glyphs.
- An ASCII storyboard of the scroll: what the visitor sees at each scroll position, on mobile and on desktop.
- Where the non-journey content lives: proof numbers and the headline in the Studio, process + prices + about + final call to action in the Office, a floating WhatsApp button on screen throughout.
- The one memorable thing is the room-inside-a-room push. Everything else stays quiet.
Then check the plan against generic defaults and remove anything that would look the same on any other site: identical rounded cards with soft grey shadows, gradient washes as decoration, ALL-CAPS labels over every heading, glassmorphism everywhere, emoji as icons, fade-up animations on every section. Tell me what you changed. Wait for my approval.
</phase_1_design_plan>

<phase_2_production>
Generate (only after approval) in this order, showing me results at each step:
1. Missing room stills. I approve each one.
2. The 4 transitions as drafts. I watch them and say which ones to keep, redo or upgrade.
3. Turn approved transitions into frame sequences with ffmpeg (WebP, about 15 fps, 720px and 1280px wide sets) and verify that the last frame of each transition matches the next room's still. If there is a visible jump, crossfade the last 6 frames into the still and tell me.
</phase_2_production>

<phase_3_build>
Stack: plain HTML, CSS and vanilla JavaScript. No framework, no build step, no paid services. Runs by opening index.html and deploys as-is to GitHub Pages.

Structure: index.html, assets/css, assets/js, assets/media (stills, sequences, works), assets/fonts, assets/data/works.json (category, title, client, pitch, stat, poster, preview, full, featured) and assets/data/rooms.json (room id, category, still, transition sequence, screen rectangles).

Works media pipeline (ffmpeg, install if missing):
- Preview for the screens: H.264 MP4, max 540px on the long side, about 1 Mbps, no audio, 6 to 8 seconds from the strongest moment (ask me if unsure which).
- Full version for the player: max 1080px on the long side, about 3 to 4 Mbps, with audio.
- WebP poster for every work and a tiny blurred inline placeholder.
- Previews get their source only when their screen is at least half visible (IntersectionObserver). Max simultaneous playback: 2 on mobile, 6 on desktop. Always muted, playsinline, loop. Sound only in the full player.

Behaviour and quality floor:
- Mobile first. RTL with logical CSS properties. Numbers, prices and Latin text inside Hebrew isolated with dir="ltr" so they never flip.
- Fluid type with clamp(), headlines with text-wrap: balance. Each room's headline reveals word by word when the camera arrives; no other decorative animation.
- Player: native <dialog>, closes with Esc, with the close button, and with the phone's back button (push a history state when it opens).
- Accessibility: semantic landmarks, skip link that jumps past the journey to the prices and contact, visible focus ring, alt text, every card a real button, keyboard scroll works through the journey, contrast at least WCAG AA.
- SEO and sharing: title, meta description in Hebrew, Open Graph image 1200x630 made from the Studio still with the logo, favicon, canonical URL.
- Copy: short, concrete, Hebrew, from the client's point of view, in my voice. No filler, no long em dashes. Buttons say exactly what happens ("שלחו לי הודעה בוואטסאפ").
</phase_3_build>

<phase_4_verify>
Do not tell me it's done before you checked it yourself:
1. Serve locally, take Playwright screenshots at 390px, 768px and 1440px, at the rest point of every room and in the middle of every transition. Look at them, fix what's broken or ugly, screenshot again.
2. Check the overlay screens sit exactly on the painted screens at all three widths.
3. Zero console errors. All links work, including WhatsApp with the prefilled message.
4. Lighthouse mobile targets: Performance 85+ (the journey is heavy; get as high as you can with lazy loading), Accessibility 95+, Best Practices 95+, SEO 95+.
5. Test the player (Esc, close button, back button), reduced motion, and a throttled slow-3G load.
6. Final art-director self-critique: name the weakest room and improve it once.
Show me the screenshots and the scores.
</phase_4_verify>

<phase_5_deploy>
Walk me step by step through free publishing on GitHub Pages: create the repository, push, enable Pages, and connect my domain if I have one. Run the git commands yourself where you can; where you can't, tell me exactly what to click. If the media makes the repository too heavy, keep large files on the Kolbo CDN and tell me.
</phase_5_deploy>

<working_rules>
- Work in the phases above, in order. Commit to git at the end of each phase with a clear message.
- Never spend credits or money without my explicit approval of the exact amount.
- Never invent results, client names, numbers or prices. Ask me.
- When unsure what I want, ask one short question instead of guessing.
- Keep NOTES.md updated with decisions, asset links, credit spend so far and what's left, so a new session can continue where we stopped.
</working_rules>
