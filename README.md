# TripPlannerSystem ✈️🌍

מערכת מתקדמת לניהול, חיפוש והזמנת טיולים המבוססת על ארכיטקטורת **Angular Standalone** בשילוב **Angular Signals** לניהול המצב (State), ועובדת מול שרת **JSON Server** כ-REST API.

---

## 📂 מבנה התיקיות המרכזי בפרויקט
* `src/app/model/` - מכיל את הגדרות ה-Interfaces והמודלים של הנתונים (`trip.ts`, `booking.ts`, `user.ts`).
* `src/app/services/` - שכבת השירותים והלוגיקה העסקית, האחראית על פניות ה-API וניהול ה-State הכללי.
* `src/app/Pages/` - קומפוננטות עמודים מרכזיות (עמוד הבית, כל הטיולים, הטיולים שלי, טיול בודד, ועמודי ניהול אדמין).
* `src/app/components/` - קומפוננטות עצמאיות לשימוש חוזר (כרטיסי טיול רגילים ומוזמנים).

---

## 🛠️ שירותים (Services) ותפקידם במערכת

### 1. `APIService`
* **נתיב:** `src/app/services/APIService.ts`
* **תפקיד:** גנריזציה של בקשות HTTP המרכזת את העבודה מול ה-Base URL של השרת. משתמש ב-`HttpClient` לביצוע פעולות `get`, `post`, `put`, ו-`delete`.

### 2. `AuthService`
* **נתיב:** `src/app/services/AuthService.ts`
* **תפקיד:** ניהול הזדהות משתמשים. מחזיק Signal מרכזי בשם `currentUser` שמייצג את המשתמש המחובר הנוכחי במערכת, ומספק פונקציות להתחברות, הרשמה וניתוק (`logout`).

### 3. `TripsService`
* **נתיב:** `src/app/services/TripsService.ts`
* **תפקיד:** ניהול מידע הטיולים (למשתמשים ולאדמין). מחזיק Signal בשם `allTrips` ומספק פונקציות למשיכת טיולים (`getTrips`), הוספת טיול חדש על ידי אדמין (`addTrip`), עדכון טיול קיים (`updateTrip`), ומחיקת טיול מהמערכת (`deleteTrip`).

### 4. `bookingService`
* **נתיב:** `src/app/services/bookingService.ts`
* **תפקיד:** ניהול ההזמנות במערכת. מחזיק Signal בשם `allBookings` ומספק את פונקציית `loadBookingsByUserId(userId)` השולפת מהשרת ומסננת את ההזמנות ששייכות אך ורק למשתמש הנוכחי.

---

## 🔄 זרימות עבודה מרכזיות במערכת (System Flows)

### 🔑 תהליך ההתחברות (Login Flow)
1. המשתמש מזין פרטים בקומפוננטת ה-Login.
2. המערכת פונה ל-`AuthService` שמאמת את הפרטים מול השרת באמצעות `APIService`.
3. עם הצלחת האימות, האובייקט נשמר ב-Signal המרכזי `currentUser` ב-`AuthService`.
4. מתבצע ניתוח אוטומטי בעזרת `Router` לעמוד הבית (`/home`).
5. קומפוננטת `Home` קוראת את הסיגנל `user = this.authService.currentUser` ומציגה דינמית מעל לחצני הניווט את ברכת המשתמש: `@if (user()) { שלום, {{ user()?.name }} }`.

### 📅 תהליך הזמנת טיול (Booking Flow)
1. בעמוד כל הטיולים, לחיצה על כרטיס מובילה לקומפוננטת `SingleTrip`.
2. הקומפוננטה מחלצת את מזהה הטיול דרך ה-URL באמצעות `ActivatedRoute` ומציגה את הנתונים כלייב דרך Signal מחושב: `trip = computed(() => this.tripService.getTripById(...))`.
3. בלחיצה על כפתור הרישום מופעלת הפונקציה `bookTrip()`.
4. הפונקציה יוצרת אובייקט הזמנה המכיל את `tripId`, ה-`userId` וכמות הנוסעים `people`, ושולחת אותו ב-`POST` לשרת. עם קבלת התשובה בהצלחה, מתבצע עדכון מיידי של ה-State המקומי: `this.bookingService.allBookings.update(list => [...list, response])`.

### 👑 תהליך ניהול מנהל (Admin Flow)
1. בזמן התחברות המשתמש, המערכת בודקת את שדה הבוליאני `isAdmin` מתוך אובייקט המשתמש בשרת.
2. אם `user.isAdmin === true`, המערכת חושפת בסרגל הניווט העליון או בעמוד הבית כפתורים ואפשרויות ייעודיות לניהול (כגון הוספת טיול, עריכה או מחיקה).
3. פעולות האדמין מתבצעות ישירות מול השרת דרך פונקציות `addTrip`, `updateTrip` ו-`deleteTrip` בקובץ `TripsService.ts`.
4. המערכת מגינה על נתיבי הניהול כך שמשתמש רגיל שאינו אדמין (`isAdmin: false`) לא יוכל לצפות או לבצע שינויים בטיולים הגלובליים, וכפתורי הניהול מוסתרים ממנו ב-UI בעזרת תנאי `@if (user()?.isAdmin)`.

---

## 🚦 ניהול מצב וחלוקת אחריות (State Management)

המערכת משתמשת ב-**Angular Signals** לניהול מצב ריאקטיבי, המפריד לחלוטין בין שכבת התצוגה (Components) לשכבת המידע והלוגיקה (Services):

* **הפרדת לוגיקה:** הקומפוננטות אחראיות אך ורק על רינדור ה-UI והקשבה לאירועי משתמש. כל ניהול המידע, קריאות ה-HTTP ועדכון המצב מרוכזים בתוך ה-Services.
* **צריכת מידע דינמית:** בקומפוננטת `MyTrips`, המערכת משתמשת ב-`computed` כדי לבצע מיזוג (Join) בזמן אמת בין סיגנל ההזמנות לסיגנל הטיולים. מנגנון זה מבטיח שאם הזמנה מבוטלת או מוסרת, עדכון הסיגנל המרכזי יגרום לכרטיס להיעלם מהמסך באופן מיידי.

---

## 🔍 הפניות ישירות לקוד ומזהים מרכזיים

* **בדיקת הרשמה כפולה (Double Booking Prevention):**
  * **קובץ:** `src/app/Pages/single-trip/single-trip.ts`
  * **פונקציה:** `isUserBooked(tripId)`
  * **מימוש ב-UI:** משתמש ב-`[disabled]="isUserBooked(currentTrip.id)"` כדי לחסום את כפתור הרישום.

* **סינון ומיון (Filtering & Sorting):**
  * **קובץ:** `src/app/Pages/all-trips/all-trips.ts`
  * **סיגנלים משפיעים:** `searchTerm = signal<string>('')`, `sortBy = signal<string>('none')`.
  * **פונקציה מרכזית:** `filteredAndSortedTrips = computed(...)` המבצעת סינון live לפי יעד/שם הטיול ומיון מערך הנתונים לפי מחיר, ומזינה את הלולאה המתקדמת `@for` ב-HTML.

* **ניהול טיולים ע"י מנהל (Admin Trip Management):**
  * **קובץ שירות:** `src/app/services/TripsService.ts`
  * **פונקציות מפתח:** `addTrip(trip)`, `updateTrip(trip)`, `deleteTrip(tripId)`.
