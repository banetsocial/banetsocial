# NOTES: אתר בנט סושיאל

קובץ מצב לפרויקט, כדי שכל סשן חדש ימשיך מאיפה שעצרנו. ההנחיות המלאות ב־PROMPT.md.

## מצב נוכחי
- **האתר באוויר:** https://banetsocial.github.io/banetsocial/ (משתמש GitHub: banetsocial, פריסה דרך GitHub Actions: .github/workflows/pages.yml. gh נייד ב־C:/Users/User/tools/gh/bin/gh.exe).
- המעברים עדיין טיוטות 480p. יוסי יחליט אילו לשדרג אחרי שיראה בטלפון.
- פתוח: שינוי שם המשתמש ב־GitHub ל־banetsocial (יוסי עושה מהטלפון) ← לעדכן את canonical ו־og:image. פוסטרים חלשים: jerusalem, bichler, ai-koenig, newborn. שלב 4 (Lighthouse, תנועה מופחתת, 3G איטי, כיול) לא בוצע.
- 34 עבודות קודדו (previews 28MB, full 614MB מחוץ ל־git). works.json נבנה. פוסטרים חלשים לתיקון: jerusalem, bichler, ai-koenig, newborn.

## Kolbo
- פרויקט: "אתר בנט סושיאל", id `6af06a083b4353e28ac83ba7`
- יתרה ב־2026-11-09: 2,443.3 קרדיטים
- הוצאה עד עכשיו בפרויקט החדש: 0

## סקירת נכסים קיימים (2026-11-09)
כולם הורדו ל־`assets/media/drafts/`. סטילס 1376x768, קליפים 854x480 24fps 5s.

| נכס | מה רואים | החלטה מוצעת |
|---|---|---|
| old-studio.png | סטודיו חם, אבן ואגוז. במרכז חלון קשתי, אין מסך מרכזי ואין מסכי צד | לא עובד כפורטל. לעשות image-edit (חלון → מסך זוהר + מסכים בצדדים) או ליצור מחדש |
| old-shooting.png | חדר הקרנה עם כורסאות קטיפה, קיר מסכים מלא תמונות | המסכים כבר מצוירים עם תוכן, לא מתאים לאף חדר. ליצור מחדש |
| old-portal.png | בקתת עץ כפרית, מסך אחד עם נוף הרים | סגנון שונה, אין מסכי צד. ליצור מחדש |
| old-office.jpeg | משרד אגוז ואבן ירושלמית, חלון בשקיעה, שולחן עם לפטופ | מתאים לחדר 5. המשרד הוא סוף המסע ולא פורטל, אז לא חייב מסך מרכזי. מומלץ לשימוש חוזר |
| clip1-4.mp4 | לולאות נפרדות (סטודיו, חדר הקרנה, דחיפה לתוך מסך ההרים, משרד) | לא מתחברים לשרשרת. clip3 שימושי רק כהשראה לתנועה |

## לוגו
- ה־JPG ב־Kolbo הוא על רקע לבן.
- **בדרייב יש PNG שקוף** ("לוגו בנט", id `17y7bj6Bupn25wNhAwF1z7xDOfNXqiYGw`, 1080x1920 RGBA), נשמר ב־`assets/media/drafts/logo-drive.png`. יש סביבו הרבה שוליים ריקים שצריך לחתוך. הקלאפר האפור כהה ונבלע על רקע אגוז, ולכן צריך מאחוריו הילה עדינה או גרסה בהירה יותר.

## דרייב: "בנט סושיאל — תיק עבודות"
- id של התיקייה: `1VxGGQ96oKK3iGQR5krWzKZGJ7Kop-jVW`. יש בה 37 סרטונים בתת־תיקיות: הפקות שטח וצילומי סושיאל, סרטוני AI נוספים, אתר בנייה קרלין, הכפלה עסקית, מלכות שבמלכות (נראית ריקה).
- התיקייה הישנה "תיק עבודות – בנט סושיאל" (`1VRfwkjDpq8J9qspXDU8IbD0UsvNMoCb6`) ריקה.
- הקבצים גדולים (8 עד 216MB), ואי אפשר לצפות בהם דרך המחבר. יוסי יוריד את התיקייה למחשב כדי שאוכל לחלץ פריימים ולבחור.

## החלטות
- 2026-11-09: **שואוריל לסטודיו = "אטמוספרה - בושם לרכב"** (Drive id `1t7dtb0hvDh-uop4Ah2xoKK1jUWy3jhNN`).
- 2026-11-09: יוסי ביקש שאבחר את הסרטונים הכי יפים מהדרייב.

- 2026-11-09: **חדר ה־AI בהמתנה.** יוסי מעלה עכשיו לדרייב 8 ריליסים חדשים של AI, ולא בוחרים סרטוני AI עד שיגיעו.
- 2026-11-09: **לא משתמשים ב"מכירת כובעי בורסלינו (התאחדות)"**. זו פרסומת שיוסי לא יצר. אסור שתופיע באתר בשום מקום.
- 2026-11-09: **חומרי AI = התיקייה "מלכות שבמלכות (סדרת AI)"** (id `1nVPRcJTZceE94hANauq5VMVNT9BghGE4`), 10 קבצים. לפי יוסי "מצוינים". שניים מהם זהים בגודל לקבצים בתיקיית הפקות השטח: IMG_5549 (שם: "הפקת אירוע ומוזיקה חיה") ו־IMG_5211 (שם: "הפקה קולנועית"). כלומר אלה פרקי AI ולא חומר אירועים, ולכן לא שמים אותם בחדר האירועים.
- 2026-11-09: יוסי ישלח בהמשך עוד סרטונים שלו. לבחור רק ממה שהוא עצמו יצר.

## סקירת "מלכות שבמלכות" (8 קבצים חדשים, כולם 1080x1920)
גיליון: `assets/media/drafts/sheets-ai/all.jpg`. כל השמות כאן הם **שמות עבודה לפי הכיתוב שמופיע בסרטון**, ויוסי צריך לאשר אותם.

