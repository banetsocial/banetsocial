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
