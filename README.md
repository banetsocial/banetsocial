# בנט סושיאל: האתר

אתר של עמוד אחד שמרגיש כמו תנועת מצלמה אחת: סטודיו ← עסקים ← אירועים ← AI ← משרד.
HTML, CSS ו־JavaScript נקיים. אין framework ואין build. עובד ב־GitHub Pages כמו שהוא.

## להריץ במחשב

```bash
node tools/serve.js
```

ואז לפתוח http://localhost:5173

## להוסיף סרטון חדש (3 צעדים)

1. **להוסיף שורה אחת** ל־`tools/works-src.tsv` (מופרד בטאבים):
   `slug  drive_id  ext  category  title  client  featured`
   - `category`: אחד מ־`business`, `events`, `ai`, `studio`
   - `featured`: `1` כדי שיופיע ראשון
   - את קובץ המקור שמים ב־`assets/media/drafts/drive/<drive_id>.<ext>`
2. **לקודד** (תצוגה מקדימה, גרסה מלאה, פוסטר):
   ```bash
   bash tools/encode-works.sh assets/media/drafts/drive <slug>
   ```
   כדי לבחור את רגע ההתחלה של התצוגה המקדימה מוסיפים שורה ל־`tools/preview-starts.tsv`: `slug<TAB>שניות`.
3. **לבנות את הנתונים:**
   ```bash
   node tools/build-works-json.js && node tools/build-site-data.js
   ```

הסרטון יופיע מיד בגלריה "כל העבודות בקטגוריה". כדי שיופיע על **מסך בחדר**, מוסיפים את ה־slug לרשימה `WALL` ב־`tools/build-works-json.js`.

## תוצאה אמיתית על כרטיס

רק דברים שיוסי אמר בפועל. עורכים את `PITCH` ב־`tools/build-works-json.js`. אסור להמציא מספרים.

## כיול מיקום המסכים

פותחים את האתר עם `?calibrate` בסוף הכתובת, גוללים לחדר, גוררים את הנקודות האדומות ומעתיקים את ה־JSON מהחלון. אחר כך מעדכנים את `tools/build-rooms-json.js` ומריצים:

```bash
node tools/build-rooms-json.js && node tools/build-site-data.js
```

## תמונות חדרים ומעברים

```bash
bash tools/build-frames.sh
node tools/build-rooms-json.js && node tools/build-site-data.js
```

## מבנה

| נתיב | מה יש שם |
|---|---|
| `index.html` | כל התוכן: חדרים, מחירון, עליי, יצירת קשר |
| `assets/css/site.css` | עיצוב. הצבעים והגופנים בראש הקובץ (`:root`) |
| `assets/js/journey.js` | הגלילה, הקנבס, הסרטונים על המסכים, הנגן והגלריה |
| `assets/data/works.json`, `rooms.json` | הנתונים (נוצרים מהסקריפטים ב־`tools/`) |
| `assets/media/` | תמונות חדרים, רצפי מעברים, סרטונים, מותג |
| `NOTES.md` | החלטות, קרדיטים והמצב הנוכחי |