| # | id | אורך | סגנון | שם עבודה | הערכה |
|---|---|---|---|---|---|
| 1 | 10Z_6aMABYVuqoL6IeB_y4HElTe1XLlDU | 30s | אנימציה תלת־ממדית, שדה בשקיעה | "דער קעניג" | חמוד, צבעוני |
| 2 | 18lBcHXqU6BgbDoWr2UZ2REobttDZy9LK | 55s | אנימציה, לוויתן וסוכה | "לישב בסוכת עורו" | מקורי ומשעשע |
| 3 | 1AsbT82nehS6xIj3o2q6PFeMvEN7FsQNV | 46s | אנימציה, בית המקדש | "ביום קראנו / ענו" | קנה מידה גדול |
| 4 | 1R82qiFL1mSPHkFgmdNdAqF9nLCMT18jX | 28s | ציורי, נופים תנ"כיים | "אתה זוכר" | רך, אמנותי |
| 5 | 1RRosbkh_j62UgPxP6FUbgs95DDipX2SM | 34s | **פוטוריאליסטי**, בית כנסת באור | "סלחתי" | **הכי קולנועי** |
| 6 | 1S4ywG93ZUbgySoiFX-_f7-sJlUp5pCgf | 32s | פוטוריאליסטי, תפילה עד כדור הארץ | "היום תקבל את תפילתנו" | **חזק מאוד** |
| 7 | 1d1UJEkFzoWGXsxFwLCWNTHoeYZyLJtC7 | 57s | פוטוריאליסטי, סיפור אישי | "קודם שיחטא האדם" | רגשי |
| 8 | 1s5p3Jg-yi-5wr2OBNxmjfqAeK9CkZiVM | 32s | פוטוריאליסטי, סמטאות ירושלים בלילה וזמר | "נשפוך כמים" | **חזק מאוד** |

הצעה ל־6 המסכים בחדר ה־AI: 5, 6, 8, 7, 3, 1 (ארבעה פוטוריאליסטיים ושניים באנימציה, כדי להראות טווח). 2 ו־4 יהיו בגלריה, לצד IMG_5549 ו־IMG_5211.

## סקירת 22 סרטוני השטח (גיליונות: `assets/media/drafts/sheets-main/A.jpg`, `B.jpg`)
הערות חשובות:
- **"סמטאות ירושלים (IMG_7FD5)"** הוא בפועל אירוע חסידי עם תזמורת (שטריימלים, קלידים, קלרינט). לכן הוא בחדר האירועים.
- **"אירוע תופים ובמה (IMG_6503)"** הוא בפועל מאחורי הקלעים של צילום קליפ, באולפן ובשטח.
- **"צילומי אווירה בריכה ובר"** הוא בפועל אולם/מסעדה "מאפנה", כלומר סרטון קידום למקום.
- **IMG_1312 ו־IMG_2679** הם סרטוני בנייה עם לוגו "כל התומכים". נראים כמו חלק מגיוס התרומות של קרלין, ולאמת עם יוסי.
- **IMG_5211 ו־IMG_5549** אומתו כפרקי "מלכות שבמלכות" (AI).
- **"מודה אני"** הוא כמעט פריים סטטי אחד שחוזר. חלש, לא לשים על הקירות.
- **"נופי טבע וגלים"** נראה כמו נופי AI עם כיתוב "דיין וועלט". אם זה AI, הוא שייך לחדר ה־AI. לאמת.

### 4 האחרונים (גיליון `sheets-last/C.jpg`)
- **דרשו (מפעל ודפוס)**: מכונות דפוס בתאורה דרמטית, קולנועי מאוד → עסקים.
- **סינגל א בייס**: אולפן הקלטות ומתופף → סטודיו.
- **ניו בורן**: מצגת תמונות תינוקות → גלריה בלבד (זה לא וידאו של ממש).
- **כנס עסקי**: כנס "הכפלה עסקית" עם איתמר שולם על הבמה → אירועים.

### חלוקה סופית מוצעת (ממתינה לאישור יוסי). המקור: `tools/works-src.tsv`
**סטודיו, מרכז:** אטמוספרה – בושם לרכב (שואוריל).
**סטודיו, 8 בצדדים:** אולפן הפקה ומיקס · הקלטת סינגל א בייס · מאחורי הקלעים של קליפ · דמויות בירושלים · נופי טבע · פסטיבל סוכות · עבודת כפיים ומחסן · קרלין "כל התומכים" 1.
**עסקים (8):** איתמר שולם ⭐ · קרלין שיפוץ ⭐ · COFFEE · ביכלר · דרשו · מאפנה · קרלין "כל התומכים" 2 · קרלין שלד.
**אירועים (6):** תזמורת ⭐ · סוכות · דינר לערנען · שמחה עם תזמורת · קלידים חיים · כנס עסקי.
**AI (6):** סלחתי ⭐ · היום תקבל ⭐ · נשפוך כמים ⭐ · קודם שיחטא · ביום קראנו · דער קעניג. בגלריה: לישב בסוכת עורו, אתה זוכר, IMG_5211, IMG_5549.
**לא באתר:** כובעי בורסלינו (לא של יוסי), מודה אני (סטטי).

### מדיה
- הצינור: `tools/encode-works.sh` → `assets/media/works/<slug>/` (preview.mp4, full.mp4, poster.webp, lqip.txt). התחלת התצוגה המקדימה כברירת מחדל היא 25% מהאורך. לשינוי: `tools/preview-starts.tsv`.
- `full.mp4` לא נכנס ל־git בינתיים (כבד). ההחלטה על אחסון היא בשלב 5: GitHub או ה־CDN של Kolbo.

### הצעת חלוקה (טיוטה ראשונה, לפני 4 האחרונים)
**עסקים (8 מסכים):** איתמר שולם ⭐ · קרלין שיפוץ ⭐ · COFFEE · ביכלר נדל״ן · מאפנה (בריכה ובר) · IMG_2679 · IMG_1312 · קרלין שלד וריצוף. בגלריה: תיעוד מחסן.
**אירועים (6 מסכים):** תזמורת אולם גולד · סוכות · דינר לערנען · אירוע חסידי (IMG_7FD5) · קלידים חיים · פסטיבל סוכות. בגלריה: מאחורי הקלעים (IMG_6503).
**סטודיו (8 מסכים בצדדים):** אולפן הפקה (BANET Studio, כינור) · דמויות בירושלים · מאחורי הקלעים (IMG_6503) · נופי טבע וגלים · תיעוד מחסן · ועוד 3 מתוך 4 הקבצים האחרונים שעדיין יורדים.

## תוצאות אמיתיות (מפי יוסי, 2026-11-09, אסור לנפח)
- **הכפלה עסקית / איתמר שולם**: סרטוני מכירה שעזרו לו להגיע לחשיפה מול לקוחות. אין מספר צפיות, אז לא ממציאים.
- **אתר בנייה קרלין**: סרטוני אווירה שעזרו לגייס תרומות לבניין. אין סכום, אז לא ממציאים.

