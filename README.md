# לוח שנה עברי-לועזי

## הפרומפט ההתחלתי
```
אני רוצה לוח שנה עברי לועזי שיציג את התאריך העברי והלועזי בכל יום, ויאפשר לעבור בין חודשים.
צריך להיות אפשרות להציג את הלוח בעברית או באנגלית.
```

## תיאור הפרויקט
לוח שנה עברי-לועזי אינטראקטיבי המציג את התאריכים העבריים והלועזיים במקביל. הלוח נבנה באמצעות JavaScript טהור ומשתמש בספריית Hebcal לחישובי תאריכים עבריים.

## תכונות עיקריות
1. **תצוגה דו-לשונית**
   - תצוגת תאריכים בעברית ובלועזית
   - אפשרות להחלפה בין תצוגה עברית-לועזית ללועזית-עברית
   - כפתור החלפת תצוגה מתעדכן בהתאם למצב הנוכחי:
     * במצב עברי-לועזי: מציג "לועזי עברי"
     * במצב לועזי-עברי: מציג "עברי לועזי"
   - הצגת שמות חודשים לצד התאריכים המשניים:
     * במצב עברי-לועזי: תאריך לועזי עם שם החודש המקוצר (למשל: "15 ינו'")
     * במצב לועזי-עברי: תאריך עברי עם שם החודש המלא (למשל: "ט"ו שבט")

2. **ניווט בלוח**
   - תצוגה נפרדת של שנה וחודש
   - ניווט נוח בין חודשים ושנים:
     * כפתורי ניווט נפרדים לשנה ולחודש
     * חצים בגודל מותאם שמשתנה יחסית לגודל הפונט
   - מעבר בין חודשים עבריים
   - טיפול מיוחד בחודש אדר בשנים מעוברות (אדר א' ואדר ב')
   - מעבר אוטומטי בין שנים

3. **הגדרות מותאמות אישית**
   - בחירת גודל טקסט (קטן, בינוני, גדול)
   - בחירת צבע נושא (כחול, ירוק, כתום)
   - אפשרות להצגת/הסתרת אירועים
   - שמירת ההגדרות ב-localStorage

4. **ממשק משתמש**
   - עיצוב מודרני ונקי
   - תמיכה מלאה בעברית (RTL)
   - חלונות מודאליים לפרטי יום והגדרות
   - הודעות Toast לעדכוני מערכת

## טכנולוגיות
- HTML5
- CSS3 (כולל CSS Variables)
- JavaScript (ES6+)
- [Hebcal](https://github.com/hebcal/hebcal-js) - ספריית חישובי לוח שנה עברי

## מבנה הקוד
- **`index.html`**: מבנה הדף הראשי
- **`styles.css`**: עיצוב ותצוגה
- **`app.js`**: לוגיקת היישום
  - ניהול תאריכים ולוח שנה
  - ניווט בין חודשים
  - ניהול הגדרות
  - אירועי משתמש

## תכונות מיוחדות
1. **טיפול בחודש אדר**
   - תצוגה נכונה של אדר א' ואדר ב' בשנים מעוברות
   - תצוגה של אדר רגיל בשנים רגילות
   - ניווט נכון בין החודשים בשנים מעוברות

2. **שמירת הגדרות**
   - שמירה אוטומטית של העדפות המשתמש
   - טעינת הגדרות בעת פתיחת היישום
   - החלה מיידית של שינויי הגדרות

3. **תמיכה במכשירים ניידים**
   - עיצוב רספונסיבי
   - ממשק מותאם למסכי מגע

## התקנה והפעלה
1. התקן את תלויות הפרויקט:
```bash
npm install @hebcal/core
```

2. פתח את `index.html` בדפדפן

## עדכונים אחרונים

### שיפור סדר חודשים ותצוגת לוח שנה
- שינוי סדר החודשים העבריים כך שתשרי יהיה ראשון בתצוגה
- שמירה על סדר חודשים מניסן בלוגיקה הפנימית (לפי hebcal)
- טיפול נכון בשנים מעוברות ובחודש אדר
- עדכון אוטומטי של השנה העברית הנוכחית בעת ניווט

### שיפורים בממשק המשתמש
- תמיכה בהקשת Enter בחלון הזנת שנה
- הוספת הודעות שגיאה ברורות בהזנת שנה לא תקינה
- שיפור חווית המשתמש בניווט בין שנים

### שיפור הגדרות הצגת אירועים
- הוספת מנגנון מתקדם לבקרת הצגת אירועים
- עדכון מיידי של תצוגת אירועים בהגדרות
- טיפול בטעויות בהמרת תאריכים בעת עדכון הגדרות
- הוספת בדיקות תקינות למניעת שגיאות בעת עדכון הגדרות

### שיפורים בקלט שנה וחודש
- הוספת תמיכה בהזנת שנים עבריות עם אותיות
- יישום המרה מדויקת של שנים עבריות למספרים
- תמיכה בהזנת שנים מלאות (4 ספרות)

### שיפורים בבחירת יום ופרטי יום
- הוספת אפשרות לבחירת יום בלוח השנה עם סימון ויזואלי
- שיפור עיצוב התאריך המשני בתא שנבחר
- שדרוג חלון פרטי יום:
  * תצוגה משופרת של תאריך עברי ולועזי
  * הצגת אירועים ומועדים מיוחדים
  * הצגת זמני זריחה ושקיעה
  * אנימציות חלקות בפתיחה וסגירה
  * סגירת חלון בלחיצה על X או מחוץ לחלון

### יתרונות
- ממשק משתמש גמיש ואינטואיטיבי
- תיקון אוטומטי של קלט לא תקין
- הודעות שגיאה ברורות

## משימות להמשך
- [ ] השלמת פונקציונליות מלאה של שינוי חודש
- [ ] טיפול במעברים בין שנים בעת בחירת חודש
- [ ] אופטימיזציה של קוד הבחירה והניווט

### הערות לפיתוח
- יש להמשיך ולשפר את הטיפול בבחירת חודשים
- לוודא תמיכה מלאה בשנים מעוברות ובחודשים העבריים

## פיתוח עתידי
- הוספת תמיכה באירועים ומועדים יהודיים
- הוספת זמני כניסת ויציאת שבת
- אפשרות ליצוא והדפסת לוח שנה
- סנכרון עם יומן Google
- תמיכה במיקומים שונים לחישוב זמנים

## תכונות מתקדמות בהזנת שנה

### הזנת שנה עברית
- תמיכה בהזנת שנים עבריות בפורמטים שונים:
  * עם גרשיים: "תשפ"ה"
  * ללא גרשיים: "תשפה"
  * עם אלפים: "ה' תשפ"ה"
- טווח תקף: בין השנים 5000-6000 בלוח העברי
- המרה אוטומטית של אותיות עבריות למספרים

### הזנת שנה לועזית
- חישוב דינמי של טווח השנים הלועזיות בהתאם לאלף החמישי
- הגבלת הזנה לשנים התואמות את האלף החמישי בלוח העברי
- תמיכה בהזנת שנים מלאות (4 ספרות)

### יתרונות
- ממשק משתמש גמיש ואינטואיטיבי
- תיקון אוטומטי של קלט לא תקין
- הודעות שגיאה ברורות

### שיפורים בעיצוב ובחווית המשתמש
- שיפור הבחנה ויזואלית בין ימי החודש הנוכחי לימים מחודשים סמוכים
  * רקע אפור כהה לימים מחוץ לחודש הנוכחי
  * שמירה על צבע טקסט אפור לימים אלו
- מירכוז מדויק של התאריך הראשי בכל תא
  * שימוש ב-flexbox למירכוז
  * מיקום אבסולוטי עם transform
  * הגדלת גודל הטקסט של התאריך הראשי