## ראיון, המשך (2026-11-09)
- 4: **אין תמונה של יוסי.** החלק "עליי" יהיה בלי תמונה.
- 4: לוגו שקוף הופק מ"לוגו בנט" שבדרייב (לא נמצאה בשום מקום תיקייה בשם "לוגו סושיאל"): `assets/media/brand/logo.png` (567x635, עם הטלפון), `logo-mark.png` (567x574, בלי שורת הטלפון), `logo-mark-240.png` לכותרת העליונה. נחתך עם ffmpeg ושום פיקסל לא שונה.
- 5: **שלבי העבודה אושרו:** שיחת היכרות ← תסריט וקונספט ← צילום או הפקה ← עריכה ← מסירה.
- 6: יוסי ענה "BANET SOCIAL. בנט סושיאל". ההבנה: אין עדיין דומיין, וזה השם הרצוי. לאמת: בינתיים GitHub Pages, ודומיין (למשל banetsocial.co.il) אפשר לקנות בהמשך.

## מספרי הוכחה (מפי יוסי)
- "עשרות לקוחות" ו"מעל שנתיים בתחום הסושיאל". אלה ניסוחים מילוליים ולא מספרים מדויקים, ולכן לא מציגים מונה כמו "50+".

## אישורים וקרדיטים
- 2026-11-09: יוסי אישר ("מאושר וסידנס"): (א) חלוקת הסרטונים לחדרים, (ב) מסלול **Seedance 2.5** למעברים, (ג) שלב א' של תמונות החדרים, 44 קרדיטים (Nano Banana 2, 1K).
- הוצאה בפועל: ראו את הטבלה למטה.

| תאריך | פריט | מודל | קרדיטים |
|---|---|---|---|
| 2026-11-09 | סטודיו (עריכה) | nano-banana-2-image-editing | 11 |
| 2026-11-09 | עסקים, אירועים, AI | nano-banana-2 | 33 |

**סה"כ עד כה: 44 קרדיטים. יתרה משוערת: 2,399.**

## שינוי כיוון עיצובי (2026-11-09, מפי יוסי, הוקלט בקול)
- **הכיוון החדש:** חלל עתידני, טכנולוגי ומפואר בהשראת עבודות ה־AI שלו. טורקיז ותכלת כמו בלוגו. מבנה של ריבועים/מודולים, מסכים וכרטיסיות שצפים ועפים, אולי ים. כרטיסיות מחוברות כמו בסרטון ההרצאות שלו (סגנון Neon Journey / וקסלר). מעבר החוצה דרך דלת, או לים.
- **המשמעות:** הכיוון החם (אגוז, אבן, פליז) **מוחלף**. מתוך 4 התמונות שנוצרו (44 קרדיטים), רק חדר ה־AI מתאים לכיוון החדש. סטודיו, עסקים ואירועים לא מתאימים, וגם המשרד הישן לא.
- **גופנים:** יוסי רוצה את "הגופנים הכי פופולריים בעברית" מקנבה, ואפשר שיהיו בטורקיז.
- יוסי הציע לשלוח קישור לקנבה כדי לראות את ההשראה.
- אפשרות 2 (תיקון הסטודיו ב־11 קרדיטים) **לא בוצעה**. לא שווה לתקן תמונה בסגנון שמוחלף.
| 2026-11-09 | סטודיו עתידני, ניסיון | nano-banana-2 | 11 |

| 2026-11-09 | סטודיו עתידני v3 (עומק, יוקרה, מסכים 9:16) | nano-banana-2-image-editing | 11 |

| 2026-11-09 | סטודיו v4 (מסך מרכזי 9:16) | nano-banana-2-image-editing | 11 |

| 2026-11-09 | עסקים, אירועים, משרד (עתידני) | nano-banana-2 | 33 |

| 2026-11-09 | עריכת 4 חדרים: שקיעה, חום, בלי בריכות | nano-banana-2-image-editing | 44 |

| 2026-11-09 | 4 מעברים, טיוטה | seedance-2-5 480p-draft | 460 |

**סה"כ עד כה: 614 קרדיטים.**

## החלטה: מסכים מרכזיים לאורך
- 2026-11-09: יוסי: אם במסך המרכזי מתנגן סרטון שלו, הוא חייב להיות **9:16 לאורך**. השואוריל בסטודיו אנכי, ולכן הסטודיו v4 קיבל מסך מרכזי אנכי.
- **ברירת מחדל לכל החדרים הבאים: מסך מרכזי 9:16 (פורטל), וכל מסכי הצד 9:16.**
- הסטודיו המועמד: `assets/media/stills/v4-studio.png`.

## משוב על 5 החדרים (2026-11-09)
- יוסי: "נחמד מאוד". **לא חייבת להיות בריכה באמצע בכל חדר.** כן לשמור על אותו וייב ואותה שפה עיצובית.
- **אהב את החום של השקיעה הכתומה במשרד** ורוצה **נגיעות כתום/שקיעה בכל תמונה**.
- הצעה שממתינה לאישור: עריכה של סטודיו, עסקים, אירועים ו־AI (4 × 11 = 44 קרדיטים). כל אחד יקבל רצפה/מרכז שונה ואור שקיעה כתום, וב־AI כל המסכים יעברו ל־9:16.

## מעברים, טיוטה 1 (2026-11-09)
- 4 מעברים ב־Seedance 2.5, 480p-draft, 5 שניות, 856x478 (t2 יצא 876x488), 24fps, 121 פריימים. נשמרו ב־`assets/media/transitions/`.
- בדיקה: הפריים האחרון של כל מעבר זהה ויזואלית לתמונת החדר הבא. ה־SSIM בערך 0.5 נובע מדחיסת הטיוטה (גם הפריים הראשון יוצא כך). כשנבנה את רצפי הפריימים תהיה הצלבה של 6 פריימים אל הסטיל.
- וידאו מסע מחובר לצפייה: `review/journey-draft.mp4`.

## 2026-11-09 — מעבר בין חדרים: סיבוב מצלמה ימינה
- יוסי: הדחיפה פנימה לכרטיס נראתה מעוותת ולא אלגנטית; ביקש שהמצלמה תסתובב ימינה ותפסע קצת לחדר הבא.
- בוצע בקוד, בלי קרדיטים: החדרים יושבים זה לצד זה כפנורמה אחת (חפיפה 26% עם מעבר רך), הגלילה מסובבת את המצלמה ימינה, עם התקרבות קלה באמצע ונדנוד צעד עדין. המסכים זזים יחד עם הקיר.
- סרטוני המעבר של Seedance (t1–t4) כבר לא בשימוש באתר. הקבצים נשארו בתיקייה.
- טלפון: שורת הכרטיסים למטה היא עכשיו קאבר-פלואו: כרטיס מרכזי גדול עם מסגרת זוהרת, כותרת וסימן ניגון; הכרטיסים בצדדים מוטים ומעומעמים קלות; רק הכרטיס המרכזי מתנגן.
- טלפון מקבל עכשיו תמונות חדר ברוחב 1280 (חדות יותר).
- תמונות שער חדשות ל־4 עבודות (jerusalem 20s, bichler 37.8s, ai-koenig 16.7s, newborn 12s) דרך tools/preview-starts.tsv.
- מצב סטטי (הפחתת תנועה / חיסכון נתונים): תוקן באג שבו תמונות החדרים לא הופיעו (url יחסי בתוך משתנה CSS נפתר מול תיקיית ה־CSS); הוכהה שכבת הטקסט לקריאוּת.

## 2026-11-10 — השראה "מועדון הבוסיות": הליכה דרך פתחים
- יוסי שלח סרטון השראה: מתחילים בחוץ, נכנסים בדלת, ועוברים חדר דרך קשתות. החדרים חיים, ובכל עצירה יש טקסט בצד. ביקש את הרעיון, לא העתקה.
- יוסי אישר את שלב א' ("1"). בוצע:

| תאריך | פריט | מודל | קרדיטים |
|---|---|---|---|
| 2026-11-10 | תמונת חוץ: בניין BANET SOCIAL על החוף | nano-banana-2 | 11 |
| 2026-11-10 | 5 חדרים + קשת/דלת בצד ימין | nano-banana-2-image-editing | 55 |

- קבצים: `assets/media/stills/v6-*.jpg`. הקומפוזיציה זהה למקור, כך שהמסכים כנראה עדיין מכוילים. גיליון לצפייה: `review/stage-a-openings.jpg`.
- הבא (ממתין לאישור): שלב ב', מעבר הליכה אחד לניסיון ב־Seedance (טיוטה, בערך 115).
- יתרה אחרי שלב א': 1,237.3 קרדיטים (66 בפועל).
- 2026-11-10: לבקשת יוסי, הלוגו האמיתי (logo-mark.png) הושם על הבניין במקום הכיתוב, בקוד (ffmpeg) וללא קרדיטים: `v6-exterior-logo.jpg`.
- 2026-11-10: לבקשת יוסי, הלוגו הוקטן לשלט בולט מעל הדלת: רקע בצבעי שקיעה כתום-חם, מסגרת טורקיז וצל, בלי לבן. נעשה בקוד ונשמר באותו קובץ (`v6-exterior-logo.jpg`).
- אתר: ירד "ביתר עילית וירושלים" מהכותרת, מהמטא, מ"עליי" ומהפוטר. **נשאר** בתנאי המחירון ("ביתר עילית וירושלים בלי תוספת, מחוץ לאזור 150–250 ₪"), כי זה תנאי מחיר.
- טלפון לשיחה: 058-3210-519 (tel:+972583210519). הוואטסאפ נשאר 052-4558719.
- פתיחת סרטון: הכרטיס קופץ ממקומו, מסתובב סיבוב שלם בפרספקטיבה ונוחת במרכז כנגן (Web Animations, 950ms). הסרטון מתחיל לנגן כבר בלחיצה, כדי שבטלפון יהיה סאונד. בהפחתת תנועה נפתח בלי אנימציה.

## 2026-11-10 — בניין משודרג + חוף לסיום (אושר: "מאשר 22")
| תאריך | פריט | מודל | קרדיטים |
|---|---|---|---|
| 2026-11-10 | בניין חי ומרשים (מרפסות, גג ירוק, ספסלים, שיחים, פנסים) | nano-banana-2-image-editing | 11 |
| 2026-11-10 | חוף לסיום: דק עץ, כסאות נוח, קווי טורקיז, מרכז פנוי ללוחות | nano-banana-2 | 11 |
- קבצים: `v7-exterior.jpg` (בלי לוגו), `v7-exterior-logo.jpg` (עם שלט הלוגו בקוד), `v7-beach.jpg`.
- יתרה משוערת: 1,215.
- תזכורת מיוסי: **כל הפריימים באתר צריכים להיות חיים**, כמו בהשראה (שלב ג': לולאות תנועה לכל חדר, בחוץ ובחוף).
- פריסה: c35a3b0 עלתה בניסיון השני (הראשון נפל ב־syncing_files אחרי 10 דקות; האתר כ־700MB בגלל full.mp4).

## 2026-11-10 — פתיחה מבחוץ וסיום בחוף (בקוד, בלי קרדיטים)
- המסע מתחיל עכשיו **מחוץ לבניין** (v7 עם שלט הלוגו). הכותרת ו"גללו למטה כדי להיכנס" מופיעות שם, והגלילה **צועדת לדלת**: זום אקספוננציאלי לדלת, עם נדנוד צעד וטשטוש תנועה, ואז מעבר רך לסטודיו שמתקרב ונעצר.
- 5 החדרים עברו לתמונות v6, עם הקשתות והדלת. הקומפוזיציה זהה, ולכן המסכים נשארו מכוילים (נבדק בצילומי מסך).
- **סוף:** מהמשרד צועדים דרך דלת הזכוכית **המרכזית**, הפתוחה לים (היא במרכז, אז היא עובדת גם בטלפון), ויוצאים ל**חוף** (v7-beach).
- **החוף:** הבמה נשארת נעוצה עם החוף מאחור, וממשיכה זום איטי לכיוון הים. מקטע "בואו נדבר" (כותרת, שלבים, מחירון, עליי, וואטסאפ) עבר **לתוך #journey**, מיד אחרי הבמה, עם margin-top באורך כל ההליכה, כך שהוא עולה מעל החוף רק אחרי היציאה.
- כל בלוק הוא **לוח זכוכית שעומד על החול**: עולה מלמטה נטוי לאחור, פונה ישר במרכז המסך, ונוטה מעבר כשהוא עובר למעלה (‎--q מ־JS, rotateX/translateZ). יש פס אור שקיעה בקצה העליון וצל על החול. בטלפון אין backdrop-filter, כדי לחסוך בביצועים.
- מצב סטטי: המקטע מוצג כרגיל, עם תמונת החוף ברקע.
- עדיין לא חי (שלב ג'): כל התמונות סטטיות. סרטוני הליכה אמיתיים (שלב ב') יחליפו את הזום בקוד.

## 2026-11-10 — ניסיון השוואה: מעבר כניסה (אושר "מאשר עד 140")
| תאריך | פריט | מודל | קרדיטים |
|---|---|---|---|
| 2026-11-10 | כניסה: חוץ ← דלת נפתחת ← סטודיו, 5s 720p בלי סאונד | kling-video/o3/standard | 70 |
| 2026-11-10 | אותו מעבר | flux-3-first-last-frame-draft | 45 |
- סה"כ 115 (מתוך 140 שאושרו). קבצים: `assets/media/transitions/v2/enter-*.mp4`, השוואה: `review/enter-compare.mp4`.
- התרשמות: בשניהם יש הליכה רציפה, הלוגו נשמר והסוף נוחת על הסטודיו. ב־Kling הדלתות נפתחות כבר באמצע ההליכה (דלת "שנפתחת לפי הגלילה"); ב־FLUX הן נפתחות מאוחר, ממש לפני הכניסה.
- המלצה: Kling O3 לשאר (5 מעברים + 7 לולאות, בערך 840).

## כניסה אמיתית בגלילה (Kling) — חי באתר
- Yossi chose **Kling O3** for all the transitions (comparison in review/enter-compare.mp4).
- The entrance clip `transitions/v2/enter-kling.mp4` became 76 frames (15fps) in `assets/media/sequences/enter/{d,m}` (build: `bash tools/build-enter.sh`). The last 5 frames blend into the studio still, so there is no seam.
- The scroll maps to clip time in `scenes.enterSeq.time` (tools/build-rooms-json.js): 0–35% of the scroll covers the walk to the door (0–2.5s), **35–80% covers the door opening (2.5–3.75s)**, and 80–100% covers stepping into the studio. Slow scrolling = opening the door by hand.
- Frames load every 4th one first, then fill in. Until they arrive, the old code zoom stands in.
- No credits spent in this step. Balance 1,100.3. Next (awaiting approval): 4 arch walks + office door to the beach + 7 living loops = 12 × 70 = 840.

## Full videos on the Kolbo CDN (fixes the deploy timeout)
- All 34 `works/*/full.mp4` files (643MB) were uploaded to the Kolbo project 6af06a083b4353e28ac83ba7. The upload was free: the balance stayed 1,100.3.
- Map: `assets/data/media-cdn.json` (local path → URL). `tools/build-site-data.js` swaps `full` for the CDN URL. The workflow deletes those files from `_site` before upload. Every link was checked: 200, identical size, range requests supported.
- The local copies stay in git as a backup. A new video only needs `node <scratchpad>/upload-full.js <token>` (resumable) or a manual entry in the map.
- Also: `stills/` and `transitions/` are not uploaded to Pages (the page never loads them).

## Phone fixes: smooth card jump, look-around in rooms
- **Card jump:** the animation now flies a stand-in (`.fly-ghost`, the poster on a box with no filters) instead of the `<video>` itself, which was busy loading and starting at that moment and made the jump stutter on phones. The video is revealed under it on landing, with a timer as a backup. 820ms on phones.
- **Rooms on phones (portrait):** each room is a wide image, and a phone shows only a narrow slice of it, so the side screens were off-frame. Now a phone in portrait "looks around" each room during the scroll (`panPath`/`panX` in restCam): the first room goes middle → left → right, middle rooms left → right, and the office left → middle (toward the exit door). Rest is longer on phones (studio 1.5, others 1.2). Side screens are tappable on phones too (video only in the center portal, to save the battery).
- **Still open:** the exit to the beach is still a code fade. It will feel like "the same video" only with a real Kling clip of the exit (office → door → beach), which is one of the 12 clips awaiting approval.

## The whole journey is real video: 5 walks + 7 living loops (Kling O3) — 840 credits
- **Credits:** 12 × 70 = 840, exactly as approved. Balance 1,100.3 → **260.3**.
- **Walks** (`transitions/v2/{t1,t2,t3,t4,exit}-kling.mp4` → `sequences/<id>/{d,m}`, `bash tools/build-seqs.sh [id]`): studio→business, business→events, events→ai, ai→office through the arches on the right wall; office→beach through the glass door. The last 5 frames blend into the arrival still. The time map lives in `SEQ_TIME` (tools/build-rooms-json.js); the exit gives most of the scroll to opening the door.
- **Living loops** (`loops/src/*.mp4` → `loops/<id>-{d,m}.mp4`, `bash tools/build-loops.sh`): exterior, 5 rooms, beach. Locked camera (SSIM 0.996 between frames), so the screens the site overlays stay in place. The beach has clear waves; the rooms have only subtle motion (lights and reflections).
- **Code (journey.js):** `loadSeq`/`seqFrame` generic for every walk; `useLoop` plays a single loop and draws it instead of the still (`drawable`); at rest `draw(..., only, src)` draws the room alone (no neighbor overlap), so the walk lands on it with no seam, and the screens fade in during the first 10%. `walk()` starts from the camera position of the rest (zoom/pan) and settles into the clip. On phones (portrait) the view turns toward the arch during the walk; the look-around in each room is middle → left → right → middle.
- **Known issue:** walk **t2** (business → events) does not walk through the arch; the room "changes in place" (the table turns into a piano). It needs regenerating (70) to match the others.

## Quality loop (QA) — check, fix, check again
**Single command:** `bash tools/qa/run-all.sh [url]` → PASS/FAIL. Run it after every change.
- `tools/qa/clips.sh`: every walk starts and ends on its rooms (SSIM ≥ 0.90), plus the sharpest frame step in each clip and where it falls.
- `tools/qa/sweep.mjs`: scrolls the whole journey in headless Chrome in 2% steps (desktop 1280×720, phone 390×844) and measures the image change between neighboring steps. Flags a jump (×3 over local typical and >6), an empty frame, or a JS error.
**What it found and what was fixed (rounds 1→3):**
- Phone: change per step was very high (max 71) → rooms on phones get more scroll (studio 2.1, others 1.9), the look-around uses a sine curve (peak ×1.6 instead of ×3), and the turn toward the arch uses a plain sine → max 44, no jumps.
- Clips: sharp frame steps where the camera passes a door or arch (enter 3.25s, t3 3.67s, exit 3.5s), fast motion rather than distortion. → **adaptive scroll** `tools/motion-map.js`: the scroll inside each walk is spent in proportion to the image change (35% even, 65% by motion, doors ×1.5–1.8), and each walk's length is scaled by its overall motion (`assets/data/motion.json` → `seqs[id].time/len`).
- **Frame blending:** between two walk frames both are drawn (the next one over the previous one, with opacity equal to the fraction), so the scroll doesn't step through 15 frames a second.
- **Walk 2** regenerated in **Kling O3 Pro 1080p (90 credits)** with a drone prompt that walks physically through the arch: `transitions/v2/t2-pro.mp4`. Seams 0.989/0.987.
- **Phone turn toward the arch** per walk (`PHONE_TURN` in build-rooms-json: t1 1, t2 0.6, t3 0.6, t4 0), chosen by side-by-side comparison of 0/0.6/1. Override with `?turn=x` for testing.
- Tried and rejected: automatic heading detection (`tools/aim-map.js`). On check it pointed walk 1 to the left while the arch is on the right, so it is unreliable and not used.
- Balance after this round: 170.3.

## Round 4 — Yossi on a real phone: "things appear and disappear, distortions"
**Diagnosis:**
1. **Morphing** (a table appears, a sofa disappears, the arch content changes): first→last frame generation between two rooms that were each created separately. The view through the arch doesn't show the next room, so Kling has to invent a path and bends objects along the way. A prompt alone won't fix it.
2. **Smearing/double image in the tunnel:** my frame blending across fast steps. → Moved to **24fps** (121 frames per walk) and blend only where `steps[i] < 0.12` (per-step motion from motion-map); on fast steps the nearer single frame is shown.
3. **Phone blur:** phones got 960 frames and enlarged the middle → phones now get 1280 frames with a light sharpen (`unsharp`).
**New walk method ("hidden cut through a doorway")** — tested on walk 3 (events → AI):
- Part A: image→video from the hall only (no forced end frame) — the camera walks into the arch. Part B: image→video from the AI room only, the camera pulls back through a doorway — **played in reverse**. Nothing to "reach for" = no morphing (checked frame by frame).
- Join (`transitions/v2/t3-join.mp4`): A pushes into the dark part of the arch (zoom done with per-frame scale and a fixed crop; **crop in ffmpeg evaluates w/h only once!**), fades to the site's dark color 0x0b2a33 over 0.6s, B fades in from it and opens up. No moment of double image and no blank frame.
- Phone: the turn toward the arch only until the dark moment (`JOIN_AT`/`turnUntil`), holds on the arch, and resets inside the darkness.
- Clip cost: 2 × 70 = 140. **Balance: 30.3.**
**Checks that were tried and rejected:** motion-compensated morph detection (`tools/qa/morph.js`) — gave the known morph (old t2) the *lowest* score, so content is checked by eye frame by frame.
**To convert the remaining walks (t1, t2, t4, exit) to the new method:** 8 clips — 560 (Standard) or 720 (Pro 1080p). Needs a top-up of credits.

## Round 5 — walks 1, 2 and 4 also on the "hidden cut" method, with no credits (10.11.2026)
- `tools/build-joins.js` builds `t1/t2/t4-join.mp4` from **existing** material: Part A = the clean part of the old clip (t1: the first 1.9s of real walking; t2/t4: only the first frame, because the morphing starts almost immediately) + a push toward the arch + fade to the dark color; Part B = the next room opens up out of the dark (the arrival still, a zoom-out that settles). The whole middle section, where the furniture warped, is not shown.
- The script also writes `assets/data/joins.json`: where the arch sits in the frame per second (`aim`). On the phone `walk()` points the vertical strip there (replaces `PHONE_TURN` for those walks). Checked in phone screenshots: you enter the arch, see the next room inside it, dark, new room.
- t3 stays on its Kling clips (the two-part one). enter/exit were not touched — they're clean (a door opening).
- Deploy: an artifact of ~1850 files timed out once in `syncing_files` (10 min); the second push went through. `loops/src` is no longer uploaded.
- Local QA: PASS (0 spikes / 0 blank / 0 errors). On the live site, on a first visit with fast scrolling, the sweep sees "stuck and then jumps" on the phone — frames that haven't finished downloading (the phone frames are now 1280). To be examined.
- **Limitation:** in t2/t4 Part A is a digital zoom on a still frame (no parallax). The full solution = 8 new Kling clips (560 Standard / 720 Pro). Balance 30.3.
- **Frame loading (b1110q):** the frames download through an ordered queue (8 in parallel; the walk on screen first; within a walk every 4th frame → every 2nd → the rest), a frame that failed is retried (up to 3 times). Until everything has arrived `seqFrame` blends between the nearest frames that did arrive (before/after) instead of "stuck and jumps". `window.__journeyLoad = {want, got}` — sweep.mjs waits on it (up to 4 min) before measuring.
- The "failures" in the live sweep were mostly `ERR_CERT_VERIFIER_CHANGED` of headless Chrome with a fresh profile + a slow line (~1MB/s) — not a site bug, but until now there was no retry at all.
- Deploy: the deployment ID = the commit SHA. After a timeout, **a new commit and push** (a `workflow run` on the same SHA got stuck again).

## Round 6 — reference video analysis (2026-11-10), plan not yet approved
Reference (user's screen recording of a "one long film" scroll site) — what makes it work:
- No fade to dark, no zoom on a still, no cuts. Every walk is real camera motion.
- The camera pans sideways (real motion blur), an arch comes into view with the NEXT room already
  visible through it, the camera walks through, the room settles. ~1s of motion, ~4s of rest.
- A foreground pillar / door frame sweeps across the lens during the pan (natural place for a hidden cut).
- One palette, one architecture, one light in all rooms.
Ours: t1/t2/t4 fade to dark in the doorway; t2/t4 part A is a digital zoom on a frozen frame
("a gate widening"); what is seen through our arches only resembles the next room, so a
first→last clip has to invent the way; the AI tunnel breaks the architecture.
Proposed (waiting for credits + approval): (1) edit each room still so its arch shows the real
next-room still (~5 credits each, gpt-image-2.5-sunburst/edit); (2) regenerate walks as Kling
first→last clips: pan toward the arch + walk through, motion blur (70 credits Standard 720p 5s);
(3) pillar wipe as a fallback join; (4) prove on ONE walk first (~75 credits). Balance: 30.3.

## Round 7 — phone landing page (2026-11-10)

Feedback from people who saw the site: "amazing, but it does not convert" and "show me the phone, most visitors come from there". Decision with Yossi: the desktop journey stays as it is for now; phones get a light landing page. The walk regeneration (Round 6 plan) is postponed.

- **`m.html`** (root, self-contained CSS + small inline script; reads works from `assets/data/site-data.js`):
  hero (exterior still + `exterior-m` loop, headline "סרטונים שמביאים לכם לקוחות.", three proof chips, WhatsApp button) → "עבודות נבחרות" row of six → three room sections (business / events / AI: room still + tiny loop as a band, a sideways row of 9:16 cards, a WhatsApp button with a ready message for that kind of job) → prices (each with "מעניין אותי" that opens WhatsApp with the package named) → process → about → final CTA + call link + link to the full tour.
  A bar with WhatsApp + phone stays at the bottom once the first button has scrolled away.
- Cards: blurred placeholder → poster when near the screen → the 7 s preview plays only while the card is >60% visible. Tap opens the full video (Kolbo CDN) in a `<dialog>` with "אני רוצה סרטון כזה" (WhatsApp message names the work). Save-Data / reduced motion: stills only.
- **Redirect:** `index.html` sends screens under 768px to `m.html` (script right after the viewport meta — before it, phones still report a 980px layout and the check fails). `index.html?full=1` skips the redirect; the landing links to it. QA on the journey must use that URL: `bash tools/qa/run-all.sh "http://localhost:5173/index.html?full=1"` (PASS, 0 spikes on desktop and mobile).
- Deploy workflow copies `m.html` too.
- **New work:** `aron-kodesh` (business, "ארון קודש בעבודת יד", Drive IMG_8603, uploaded 2026-11-10). Full video on the Kolbo CDN (free upload, balance stayed 30.3). 35 works now. The client name is not known — ask Yossi.
- Other files uploaded to Drive on 2026-11-10 and looked at, not added: IMG_8451 (ועידת הגבאים conference, a good candidate for events), IMG_8706 (drive to the Bichler tower), IMG_9252 (Bichler, we already have one), IMG_9260 (לערנען outdoor day), IMG_8833 (Karlin fundraising, we already have four Karlin videos).
- **Testimonials:** Yossi asked for invented WhatsApp screenshots. Not done: fake reviews shown as real mislead customers and invented phone numbers can belong to real people. The page shows the two real results we have (Itamar Shalom, Karlin) on their cards. Needed from Yossi: 3–4 real client messages (screenshots), then a "מה אומרים" section goes in.
- No analytics yet (needs an account). Kolbo credits spent this round: 0.

## Round 8 — phone page after feedback from colleagues (2026-11-10)

Feedback (WhatsApp group of video people, shown by Yossi as a screen recording):
- "still messy, the videos repeat"; "too many AI-graphics transitions, go cleaner, let the videos be the stage";
  "takes long to scroll to the footage, add tabs"; "open the page with your own video, not an image";
  one person: "don't publish prices" and "go white".

Done in m.html (0 credits):
- Hero is now a reel of the work itself: assets/media/hero/reel-m.mp4 (6 works x 1.8s, 540x960, 1.2MB, no audio)
  + reel-m.webp poster. Autoplays muted; Save-Data / reduced motion keep the still.
- Room pictures and room loops removed from the phone page; plain headings instead.
- Three jump buttons in the hero + sticky tabs (business / events / AI / prices), current section lit.
- "Featured" row removed, so every work appears once. The showreel (perfume ad) opens the business row.
- Not done, waiting for Yossi: removing prices; white theme. Both are business/brand calls.
- 2026-11-10, Yossi's decision: price list removed from the phone page (m.html). Fourth tab is now "contact". Desktop site unchanged.
- 2026-11-10, Yossi's decision: price list (and its terms) removed from the desktop site too. No prices are shown anywhere on the site now.
  The last published prices, for reference only: field reel 1,300; AI marketing video 1,000; complex AI production from 3,500; monthly retainer 4,200 (4 videos).

## Round 9 — opening reel with more AI, coffee out (2026-11-11)
- Hero reel rebuilt: 9 clips x 1.5s (whale from ai-sukkah, savanna / jungle / dolphins from ai-5211, car, orchestra,
  Itamar, Slichti, Aron Kodesh). 1.4MB. Opens on the whale, not the car.
- `coffee` removed everywhere (Yossi: "wrong ad"). Its file is still in the Kolbo library, just not linked.
- Added `gabbaim` (events, "ועידת הגבאים", client "מיט א ברען", Drive 13BS5Md…, preview start 8s). 0 credits.
- Deploy tip: when a Pages deploy times out, start a NEW run (`gh workflow run pages.yml`), a rerun fails on duplicate artifacts.
- Open: desktop walk as a real walking film (needs credits + Yossi's approval of the amount).

## Round 10 — walk 2 as a real walk (proof, 75 credits approved by Yossi, 2026-11-11)
| what | model | credits |
|---|---|---|
| business still edited so its arch shows the real events hall | gpt-image-2.5-sunburst/edit, 1K medium | 5 |
| business → events walk, first→last frame, 5s 720p, no sound | kling-video/o3/standard/image-to-video | 70 |
Balance 11,130.3 → 11,055.3.
- The edit redraws the whole room slightly (SSIM vs old still 0.43 outside the arch), so the edited picture
  IS the business room now: `stills/v6-business.png` → `rooms/business-*`. The business living loop was made from
  the old picture, so it is parked in `loops/unused/` (the room stands still for now). t1 join rebuilt on the new still.
- Clip: `transitions/v2/t2-walk.mp4` → `sequences/t2` (121 frames, 13MB d+m). t2 removed from build-joins / joins.json.
- Result, checked frame by frame: walks forward, turns right, passes the arch with motion blur, hall opens, settles.
  No furniture morphing. Small flaws: the carpet seen through the arch curves and then straightens; for a few
  frames in the doorway a second piano shape shows.
- QA: sweep PASS (0 spikes / 0 blank / 0 errors). clips.sh flags t2 end seam 0.835 (<0.90): the last Kling frame has
  the same content as the events still but is softer; the 5-frame crossfade covers it. Start seam 0.989.
- Prompt that worked (keep for t1/t3/t4): "One continuous first-person steadicam walk, eye level, no cuts. The camera
  walks forward a few steps, turns right toward the glowing arched doorway where the next room is already visible,
  walks straight through with natural motion blur as the door frame passes the lens, continues in and settles
  centered. Real physical camera movement with parallax. Everything stays solid and fixed: nothing morphs. No people."
- Next if approved: t1, t3, t4 the same way = 3 × 75 = 225. Each also replaces its room's living loop (a new loop is 70 more each).
- Before/after: review/t2-before-after.mp4 (top = before, bottom = after).

## Round 11 — walks 3 and 4 as real walks; walk 1 rejected (2026-11-11, 225 approved, 210 spent)
| what | model | credits |
|---|---|---|
| t1 studio → business (REJECTED, not on the site) | kling-video/o3/standard, 5s 720p | 70 |
| t3 events → AI | same | 70 |
| t4 AI → office | same | 70 |
Balance 11,055.3 → 10,845.3. The 15 planned for image edits were not spent.
- **Arch view without AI:** the AI edit redraws the whole room (not alignable, SSIM 0.4), and uploads turn PNG into JPG so
  mask inpainting is not available. Instead the next room's own still (centre slice) is pasted into the arch with a
  feathered arch-shaped mask (ffmpeg). The room stays pixel-identical elsewhere, so arrivals stay seamless and the
  living loops are kept: the same patch (`assets/media/arch/<room>.png`) is overlaid on `loops/src/<room>.mp4`.
  Arch boxes (1280x714; L R top shoulder bottom): studio 1030 1143 100 167 436 · events 1107 1207 117 180 425 · ai 1087 1213 100 193 533.
  Done for events and ai. Studio was reverted (see t1).
- t3-walk, t4-walk: checked frame by frame — real turn + walk through the arch (t4: a stone pillar sweeps across the
  lens, then the office). Seams: t3 0.984/0.971, t4 0.982/0.980. The journey is lighter: 693 frames instead of 789
  (the old two-part t3 was 242 frames).
- **t1 rejected:** the camera hardly moves; a ghost arch slides across the room and the tripods melt into the meeting
  room — exactly the distortion we are removing. Kept in `transitions/v2/rejected/t1-walk-morph.mp4`, not used.
  t1 stays on the old hidden-cut join and the studio keeps its old still and loop. Likely cause: the studio arch is
  half hidden behind the camera tripod, so the model has no clear path. A retry needs approval (70).
- JOIN_AT emptied, PHONE_TURN t3/t4 = 0.6, t4 removed from build-joins / joins.json.
- QA: sweep PASS both sizes (0 spikes / 0 blank / 0 errors); clips.sh still flags only t2's soft landing (0.817).

## Round 12 — walk 1 retry accepted (2026-11-11, 70 approved, 70 spent)
- Balance 10,845.3 → 10,775.3. `transitions/v2/t1-walk.mp4` (Kling O3 Standard, 5s 720p). All four room-to-room walks are now real camera moves.
- What changed in the prompt: "from the very first second the camera physically moves: pans right and walks diagonally
  forward to the right"; the tripod and light stand "stay fixed and slide out of frame as the viewer walks past";
  "the doorway does not move by itself". Result: the camera pans right, the wall between the rooms sweeps across the
  lens, the meeting room is revealed and settles. Seams 0.985 / 0.981.
- Flaws: it is a wall sweep more than a walk through the middle of the arch; for a few frames the film camera on the
  tripod is a dark blurred shape and a light stand shows at the left edge.
- Studio now has the arch patch too (still + loop). joins.json is empty; build-joins.js has no walks left.
- QA: desktop sweep clean. Phone sweep: 1 spike (x3.5) at the stone pillar crossing the narrow phone crop in t4 —
  two neighbouring frames, cannot be subdivided; more scroll there (DOORS t4 weight 2) brought it from 58 to 34.
  clips.sh still flags t2's soft landing (0.817).
- Review file: review/walks-all.mp4.

## Round 13 — business loop, jump buttons, client name (2026-11-11)
- **Business living loop** (70 credits, approved by Yossi; balance 10,775.3 → 10,705.3): Kling O3 Standard, first = last =
  the v6 business still, locked camera. `loops/src/business.mp4` → `business-{d,m}.mp4`. Camera locked (SSIM vs the
  still constant 0.924 through the clip); motion is very subtle (frame vs frame 0.985).
- `tools/build-loops.sh` now lays `assets/media/arch/<scene>.png` over a loop by itself when the patch exists.
- **Jump buttons on desktop** (`#jump` in the stage, top corner, hidden under 768px): business / events / AI jump straight
  to the room (12% into its rest segment, instant), contact goes to #office. The current room's button is lit (setUI).
  Gotcha: in a JS String.replace replacement a doubled dollar sign becomes a single one; that broke the query-all helper once.
- Aron Kodesh client: **גילופי מלכות** (from Yossi).
- Still waiting from Yossi: 3–4 real client testimonial screenshots.

## Round 14 — room doors and one address (2026-11-11)
- Jump buttons redesigned as small doors: an arch with the room's own picture + "חדר העסקים / חדר האירועים / חדר ה־AI",
  a "ישר לחדר" caption, bigger type, lit when you are in that room. Desktop only.
- **One address for everyone:** phones opening the plain address are sent to m.html, and m.html then puts the plain
  address back in the address bar (history.replaceState), so a link copied from a phone is the plain address.
  A computer that opens m.html is sent to the journey. Overrides for testing: `index.html?full=1` (journey on a phone),
  `m.html?m=1` (phone page on a computer). The two conditions are exact opposites, so there is no redirect loop.
- Note: links I gave Yossi earlier ended in `?full=1`, which is why his phone showed the desktop journey.

## Round 15 — slow connections (2026-11-11)
Yossi: "stuck on the computer, scrolling is bad, maybe the walks don't load because of reception". Measured on his
computer: about 700 kbit/s, 650 ms latency. At that speed one walk (5 MB of frames) takes close to a minute, and
30 work posters were loading before the first picture (exterior still arrived after ~12 s).
- **Light copy of every walk:** `assets/media/sequences/<id>/l/` = every 3rd frame, 480x268, q40 (about 0.4 MB a walk).
  Built by `tools/build-lite.sh` (also called at the end of build-seqs.sh). journey.js loads all light copies before
  any full frame (`quick` queue, `loadLite`), and `seqFrame` uses a light frame wherever the full one is missing.
- **Load order:** exterior still first (preloaded with high priority; nothing of the walks starts before it, 4 s
  safety timeout) → light copy of the front-door walk → the rest. While a room picture is on its way the walk frames
  drop to 2 at a time (`urgent`). The exterior living loop waits for the front-door light copy.
- **Posters are lazy:** a room's screens get their posters only after that room's own picture has loaded (`wake`).
- **No black screen:** a room whose picture has not arrived is drawn from its inline blurred stand-in (`lq`).
- **No double picture:** frames far apart (still loading) hold and cross over quickly instead of a long blend.
- Jump-button thumbnails are now 80x96 files (`rooms/<id>-thumb.webp`, 1.5 KB each instead of 35 KB).
- Redirect guard: `screen.width` of 0 (hidden/embedded window) no longer counts as a phone.
- Test: `node tools/qa/slow.mjs [url] [kbps] [latencyMs]` (throttled headless Chrome). Local result at 700 kbit/s:
  first picture 4.7 s, front-door walk usable ~9–12 s (before: no walk frames at all in that time). The local server
  is HTTP/1.1, the live site is HTTP/2, so live should be somewhat better. Normal-speed QA unchanged
  (same two known flags: t2 landing, t4 phone spike).
- Not checked: whether part of the stutter is the computer itself (CPU), the browser pane was hidden so frame
  timing could not be measured.
