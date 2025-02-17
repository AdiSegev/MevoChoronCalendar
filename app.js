const { HebrewCalendar, HDate, Location, Event } = window.hebcal;

// הגדרת ברירת המחדד לשפה העברית
HebrewCalendar.defaultLocale = 'he';
Event.defaultLocale = 'he';  // חשוב להגדיר גם את ברירת המחדד של האירועים

// אתחול משתנים גלובליים
let currentDate = new Date();
let selectedDate = new Date(); // אתחול selectedDate עם תאריך היום הנוכחי
let isHebrewDisplay = true;
let settings = loadSettings();
let currentHebrewYear = 5785; // Initialize with current Hebrew year

// הוספת המשתנים כגלובליים
window.excelTableHeaders = [];

// Function to update current Hebrew year
function updateCurrentHebrewYear() {
    const hebDate = new HDate(selectedDate);
    currentHebrewYear = hebDate.getFullYear();
}

// Call this when the page loads
function initializeCurrentHebrewYear() {
    updateCurrentHebrewYear();
}

// פונקציה לעדכון הגדרות
function updateSettings(newSettings) {
    settings = { ...settings, ...newSettings }; // מיזוג ההגדרות החדשות עם הקיימות
    saveSettings(settings); // שמירת ההגדרות המעודכנות
    applySettings(settings); // החלת ההגדרות המעודכנות
}

// הגדרת מיקום ברירת מחדד (ירושלים)
const defaultLocation = Location.lookup('Jerusalem');

// מערך שמות החודשים העבריים
const hebrewMonthOrderLogic = [
    'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול',
    'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט', 'אדר'
];

const hebrewMonthOrderLogicLeap = [
    'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול',
    'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט', 'אדר א\'', 'אדר ב\''
];

const hebrewMonthOrder = [
    'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט', 'אדר',
    'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול'
];

const hebrewMonthOrderLeap = [
    'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט', 'אדר א\'', 'אדר ב\'',
    'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול'
];

// Helper function to convert display order to logic order
function getLogicMonthIndex(displayName, year) {
    const logicOrder = isLeapYear(year) ? hebrewMonthOrderLogicLeap : hebrewMonthOrderLogic;
    return logicOrder.indexOf(displayName);
}

// Function to get month names based on display mode
function getMonthNames(year) {
    const months = [];
    const isHebrew = isHebrewDisplay;

    if (isHebrew) {
        // Use the display order for the dropdown
        const monthOrder = isLeapYear(year) ? hebrewMonthOrderLeap : hebrewMonthOrder;
        monthOrder.forEach(monthName => {
            months.push(monthName);
        });
    } else {
        // Gregorian months in order
        for (let i = 1; i <= 12; i++) {
            const monthDate = new Date(year, i - 1, 1);
            months.push(monthDate.toLocaleString('he', { month: 'long' }));
        }
    }

    return months;
}

// פונקציה להמרת מספר לאותיות בעברית
function numberToHebrewLetters(number) {
    const units = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'];
    const tens = ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'];
    const hundreds = ['', 'ק', 'ר', 'ש', 'ת', 'תק', 'תר', 'תש', 'תת', 'תתק'];
    const thousands = ['', 'א', 'ב', 'ג', 'ד', 'ה'];

    // מוסיף גרש או גרשיים בהתאם לצורך
    function addQuotes(str) {
        if (str.includes('"')) return str;
        if (str.length === 1) {
            return str + "'";
        } else if (str.length > 1) {
            return str.slice(0, -1) + '"' + str.slice(-1);
        }
        return str;
    }

    // מטפל במספרים מיוחדים שצריך להימנע מהם
    function avoidProblematicCombinations(str) {
        str = str.replace('יה', 'ט"ו');
        str = str.replace('יו', 'ט"ז');
        return str;
    }

    let result = '';

    // טיפול באלפים
    const numThousands = Math.floor(number / 1000);
    if (numThousands > 0) {
        result += thousands[numThousands];
        number %= 1000;
    }

    // טיפול במאות
    const numHundreds = Math.floor(number / 100);
    if (numHundreds > 0) {
        result += hundreds[numHundreds];
        number %= 100;
    }

    // טיפול בעשרות ויחידות
    if (number > 0) {
        const numTens = Math.floor(number / 10);
        const numUnits = number % 10;

        if (numTens > 0) {
            result += tens[numTens];
        }
        if (numUnits > 0) {
            result += units[numUnits];
        }
    }

    // טיפול במקרים מיוחדים והוספת גרשיים
    result = avoidProblematicCombinations(result);
    result = addQuotes(result);

    return result;
}

// מיפוי של אותיות עבריות למספרים
const hebrewAlphabetValues = {
    'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5,
    'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9, 'י': 10,
    'כ': 20, 'ל': 30, 'מ': 40, 'נ': 50, 'ס': 60,
    'ע': 70, 'פ': 80, 'צ': 90, 'ק': 100, 'ר': 200,
    'ש': 300, 'ת': 400
};

function convertHebrewYearToNumber(hebrewYear) {
    // הסרת רווחים
    hebrewYear = hebrewYear.trim();

    // בדיקה אם זו כבר שנה מספרית
    if (/^\d+$/.test(hebrewYear)) {
        const num = parseInt(hebrewYear);
        return num >= 5000 && num <= 6000 ? num : null;
    }

    // המרה של שנה עברית לטקסט
    const thousandsMap = {
        'ה': 5000,
        'ו': 6000
    };

    // בדיקה עם אלפים
    const thousandsMatch = hebrewYear.match(/^[הו]'/);
    let baseThousand = 5000;
    if (thousandsMatch) {
        baseThousand = thousandsMap[thousandsMatch[0][0]];
        hebrewYear = hebrewYear.replace(/^[הו]'/, '');
    }

    // תמיכה בהזנה עם וללא גרשיים
    const quotedVersions = [
        hebrewYear.replace(/"/g, ''),  // ללא גרשיים
        hebrewYear                     // עם גרשיים
    ];

    for (let version of quotedVersions) {
        let total = 0;
        let validVersion = true;

        for (let char of version) {
            if (hebrewAlphabetValues[char] !== undefined) {
                total += hebrewAlphabetValues[char];
            } else if (char !== '"' && char !== "'" && char !== ' ') {
                validVersion = false;
                break;
            }
        }

        if (validVersion && total > 0) {
            return baseThousand + total;
        }
    }

    return null;
}

function hebrewLettersToNumber(str) {
    // הסרת גרשיים וגרש
    str = str.replace(/['"]/g, '');

    // טיפול במקרים מיוחדים
    str = str.replace('טו', 'טו');  // 15
    str = str.replace('טז', 'טז');  // 16

    const values = {
        'א': 1, 'ב': 2, 'ג': 3, 'ד': 4, 'ה': 5,
        'ו': 6, 'ז': 7, 'ח': 8, 'ט': 9, 'י': 10,
        'כ': 20, 'ל': 30, 'מ': 40, 'נ': 50, 'ס': 60,
        'ע': 70, 'פ': 80, 'צ': 90, 'ק': 100,
        'ר': 200, 'ש': 300, 'ת': 400
    };

    let result = 5000;  // מתחילים מ-5000 כי זה האלף החמישי
    let i = 0;

    // הסרת ה"א בתחילת המחרוזת אם קיימת
    if (str.startsWith('ה')) {
        str = str.substring(1);
    }

    // טיפול במקרים מיוחדים
    if (str.includes('טו')) {
        result += 15;
        str = str.replace('טו', '');
    } else if (str.includes('טז')) {
        result += 16;
        str = str.replace('טז', '');
    }

    while (i < str.length) {
        let currentValue = values[str[i]] || 0;
        let nextValue = values[str[i + 1]] || 0;

        if (nextValue > currentValue) {
            result += nextValue - currentValue;
            i += 2;
        } else {
            result += currentValue;
            i++;
        }
    }

    return result;
}

function validateYearInput(input, isHebrewDisplay) {
    if (isHebrewDisplay) {
        // אם הקלט הוא מספר, נמיר אותו למספר
        let year = !isNaN(input) ? parseInt(input) : hebrewLettersToNumber(input);

        // בדיקת טווח תקין לשנים עבריות
        return (year >= 5000 && year <= 6000) ? year : null;
    } else {
        // בדיקת טווח תקין לשנים לועזיות
        const year = parseInt(input);
        if (isNaN(year)) return null;

        // חישוב הטווח המותר בהתבסס על השנים העבריות
        const minHebrewYear = 5000;
        const maxHebrewYear = 6000;
        const minGregorianYear = new HDate(1, 1, minHebrewYear).greg().getFullYear();
        const maxGregorianYear = new HDate(1, 1, maxHebrewYear).greg().getFullYear();

        return (year >= minGregorianYear && year <= maxGregorianYear) ? year : null;
    }
}

function calculateHebrewYearBoundaries() {
    // חישוב גבולות האלף החמישי בתאריך הלועזי
    const startOfFifthMillennium = new HDate(1, 1, 5000).greg();
    const endOfFifthMillennium = new HDate(1, 1, 6000).greg();

    return {
        minGregorianYear: startOfFifthMillennium.getFullYear(),
        maxGregorianYear: endOfFifthMillennium.getFullYear()
    };
}

function setupYearInput() {
    const yearDisplay = document.getElementById('currentYear');
    const yearInput = document.getElementById('yearInput');
    const yearContainer = document.querySelector('.year-input-container');

    // בדיקה שכל האלמנטים קיימים
    if (!yearDisplay || !yearInput || !yearContainer) {
        console.error('One or more year input elements are missing');
        return;
    }

    const applyBtn = yearContainer.querySelector('.apply-btn');
    const cancelBtn = yearContainer.querySelector('.cancel-btn');

    // בדיקה שכפתורי האישור והביטול קיימים
    if (!applyBtn || !cancelBtn) {
        console.error('Apply or cancel buttons are missing');
        return;
    }

    yearDisplay.addEventListener('click', () => {
        yearInput.value = isHebrewDisplay ?
            convertNumberToHebrewYear(new HDate(selectedDate).getFullYear()) :
            selectedDate.getFullYear();
        yearContainer.classList.remove('hidden');
        yearInput.focus();
    });

    applyBtn.addEventListener('click', () => {
        const validatedYear = validateYearInput(yearInput.value, isHebrewDisplay);

        if (validatedYear !== null) {
            if (isHebrewDisplay) {
                const currentHebDate = new HDate(selectedDate);
                const newDate = new HDate(
                    currentHebDate.getDate(),
                    currentHebDate.getMonth(),
                    validatedYear
                );
                selectedDate = newDate.greg();
                currentHebrewYear = validatedYear;  // Update currentHebrewYear
            } else {
                selectedDate.setFullYear(validatedYear);
            }
            renderCalendar();
            yearContainer.classList.add('hidden');
        } else {
            const errorMessage = isHebrewDisplay
                ? 'נא להזין שנה עברית תקינה בין 5000 ל-6000'
                : 'נא להזין שנה לועזית תקינה';
            showToast(errorMessage);
        }
    });

    cancelBtn.addEventListener('click', () => {
        yearContainer.classList.add('hidden');
    });

    // Add keydown event listener for Enter key
    yearInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Prevent form submission
            const validatedYear = validateYearInput(yearInput.value, isHebrewDisplay);

            if (validatedYear !== null) {
                if (isHebrewDisplay) {
                    const currentHebDate = new HDate(selectedDate);
                    const newDate = new HDate(
                        currentHebDate.getDate(),
                        currentHebDate.getMonth(),
                        validatedYear
                    );
                    selectedDate = newDate.greg();
                    currentHebrewYear = validatedYear;  // Update currentHebrewYear
                } else {
                    selectedDate.setFullYear(validatedYear);
                }
                renderCalendar();
                yearContainer.classList.add('hidden');
            } else {
                const errorMessage = isHebrewDisplay
                    ? 'נא להזין שנה עברית תקינה בין 5000 ל-6000'
                    : 'נא להזין שנה לועזית תקינה';
                showToast(errorMessage);
            }
        }
    });

    // סגירת תיבת הקלט בלחיצה מחוץ לה
    document.addEventListener('click', (e) => {
        if (!yearContainer.contains(e.target) &&
            !yearDisplay.contains(e.target) &&
            !yearContainer.classList.contains('hidden')) {
            yearContainer.classList.add('hidden');
        }
    });
}

function setupMonthSelect() {
    const currentMonthElement = document.getElementById('currentMonth');
    const monthNavigationContainer = document.querySelector('.month-navigation');

    // Create dropdown container
    const monthDropdownContainer = document.createElement('div');
    monthDropdownContainer.classList.add('month-dropdown-container', 'hidden');

    // Create dropdown
    const monthDropdown = document.createElement('div');
    monthDropdown.classList.add('month-dropdown');

    // Predefined order of Hebrew months
    const hebrewMonthOrder = [
        'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט',
        'אדר', 'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול'
    ];

    // Predefined order of Hebrew months in leap years
    const hebrewMonthOrderLeap = [
        'תשרי', 'חשוון', 'כסלו', 'טבת', 'שבט',
        'אדר א\'', 'אדר ב\'', 'ניסן', 'אייר', 'סיוון', 'תמוז', 'אב', 'אלול'
    ];

    // Function to get month names based on display mode
    function getMonthNames(year) {
        const months = [];
        const isHebrew = isHebrewDisplay;

        if (isHebrew) {
            // Hebrew months with special handling for leap years
            const isLeap = isLeapYear(year);

            const monthsToUse = isLeap ? hebrewMonthOrderLeap : hebrewMonthOrder;

            monthsToUse.forEach(monthName => {
                months.push(monthName);
            });
        } else {
            // Gregorian months in order
            for (let i = 1; i <= 12; i++) {
                const monthDate = new Date(year, i - 1, 1);
                months.push(monthDate.toLocaleString('he', { month: 'long' }));
            }
        }

        return months;
    }

    // Function to create dropdown
    function createMonthDropdown() {
        // Clear previous dropdown
        monthDropdown.innerHTML = '';

        const year = isHebrewDisplay
            ? new HDate(selectedDate).getFullYear()
            : selectedDate.getFullYear();

        const monthNames = getMonthNames(year);

        // Determine the current month name
        let currentMonthName;
        if (isHebrewDisplay) {
            const hebDate = new HDate(selectedDate);
            const monthIndex = hebDate.getMonth();
            currentMonthName = getHebrewMonthName(monthIndex, year);
        } else {
            currentMonthName = selectedDate.toLocaleString('he', { month: 'long' });
        }

        monthNames.forEach((monthName, index) => {
            const monthItem = document.createElement('div');
            monthItem.classList.add('month-dropdown-item');
            monthItem.textContent = monthName;

            // Highlight the current month
            if (monthName === currentMonthName) {
                monthItem.classList.add('current-month');
            }

            // Map month name to correct index for Hebrew and Gregorian calendars
            monthItem.addEventListener('click', () => {
                // Update selected date to the first day of the selected month
                if (isHebrewDisplay) {
                    // Find the correct month index for Hebrew calendar using the logic order
                    const monthIndex = getLogicMonthIndex(monthName, year) + 1;
                    const newHebDate = new HDate(1, monthIndex, currentHebrewYear);
                    selectedDate = newHebDate.greg();
                } else {
                    // Gregorian is straightforward
                    selectedDate = new Date(year, index, 1);
                }

                // Update current month display
                currentMonthElement.textContent = monthName;

                renderCalendar();
                toggleMonthDropdown(); // Close dropdown after selection
            });

            monthDropdown.appendChild(monthItem);
        });

        monthDropdownContainer.appendChild(monthDropdown);
        monthNavigationContainer.appendChild(monthDropdownContainer);
    }

    // Function to toggle month dropdown
    function toggleMonthDropdown() {
        monthDropdownContainer.classList.toggle('hidden');
        currentMonthElement.classList.toggle('active');
    }

    // Add click event to current month element
    currentMonthElement.addEventListener('click', () => {
        createMonthDropdown();
        toggleMonthDropdown();
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!monthNavigationContainer.contains(event.target) &&
            !monthDropdownContainer.classList.contains('hidden')) {
            toggleMonthDropdown();
        }
    });
}

// הגדרות גלובליות לאירועים
const eventOptions = {
    locale: 'he',
    isHebrewYear: true,
    candlelighting: true
};

// פונקציה לבדיקה האם השנה מעוברת
function isLeapYear(year) {
    return HDate.isLeapYear(year);
}

// פונקציה לקבלת אינדקס החודש המתוקן
function getAdjustedMonthIndex(month, year) {
    if (isLeapYear(year)) {
        if (month === 12) return 12; // אדר א׳
        if (month === 13) return 13; // אדר ב׳
    }
    return month - 1;
}

// פונקציה לקבלת אינדקס החודש הבא
function getNextMonth(month, year) {
    // בדיקה האם השנה מעוברת
    const isLeap = isLeapYear(year);

    if (month === 14) { // אלול
        return 1; // תשרי של השנה הבאה
    }

    if (isLeap) {
        // בשנה מעוברת
        if (month === 12) { // אדר א'
            return 13; // אדר ב'
        }
        if (month === 13) { // אדר ב'
            return 1; // ניסן
        }
        return month + 1;
    } else {
        // בשנה רגילה
        if (month === 12) { // אדר
            return 1; // ניסן
        }
        return month + 1;
    }
}

// פונקציה לקבלת אינדקס החודש הקודם
function getPrevMonth(month, year) {
    // בדיקה האם השנה מעוברת
    const isLeap = isLeapYear(year);

    if (month === 1) { // תשרי
        return 14; // אלול של השנה הקודמת
    }

    if (isLeap) {
        // בשנה מעוברת
        if (month === 13) { // אדר ב'
            return 12; // אדר א'
        }
        if (month === 1) { // ניסן
            return 13; // אדר ב'
        }
        return month - 1;
    } else {
        // בשנה רגילה
        if (month === 1) { // ניסן
            return 12; // אדר
        }
        return month - 1;
    }
}

// פונקציה לקבלת שם החודש העברי
function getHebrewMonthName(month, year) {
    const isLeap = isLeapYear(year);
    const monthArray = isLeap ? hebrewMonthOrderLogicLeap : hebrewMonthOrderLogic;
    return monthArray[month - 1] || '';
}

// שמירת הגדרות באחסון המקומי
function saveSettings(input) {
    // שמירת הגדרות תצוגה בנפרד
    const displaySettings = {
        fontSize: input instanceof FormData ? input.get('fontSize') : input.display.fontSize,
        themeColor: input instanceof FormData ? input.get('themeColor') : input.display.themeColor
    };

    localStorage.setItem('display-settings', JSON.stringify(displaySettings));

    // שמירת הגדרות קטגוריות האירועים
    const eventCategoriesSettings = input instanceof FormData ? {
        holidays: input.get('eventCategories.holidays') === 'on',
        weeklyPortion: input.get('eventCategories.weeklyPortion') === 'on',
        specialDays: input.get('eventCategories.specialDays') === 'on'
    } : input.eventCategories || {
        holidays: true,
        weeklyPortion: true,
        specialDays: true
    };

    localStorage.setItem('event-categories-settings', JSON.stringify(eventCategoriesSettings));

    // שמירת שאר ההגדרות כפי שהיה קודם
    const settings = input instanceof FormData ? {
        showEvents: input.get('showEvents') === 'on',
        dawnType: input.get('dawnType'),
        tzeitType: input.get('tzeitType'),
        shabbatEndType: input.get('shabbatEndType')
    } : {
        showEvents: input.showEvents,
        dawnType: input.dawnType,
        tzeitType: input.tzeitType,
        shabbatEndType: input.shabbatEndType
    };

    localStorage.setItem('settings', JSON.stringify(settings));

    applySettings(); // יש לעדכן את הפונקציה כך שתטפל בהגדרות החדשות
    renderCalendar();

    // סגירת מודאל התצוגה
    hideDisplayModal();

    // עדכון מחדש של תצוגת היום הנוכחי אם המודאל פתוח
    const dayModal = document.getElementById('dayModal');
    if (dayModal && dayModal.style.display === 'block') {
        const selectedDay = document.querySelector('.selected-day');
        if (selectedDay) {
            const date = new Date(selectedDay.dataset.date);
            showDayDetails(date);
        }
    }
}

// החלת ההגדרות על העיצוב
function applySettings() {
    const settings = loadSettings();

    // עדכון הטופס עם הערכים השמורים
    const form = document.getElementById('settingsForm');
    if (form) {
        form.fontSize.value = settings.fontSize;
        form.themeColor.value = settings.themeColor;
        form.showEvents.checked = settings.showEvents;
        form.dawnType.value = settings.dawnType;
        form.tzeitType.value = settings.tzeitType;
        form.shabbatEndType.value = settings.shabbatEndType;
    }

    // החלת גודל הטקסט
    document.documentElement.style.setProperty('--font-size-multiplier', getFontSizeMultiplier(settings.fontSize));

    // החלת צבע הנושא
    document.documentElement.style.setProperty('--theme-color', getThemeColor(settings.themeColor));

    // עדכון תצוגת האירועים
    const calendarDays = document.querySelectorAll('.day');
    calendarDays.forEach(day => {
        const eventsContainer = day.querySelector('.events');
        if (eventsContainer) {
            eventsContainer.style.display = 'block';
        }
    });

    // רענון תצוגת היום הנוכחי אם המודאל פתוח
    const dayModal = document.getElementById('dayModal');
    if (dayModal && dayModal.classList.contains('visible')) {
        const selectedDate = new Date(dayModal.dataset.date);
        showDayDetails(selectedDate);
    }
}

// אתחול הלוח
async function initCalendar() {
    try {
        renderCalendar();
        setupEventListeners();
        applySettings();
    } catch (error) {
        console.error('Error in initCalendar:', error);
        showToast('שגיאה בטעינת הלוח: ' + error.message);
    }
}

// הצגת הודעת Toast
function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    if (!toast) {
        console.error('Toast element not found');
        return;
    }
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, duration);
}

// רינדור הלוח
function renderCalendar() {
    try {
        // יישום הגדרות לפני רינדור הלוח
        applySettings();

        const daysGrid = document.getElementById('daysGrid');
        const currentMonthElement = document.getElementById('currentMonth');
        const currentYearElement = document.getElementById('currentYear');

        // הדפסת כל האירועים לחודש הנוכחי
        let monthEvents;
        if (isHebrewDisplay) {
            const hebDate = new HDate(selectedDate);
            monthEvents = getAllMonthEvents(hebDate.getFullYear(), hebDate.getMonth(), true);
        } else {
            monthEvents = getAllMonthEvents(selectedDate.getFullYear(), selectedDate.getMonth(), false);
        }

        // ניקוי הלוח הקיים
        daysGrid.innerHTML = '';

        if (isHebrewDisplay) {
            // מצב עברי-לועזי

            // המרה לתאריך עברי
            const selectedHebDate = new HDate(selectedDate);
            const hebMonth = selectedHebDate.getMonth();
            const hebYear = selectedHebDate.getFullYear();

            // מציאת היום הראשון והאחרון של החודש העברי
            const firstDayOfHebMonth = new HDate(1, hebMonth, hebYear);
            const daysInHebMonth = HDate.daysInMonth(hebMonth, hebYear);
            const lastDayOfHebMonth = new HDate(daysInHebMonth, hebMonth, hebYear);

            // המרה לתאריכים לועזיים
            const firstGregorianDate = firstDayOfHebMonth.greg();
            const lastGregorianDate = lastDayOfHebMonth.greg();

            // חישוב היום בשבוע של תחילת החודש העברי (0 = ראשון)
            const startingDay = firstGregorianDate.getDay();

            // הצגת שם החודש
            const monthName = getHebrewMonthName(hebMonth, hebYear);
            const hebrewYear = numberToHebrewLetters(hebYear);
            currentMonthElement.textContent = monthName;
            currentYearElement.textContent = hebrewYear;

            // ימים מהחודש הקודם להשלמת השבוע
            const prevMonthDays = startingDay;
            for (let i = prevMonthDays - 1; i >= 0; i--) {
                const prevDate = new Date(firstGregorianDate);
                prevDate.setDate(firstGregorianDate.getDate() - i - 1);
                createDayElement(prevDate, daysGrid, true);
            }

            // ימי החודש העברי הנוכחי
            let currentHebDate = new HDate(firstDayOfHebMonth);
            for (let i = 1; i <= daysInHebMonth; i++) {
                const currentDate = currentHebDate.greg();
                createDayElement(currentDate, daysGrid, false);
                currentHebDate = new HDate(i + 1, hebMonth, hebYear);
            }

            // ימים מהחודש הבא להשלמת השבוע האחרון
            const lastDayOfWeek = lastGregorianDate.getDay();
            const nextMonthDays = (lastDayOfWeek === 6) ? 0 : 6 - lastDayOfWeek;

            let nextDate = new Date(lastGregorianDate);
            for (let i = 1; i <= nextMonthDays; i++) {
                nextDate.setDate(nextDate.getDate() + 1);
                createDayElement(nextDate, daysGrid, true);
            }
        } else {
            // מצב לועזי-עברי

            // חישוב היום הראשון והאחרון של החודש הלועזי
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth();

            const firstDayOfMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(year, month + 1, 0);

            // חישוב היום בשבוע של תחילת החודש (0 = ראשון)
            const startingDay = firstDayOfMonth.getDay();

            // הצגת שם החודש והשנה
            const gregorianMonthName = selectedDate.toLocaleString('he-IL', { month: 'long' });
            const gregorianYear = selectedDate.getFullYear();

            currentMonthElement.textContent = gregorianMonthName;
            currentYearElement.textContent = gregorianYear;
            // ימים מהחודש הקודם להשלמת השבוע
            const prevMonthDays = startingDay;
            for (let i = prevMonthDays - 1; i >= 0; i--) {
                const prevDate = new Date(firstDayOfMonth);
                prevDate.setDate(firstDayOfMonth.getDate() - i - 1);
                createDayElement(prevDate, daysGrid, true);
            }

            // ימי החודש הנוכחי
            for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
                const currentDate = new Date(year, month, i);
                createDayElement(currentDate, daysGrid, false);
            }

            // ימים מהחודש הבא להשלמת השבוע האחרון
            const lastDayOfWeek = lastDayOfMonth.getDay();
            const nextMonthDays = (lastDayOfWeek === 6) ? 0 : 6 - lastDayOfWeek;

            let nextDate = new Date(lastDayOfMonth);
            for (let i = 1; i <= nextMonthDays; i++) {
                nextDate.setDate(nextDate.getDate() + 1);
                createDayElement(nextDate, daysGrid, true);
            }
        }

    } catch (error) {
        console.error('שגיאה ביצירת הלוח:', error);
        showToast('שגיאה בהצגת הלוח: ' + error.message);
    }
}

function clearSelectedDay() {
    // מוצא את היום שנבחר כרגע ומסיר ממנו את הסימון
    const selectedDayElement = document.querySelector('.day.selected-day');
    if (selectedDayElement) {
        selectedDayElement.classList.remove('selected-day');
    }
}

function handleDayClick(dayElement, date) {
    // הסרת הבחירה הקודמת
    clearSelectedDay();

    // הוספת סימון לתא הנבחר
    dayElement.classList.add('selected-day');

    // שמירת התאריך הנבחר
    selectedDate = new Date(date);

    // הצגת פרטי היום
    showDayDetails(date);
}

function goToToday() {
    // נאפס את היום הנבחר
    currentDate = new Date();
    selectedDate = currentDate;  // נגדיר את היום הנבחר להיום הנוכחי

    // נרנדר מחדש את הלוח
    renderCalendar();

    showToast('עברת להיום');
}

function createDayElement(date, container, isOutsideMonth) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('day');

    // הגדרת סגנון הסמן בהתאם לסוג היום
    dayElement.style.cursor = isOutsideMonth ? 'default' : 'pointer';

    if (!isOutsideMonth) {
        dayElement.classList.add('clickable');
    }

    // בדיקה אם זה היום הנוכחי
    const today = new Date();
    const isCurrentDay = !isOutsideMonth &&
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear();

    if (isCurrentDay) {
        dayElement.classList.add('current-day');
    }

    if (isOutsideMonth) {
        dayElement.classList.add('outside-month');
    } else {
        dayElement.style.cursor = 'pointer';
    }

    const hebDate = new HDate(date);

    // יצירת תצוגת התאריך
    const dateContainer = document.createElement('div');
    dateContainer.classList.add('date-container');

    if (isHebrewDisplay) {
        // תאריך לועזי בפינה
        const gregorianDate = document.createElement('div');
        gregorianDate.classList.add('secondary-date');
        const month = date.toLocaleString('he', { month: 'short' });
        gregorianDate.textContent = `${date.getDate()} ${month}`;
        dateContainer.appendChild(gregorianDate);

        // תאריך עברי במרכז
        const hebrewDate = document.createElement('div');
        hebrewDate.classList.add('primary-date');
        hebrewDate.textContent = numberToHebrewLetters(hebDate.getDate());
        dateContainer.appendChild(hebrewDate);
    } else {
        // תאריך עברי בפינה
        const hebrewDate = document.createElement('div');
        hebrewDate.classList.add('secondary-date');
        const monthArray = isLeapYear(hebDate.getFullYear()) ? hebrewMonthOrderLogicLeap : hebrewMonthOrderLogic;
        const monthIndex = hebDate.getMonth() - 1;  // getMonth() מחזיר 1-13, אנחנו צריכים 0-12
        const hebrewMonthName = monthArray[monthIndex];
        hebrewDate.textContent = `${numberToHebrewLetters(hebDate.getDate())} ${hebrewMonthName}`;
        dateContainer.appendChild(hebrewDate);

        // תאריך לועזי במרכז
        const gregorianDate = document.createElement('div');
        gregorianDate.classList.add('primary-date');
        gregorianDate.textContent = date.getDate();
        dateContainer.appendChild(gregorianDate);
    }

    dayElement.appendChild(dateContainer);

    // הוספת האירועים
    if (!isOutsideMonth) {
        const events = getFilteredEventsForDay(date);
        if (events.length > 0) {
            const eventsContainer = document.createElement('div');
            eventsContainer.classList.add('events-container');
            
            events.forEach(event => {
                const eventElement = document.createElement('div');
                eventElement.classList.add('event-text');
                eventElement.textContent = event.render('he');
                eventsContainer.appendChild(eventElement);
            });
            
            dayElement.appendChild(eventsContainer);
        }
    }

    // בדיקה אם זה היום שנבחר
    if (selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()) {
        dayElement.classList.add('selected-day');
    }

    // שמירת התאריך כמידע על האלמנט
    dayElement.dataset.date = date.toISOString();

    // הוספת אירוע לחיצה
    if (!isOutsideMonth) {
        dayElement.addEventListener('click', () => {
            // הסרת הבחירה הקודמת
            clearSelectedDay();

            // הוספת סימון לתא הנבחר
            dayElement.classList.add('selected-day');

            // שמירת התאריך הנבחר
            selectedDate = new Date(date);

            // בדיקה אם זה היום הנוכחי
            if (isCurrentDay) {
                dayElement.classList.add('current-day');
            }

            // הצגת פרטי היום
            showDayDetails(date);
        });
    }

    container.appendChild(dayElement);
    return dayElement;
}

// הצגת פרטי היום
function showDayDetails(date) {
    console.log('showDayDetails called with date:', date);
    const modal = document.getElementById('dayModal');
    const modalDate = document.getElementById('modalDate');
    const modalEvents = document.getElementById('modalEvents');
    const modalZmanim = document.getElementById('modalZmanim');

    if (!modal || !modalDate || !modalEvents || !modalZmanim) {
        console.error('אחד מרכיבי המודאל חסר');
        return;
    }

    // גלילה לראש המודאל
    const modalHeader = modal.querySelector('.modal-header');
    if (modalHeader) {
        modalHeader.scrollIntoView({ behavior: 'auto', block: 'start' });
    }

    // המרה לתאריך עברי
    const hebDate = new HDate(date);
    const hebrewMonthName = getHebrewMonthName(hebDate.getMonth(), hebDate.getFullYear());

    // הצגת התאריך
    modalDate.innerHTML = `
        <div class="hebrew-date">${numberToHebrewLetters(hebDate.getDate())} ב${hebrewMonthName} ${numberToHebrewLetters(hebDate.getFullYear())}</div>
        <div class="gregorian-date">${date.toLocaleDateString('he-IL')}</div>
    `;

    // טעינת אירועים
    const settings = loadSettings();

    try {
        const events = getFilteredEventsForDay(date);
        if (events && events.length > 0) {
            modalEvents.innerHTML = `
                ${events.map(event => `<div class="event-item">${event.render('he')}</div>`).join('')}
        `;
            // הוספת סגנון לאירועים
            const currentSettings = loadSettings();
            const themeColorObj = getThemeColor(currentSettings.display?.themeColor || 'blue');
            modalEvents.style.backgroundColor = themeColorObj.main;
            modalEvents.style.color = 'white';
            modalEvents.style.padding = '15px';  // הוספת מרווח
            modalEvents.style.borderRadius = '5px';  // הוספת פינות מעוגלות
            modalEvents.querySelectorAll('.event-item').forEach(item => {
                item.style.color = 'white';
                item.style.fontSize = '1.2rem';  // הגדלת גודל הפונט
                item.style.fontWeight = 'bold';  // הדגשת הטקסט
                item.style.textAlign = 'center';  // מירכוז הטקסט
                item.style.marginBottom = '10px';  // מרווח בין אירועים
            });
        } else {
            modalEvents.innerHTML = '';
            modalEvents.style.backgroundColor = 'transparent';
            modalEvents.style.color = 'inherit';
        }
    } catch (error) {
        console.error('שגיאה בטעינת אירועים:', error);
        modalEvents.innerHTML = '';
        modalEvents.style.backgroundColor = 'transparent';
        modalEvents.style.color = 'inherit';
    }

    // קבלת הזמנים ליום הנבחר
    console.log('Trying to get times for date:', date);
    const dayTimes = timesManager.getTimesForDate(date);
    console.log('Day times:', dayTimes);
    if (!dayTimes) {
        console.error('לא נמצאו זמנים לתאריך זה');
        modalZmanim.innerHTML = '<div>לא נמצאו זמנים לתאריך זה</div>';
        return;
    }

    // סינון הזמנים לפי הגדרות המשתמש
    const filteredTimes = filterTimesBySettings(dayTimes, date);

    // יצירת תצוגת הזמנים
    let timesContent = '<div class="times-section">';
    timesContent += '<div class="time-group">';

    // זמני הבוקר
    timesContent += `<div>עלות השחר: ${filteredTimes.dawn}</div>`;
    timesContent += `<div>זמן טלית ותפילין: ${filteredTimes.talitTefilin}</div>`;  // Always display talitTefilin
    timesContent += `<div>הנץ החמה: ${filteredTimes.sunrise}</div>`;

    // זמני ק"ש ותפילה
    timesContent += `<div>סוף זמן ק"ש (גר"א): ${filteredTimes.shemaGra}</div>`;
    if (filteredTimes.shemaMga) {
        timesContent += `<div>סוף זמן ק"ש (מג"א): ${filteredTimes.shemaMga}</div>`;
    }
    timesContent += `<div>סוף זמן תפילה (גר"א): ${filteredTimes.tefilaGra}</div>`;
    if (filteredTimes.tefilaMga) {
        timesContent += `<div>סוף זמן תפילה (מג"א): ${filteredTimes.tefilaMga}</div>`;
    }

    // זמנים קבועים שתמיד מוצגים
    timesContent += `<div>חצות: ${filteredTimes.chatzot}</div>`;
    timesContent += `<div>מנחה גדולה: ${filteredTimes.minchaGedola}</div>`;
    timesContent += `<div>מנחה קטנה: ${filteredTimes.minchaKetana}</div>`;
    timesContent += `<div>פלג המנחה: ${filteredTimes.plag}</div>`;

    // זמני ערב שבת
    if (date.getDay() === 5) { // יום שישי
        timesContent += `<div>הדלקת נרות: ${filteredTimes.candlelighting}</div>`;
    }

    timesContent += `<div>שקיעת החמה: ${filteredTimes.sunset}</div>`;
    timesContent += `<div>צאת הכוכבים: ${filteredTimes.tzeit}</div>`; // Always display tzeit

    // זמני מוצאי שבת
    if (date.getDay() === 6) { // שבת
        // מוצאי שבת רגיל או חזו"א

        timesContent += `<div>מוצאי שבת: ${filteredTimes.shabbatEnd}</div>`;

        timesContent += `<div>מוצאי שבת ר"ת: ${dayTimes.rtzeit72}</div>`;

    }

    timesContent += '</div>';
    timesContent += '</div>';
    modalZmanim.innerHTML = timesContent;

    // הוספת המחלקה show כדי להציג את המודאל
    modal.style.display = 'flex';  // שינוי מ-block ל-flex כדי לשמור על מרכוז
    modal.classList.add('show');

    // סגירת המודל בלחיצה מחוץ לו
    modal.onclick = function (event) {
        if (event.target === modal) {
            modal.classList.remove('show');
            modal.style.display = 'none';  // הסתרת המודאל לגמרי
        }
    };

    // סגירת המודל בלחיצה על כפתור הסגירה
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            modal.style.display = 'none';  // הסתרת המודאל לגמרי
        });
    }
}

// מאזיני אירועים
function setupEventListeners() {
    console.log('Setting up event listeners');

    // כפתורי ניווט
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const prevYearBtn = document.getElementById('prevYear');
    const nextYearBtn = document.getElementById('nextYear');
    const todayBtn = document.getElementById('todayBtn');
    const toggleBtn = document.getElementById('toggleCalendar');

    // כפתורי ניווט חודשים
    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
            if (isHebrewDisplay) {
                // מצב עברי-לועזי: ניווט לפי חודשים עבריים
                const currentHebDate = new HDate(selectedDate);
                const hebMonth = currentHebDate.getMonth();
                const hebYear = currentHebDate.getFullYear();

                let prevMonth, prevYear;

                if (hebMonth === 7) { // אם אנחנו בתשרי
                    prevMonth = 6; // נחזור לאלול
                    prevYear = hebYear - 1; // של השנה הקודמת
                } else if (hebMonth === 1) { // אם אנחנו בניסן
                    // נחזור לאדר (או אדר ב' בשנה מעוברת)
                    prevYear = hebYear;
                    prevMonth = HDate.isLeapYear(prevYear) ? 13 : 12;
                } else {
                    prevYear = hebYear;
                    prevMonth = hebMonth - 1;
                }

                const prevMonthDate = new HDate(1, prevMonth, prevYear);
                selectedDate = prevMonthDate.greg();
                currentHebrewYear = prevYear;  // Update currentHebrewYear
            } else {
                // מצב לועזי-עברי: ניווט לפי חודשים לועזיים
                selectedDate.setMonth(selectedDate.getMonth() - 1);
            }
            renderCalendar();
        });
    }

    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            if (isHebrewDisplay) {
                // מצב עברי-לועזי: ניווט לפי חודשים עבריים
                const currentHebDate = new HDate(selectedDate);
                const hebMonth = currentHebDate.getMonth();
                const hebYear = currentHebDate.getFullYear();

                let nextMonth, nextYear;

                if (hebMonth === 6) { // אם אנחנו באלול
                    nextMonth = 7; // נעבור לתשרי
                    nextYear = hebYear + 1; // של השנה הבאה
                }

                if (HDate.isLeapYear(hebYear) && hebMonth === 12) { // אדר א' בשנה מעוברת
                    nextMonth = 13; // נעבור לאדר ב'
                    nextYear = hebYear;
                } else if (!HDate.isLeapYear(hebYear) && hebMonth === 12) { // אדר בשנה רגילה
                    nextMonth = 1; // נעבור לניסן
                    nextYear = hebYear;
                } else if (HDate.isLeapYear(hebYear) && hebMonth === 13) { // אדר ב' בשנה מעוברת
                    nextMonth = 1; // נעבור לניסן
                    nextYear = hebYear;
                } else {
                    nextYear = hebYear;
                    nextMonth = hebMonth + 1;
                }

                const nextMonthDate = new HDate(1, nextMonth, nextYear);
                selectedDate = nextMonthDate.greg();
                currentHebrewYear = nextYear;  // Update currentHebrewYear
            } else {
                // מצב לועזי-עברי: ניווט לפי חודשים לועזיים
                selectedDate.setMonth(selectedDate.getMonth() + 1);
            }
            renderCalendar();
        });
    }

    // כפתורי ניווט שנים
    if (prevYearBtn) {
        prevYearBtn.addEventListener('click', () => {
            if (isHebrewDisplay) {
                const currentHebDate = new HDate(selectedDate);
                const hebYear = currentHebDate.getFullYear();
                const prevYear = hebYear - 1;
                currentHebrewYear = prevYear;  // Update currentHebrewYear

                // יצירת תאריך בשנה הקודמת, באותו חודש ויום
                const prevYearDate = new HDate(
                    currentHebDate.getDate(),
                    currentHebDate.getMonth(),
                    prevYear
                );
                selectedDate = prevYearDate.greg();
            } else {
                selectedDate.setFullYear(selectedDate.getFullYear() - 1);
            }
            renderCalendar();
        });
    }

    if (nextYearBtn) {
        nextYearBtn.addEventListener('click', () => {
            if (isHebrewDisplay) {
                const currentHebDate = new HDate(selectedDate);
                const hebYear = currentHebDate.getFullYear();
                const nextYear = hebYear + 1;
                currentHebrewYear = nextYear;  // Update currentHebrewYear

                // יצירת תאריך בשנה הבאה, באותו חודש ויום
                const nextYearDate = new HDate(
                    currentHebDate.getDate(),
                    currentHebDate.getMonth(),
                    nextYear
                );
                selectedDate = nextYearDate.greg();
            } else {
                selectedDate.setFullYear(selectedDate.getFullYear() + 1);
            }
            renderCalendar();
        });
    }

    // כפתור היום
    if (todayBtn) {
        todayBtn.addEventListener('click', () => {
            currentDate = new Date();
            selectedDate = currentDate;  // נגדיר את היום הנבחר להיום הנוכחי

            // נרנדר מחדש את הלוח
            renderCalendar();

            showToast('עברת להיום');
        });
    }

    // כפתור החלפת תצוגה

    if (toggleBtn) {
        // שימוש ב-onclick במקום addEventListener
        toggleBtn.onclick = () => {
            isHebrewDisplay = !isHebrewDisplay;
            toggleBtn.textContent = isHebrewDisplay ? 'לועזי עברי' : 'עברי לועזי';
            renderCalendar();
        };
    }


    // הוספת מאזיני אירועים לקלט שנה וחודש
    setupYearInput();
    setupMonthSelect();

    // מקשי קיצור דרך
    document.addEventListener('keydown', (event) => {
        if (event.altKey) {
            switch (event.key) {
                case 'ArrowLeft':
                    document.getElementById('prevYear').click();
                    break;
                case 'ArrowRight':
                    document.getElementById('nextYear').click();
                    break;
            }
        }
    });

}

document.addEventListener('DOMContentLoaded', () => {
    setupDisplaySettings();
    applySettings(); // החלת ההגדרות השמורות
    setupEventsModalEventListeners();
    setupDisplayModalEventListeners(); // הוספת מאזיני אירועים למודאל התצוגה
    setupTimesModalEventListeners();
    setupExportModalEventListeners();
    setupHalachaModalEventListeners();
    setupAboutModalEventListeners();
    setupSidebarEventListeners();
    initCalendar();
});


function setupExportModalEventListeners() {
    const exportModal = document.getElementById('exportModal');
    const closeBtn = exportModal.querySelector('.close');
    const exportExcelBtn = document.getElementById('exportExcelBtn');

    if (exportModal && closeBtn) {
        closeBtn.addEventListener('click', hideExportModal);

        // סגירת המודאל בלחיצה על הרקע
        exportModal.addEventListener('click', (event) => {
            if (event.target === exportModal) {
                hideExportModal();
            }
        });

        // הוספת מאזין לכפתור הייצוא
        if (exportExcelBtn) {
            exportExcelBtn.addEventListener('click', () => {
                downloadExistingExcel();
                hideExportModal(); // סגירת המודאל לאחר התחלת ההורדה
            });
        }
    }
}


function setupHalachaModalEventListeners() {
    const halachaModal = document.getElementById('halachaModal');
    const closeBtn = halachaModal.querySelector('.close');

    if (halachaModal && closeBtn) {
        // סגירת המודאל בלחיצה על כפתור הסגירה
        closeBtn.addEventListener('click', hideHalachaModal);

        // סגירת המודאל בלחיצה על הרקע
        halachaModal.addEventListener('click', (event) => {
            if (event.target === halachaModal) {
                hideHalachaModal();
            }
        });
    }
}

function setupAboutModalEventListeners() {
    const aboutModal = document.getElementById('aboutModal');
    const closeBtn = aboutModal.querySelector('.close');

    if (aboutModal && closeBtn) {
        closeBtn.addEventListener('click', hideAboutModal);

        // סגירת המודאל בלחיצה על הרקע
        aboutModal.addEventListener('click', (event) => {
            if (event.target === aboutModal) {
                hideAboutModal();
            }
        });
    }
}

// פונקציה לשמירת הגדרות אירועים
function setupEventsModalEventListeners() {
    const eventsModal = document.getElementById('eventsModal');
    const eventsForm = document.getElementById('eventsSettingsForm');
    const eventsCloseBtn = eventsModal.querySelector('.close');

    if (eventsModal && eventsForm && eventsCloseBtn) {
           // סגירת המודאל בלחיצה על הרקע
           eventsModal.addEventListener('click', (event) => {
            if (event.target === eventsModal) {
                hideEventsModal();
            }
        });

        // טעינת ההגדרות הקיימות בעת פתיחת המודאל
        eventsModal.addEventListener('modal-show', () => {
            const settings = loadSettings();
            eventsForm.querySelector('[name="eventCategories.holidays"]').checked = settings.eventCategories.holidays;
            eventsForm.querySelector('[name="eventCategories.weeklyPortion"]').checked = settings.eventCategories.weeklyPortion;
            eventsForm.querySelector('[name="eventCategories.specialDays"]').checked = settings.eventCategories.specialDays;
        });

        // הוספת מאזין לשמירת הטופס
        eventsForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(eventsForm);

            // המרת הגדרות הטופס למבנה הנכון
            const eventCategoriesSettings = {
                holidays: formData.get('eventCategories.holidays') === 'on',
                weeklyPortion: formData.get('eventCategories.weeklyPortion') === 'on',
                specialDays: formData.get('eventCategories.specialDays') === 'on'
            };

            // שמירת ההגדרות
            localStorage.setItem('event-categories-settings', JSON.stringify(eventCategoriesSettings));

            // רענון התצוגה מיד
            renderCalendar();

            // סגירת המודאל
            hideEventsModal();

            // הצגת הודעת אישור
            showToast('ההגדרות נשמרו בהצלחה');
        });

        eventsCloseBtn.addEventListener('click', hideEventsModal);
    }
}


function showDisplayModal() {
    const displayModal = document.getElementById('displayModal');
    const overlay = document.getElementById('overlay');
    
    if (displayModal) {
        displayModal.classList.add('active');
        if (overlay) {
            overlay.classList.add('active');
        }
    }
}

function hideDisplayModal() {
    const displayModal = document.getElementById('displayModal');
    if (displayModal) {
        displayModal.classList.remove('active');
    }
}

// מודאל הלכה
function showHalachaModal() {
    const halachaModal = document.getElementById('halachaModal');
    const overlay = document.getElementById('overlay');
    
    if (halachaModal) {
        halachaModal.classList.add('active');
        if (overlay) {
            overlay.classList.add('active');
        }
    }
}

function hideHalachaModal() {
    const halachaModal = document.getElementById('halachaModal');
    const overlay = document.getElementById('overlay');
    
    if (halachaModal) {
        halachaModal.classList.remove('active');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
}

// מודאל אודות
function showAboutModal() {
    const aboutModal = document.getElementById('aboutModal');
    const overlay = document.getElementById('overlay');
    
    if (aboutModal) {
        aboutModal.classList.add('active');
        if (overlay) {
            overlay.classList.add('active');
        }
    }
}

function hideAboutModal() {
    const aboutModal = document.getElementById('aboutModal');
    const overlay = document.getElementById('overlay');
    
    if (aboutModal) {
        aboutModal.classList.remove('active');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
}

// מודאל זמנים
function showTimesModal() {
    const eventsModal = document.getElementById('timesModal');
    const overlay = document.getElementById('overlay');

    if (eventsModal) {
        // הפעלת אירוע show לפני הצגת המודאל
        const showEvent = new CustomEvent('modal-show');
        eventsModal.dispatchEvent(showEvent);

        // הצגת המודאל וה-overlay
        eventsModal.classList.add('active');
        if (overlay) {
            overlay.classList.add('active');
        }
    }
}

function hideTimesModal() {
    document.getElementById('timesModal').classList.remove('active');
    document.getElementById('overlay').style.display = 'none';
}

function showExportModal() {
    const exportModal = document.getElementById('exportModal');
    const overlay = document.getElementById('overlay');
    
    if (exportModal) {
        exportModal.classList.add('active');
        if (overlay) {
            overlay.classList.add('active');
        }
    }
}

function hideExportModal() {
    const exportModal = document.getElementById('exportModal');
    const overlay = document.getElementById('overlay');
    
    if (exportModal) {
        exportModal.classList.remove('active');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
}

function convertNumberToHebrewYear(year) {
    return numberToHebrewLetters(year);
}

// סינון זמנים לפי הגדרות המשתמש
function filterTimesBySettings(dayTimes, date) {
    const settings = loadTimesSettings();
    const filteredTimes = {};
    
    // בדיקה האם להשתמש בשעון קיץ
    const shouldUseDST = settings.autoTimeZone && isDaylightSavingTime(date);
    
    // פונקציה להוספת שעה אם נדרש
    const adjustTime = (timeStr) => {
        if (!timeStr) return timeStr;
        
        // בדיקה האם להשתמש בשעון קיץ עבור השעה הספציפית
        const shouldUseDST = settings.autoTimeZone && isDaylightSavingTime(date, timeStr);
        if (!shouldUseDST) return timeStr;
        
        const [hours, minutes] = timeStr.split(':').map(Number);
        const adjustedHours = (hours + 1) % 24;
        return `${adjustedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    };

    // עלות השחר - בדיקת הגדרה מדויקת
    filteredTimes.dawn = adjustTime(settings.dawnType === '90' ? dayTimes.dawn90 : dayTimes.dawn72);

    // זמני ק"ש ותפילה
    filteredTimes.shemaGra = adjustTime(dayTimes.shemaGra);
    filteredTimes.tefilaGra = adjustTime(dayTimes.tefilaGra);

    // זמני מג"א
    filteredTimes.shemaMga = adjustTime(settings.dawnType === '90' ? dayTimes.shemaMga90 : dayTimes.shemaMga72);
    filteredTimes.tefilaMga = adjustTime(settings.dawnType === '90' ? dayTimes.tefilaMga90 : dayTimes.tefilaMga72);

    // צאת הכוכבים - בדיקת הגדרה מדויקת
    switch (settings.tzeitType) {
        case '22.5':
            filteredTimes.tzeit = adjustTime(dayTimes.tzeit2);
            break;
        case '24':
            filteredTimes.tzeit = adjustTime(dayTimes.tzeit1);
            break;
        default: // '14' או כל ערך אחר
            filteredTimes.tzeit = adjustTime(dayTimes.tzeit3);
    }

    // מוצאי שבת - בדיקת הגדרה מדויקת
    if (date.getDay() === 6) { // שבת
        filteredTimes.shabbatEnd = adjustTime(settings.shabbatEndType === 'hazon'
            ? dayTimes.hazon40
            : dayTimes.shabbatEnd);
    }

    // זמנים קבועים
    filteredTimes.sunrise = adjustTime(dayTimes.sunrise);
    filteredTimes.sunset = adjustTime(dayTimes.sunset);
    filteredTimes.chatzot = adjustTime(dayTimes.chatzot);
    filteredTimes.minchaGedola = adjustTime(dayTimes.minchaGedola);
    filteredTimes.minchaKetana = adjustTime(dayTimes.minchaKetana);
    filteredTimes.plag = adjustTime(dayTimes.plag);
    filteredTimes.talitTefilin = adjustTime(dayTimes.talitTefilin);

    // זמני ערב שבת
    if (date.getDay() === 5) { // יום שישי
        filteredTimes.candlelighting = adjustTime(dayTimes.candlelighting);
    }

    return filteredTimes;
}

function isDaylightSavingTime(date, timeStr) {
    // המרת השעה מהמחרוזת למספרים
    const [hours, minutes] = (timeStr || "00:00").split(':').map(Number);
    
    // יצירת תאריך חדש עם השעה הספציפית
    const dateWithTime = new Date(date);
    dateWithTime.setHours(hours, minutes, 0, 0);
    
    const year = date.getFullYear();
    
    // מציאת יום שישי האחרון של מרץ
    const marchLastDay = new Date(year, 2, 31);
    while (marchLastDay.getDay() !== 5) { // 5 = יום שישי
        marchLastDay.setDate(marchLastDay.getDate() - 1);
    }
    marchLastDay.setHours(2, 0, 0, 0);
    
    // מציאת יום ראשון האחרון של אוקטובר
    const octoberLastDay = new Date(year, 9, 31);
    while (octoberLastDay.getDay() !== 0) { // 0 = יום ראשון
        octoberLastDay.setDate(octoberLastDay.getDate() - 1);
    }
    octoberLastDay.setHours(2, 0, 0, 0);

    // בדיקה האם התאריך הנוכחי הוא יום המעבר
    const isTransitionDay = (
        // יום שישי האחרון של מרץ
        (dateWithTime.getFullYear() === marchLastDay.getFullYear() &&
         dateWithTime.getMonth() === marchLastDay.getMonth() &&
         dateWithTime.getDate() === marchLastDay.getDate()) ||
        // יום ראשון האחרון של אוקטובר
        (dateWithTime.getFullYear() === octoberLastDay.getFullYear() &&
         dateWithTime.getMonth() === octoberLastDay.getMonth() &&
         dateWithTime.getDate() === octoberLastDay.getDate())
    );

    if (isTransitionDay) {
        if (dateWithTime.getDate() === marchLastDay.getDate()) {
            // ביום שישי האחרון של מרץ, אחרי 2:00 זה כבר שעון קיץ
            return hours >= 2;
        } else if (dateWithTime.getDate() === octoberLastDay.getDate()) {
            // ביום ראשון האחרון של אוקטובר, אחרי 2:00 זה כבר שעון חורף
            return hours < 2;
        }
    }
    
    // לכל תאריך אחר - בדיקה רגילה
    return dateWithTime > marchLastDay && dateWithTime < octoberLastDay;
}

// קריאת נתונים מקובץ Excel
async function loadTimesData() {
    try {
        const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.19.3/package/xlsx.mjs');
        const response = await fetch('tables/tables.xlsx');
        const data = new Uint8Array(await response.arrayBuffer());
        const workbook = XLSX.read(data, { type: 'array' });

        // console.log('=== בדיקת נתונים - השוואה בין שתי השיטות ===');

        // נעבור על כל הגליונות (1-12)
        for (let month = 1; month <= 12; month++) {
            const worksheet = workbook.Sheets[month.toString()];
            if (worksheet) {
                const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                    header: 1,
                    raw: false
                });

                // נדלג על שורת הכותרות ונמפה כל שורה לאובייקט DayTimes
                const daysData = jsonData.slice(1)
                    .map(row => new DayTimes(row))
                    .filter(day => day.dayOfMonth); // נסנן שורות ריקות

                timesManager.monthsData.set(month, daysData);
            }
        }

        console.log('נתוני הזמנים נטענו בהצלחה');
        return true;
    } catch (error) {
        console.error('שגיאה בטעינת קובץ הזמנים:', error);
        return false;
    }
}

// אם XLSX לא מוגדר, השתמש בספרייה הגלובלית
if (typeof XLSX === 'undefined' && window.XLSX) {
    var XLSX = window.XLSX;
}

// פונקציה להורדת קובץ Excel קיים
async function downloadExistingExcel() {
    try {
        const response = await fetch('/tables/tables.xlsx');

        if (!response.ok) {
            throw new Error('Failed to fetch Excel file');
        }

        const blob = await response.blob();
        const fileName = 'times_table.xlsx';

        // יצירת קישור להורדה
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName;

        // הפעלת ההורדה
        document.body.appendChild(link);
        link.click();

        // ניקוי
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);

        showToast(`הקובץ ${fileName} הורד בהצלחה`);
    } catch (error) {
        console.error('שגיאה בהורדת קובץ Excel:', error);
        showToast('שגיאה בהורדת הקובץ', 3000);
    }
}

// הגדרת מחלקת DayTimes
class DayTimes {
    constructor(rowData) {
        this.rtzeit72 = rowData[0];          // מוצאי שבת ר"ת 72 דק'
        this.hazon40 = rowData[1];           // מוצאי שבת חזו"א 40 דק'
        this.shabbatEnd = rowData[2];        // מוצאי שבת
        this.tzeit1 = rowData[3];            // צאת הכוכבים 1
        this.tzeit2 = rowData[4];            // צאת הכוכבים 2
        this.tzeit3 = rowData[5];            // צאת הכוכבים 3
        this.sunset = rowData[6];            // שקיעת החמה
        this.candlelighting = rowData[7];    // הדלקת נרות שבת
        this.plag = rowData[8];              // פלג המנחה
        this.minchaKetana = rowData[9];      // מנחה קטנה
        this.minchaGedola = rowData[10];     // מנחה גדולה
        this.chatzot = rowData[11];          // חצות יום ולילה
        this.tefilaGra = rowData[12];        // סוף זמן תפילה גר"א
        this.tefilaMga72 = rowData[13];      // סוף זמן תפילה מג"א 72
        this.tefilaMga90 = rowData[14];      // סוף זמן תפילה מג"א 90
        this.shemaGra = rowData[15];         // סוף זמן ק"ש גר"א
        this.shemaMga72 = rowData[16];       // סוף זמן ק"ש מג"א 72
        this.shemaMga90 = rowData[17];       // סוף זמן ק"ש מג"א 90
        this.sunrise = rowData[18];          // הנץ החמה
        this.talitTefilin = rowData[19];     // זמן ציצית ותפילין
        this.dawn72 = rowData[20];           // עלות השחר 72 דק'
        this.dawn90 = rowData[21];           // עלות השחר 90 דק'
        this.dayOfMonth = rowData[22];       // יום בחודש
    }
}

// הגדרת מחלקת TimesManager
class TimesManager {
    constructor() {
        // מפה של כל הנתונים: מפתח = חודש (1-12), ערך = מערך של ימים
        this.monthsData = new Map();
    }

    // טעינת הנתונים מקובץ Excel
    async initialize() {
        try {
            const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.19.3/package/xlsx.mjs');
            const response = await fetch('tables/tables.xlsx');
            const data = new Uint8Array(await response.arrayBuffer());
            const workbook = XLSX.read(data, { type: 'array' });

            // נעבור על כל הגליונות (1-12)
            for (let month = 1; month <= 12; month++) {
                const worksheet = workbook.Sheets[month.toString()];
                if (worksheet) {
                    const jsonData = XLSX.utils.sheet_to_json(worksheet, {
                        header: 1,
                        raw: false
                    });

                    // נדלג על שורת הכותרות ונמפה כל שורה לאובייקט DayTimes
                    const daysData = jsonData.slice(1)
                        .map(row => new DayTimes(row))
                        .filter(day => day.dayOfMonth); // נסנן שורות ריקות

                    this.monthsData.set(month, daysData);
                }
            }

            console.log('נתוני הזמנים נטענו בהצלחה');
            return true;
        } catch (error) {
            console.error('שגיאה בטעינת קובץ הזמנים:', error);
            return false;
        }
    }

    // קבלת נתוני יום ספציפי
    getTimesForDate(date) {
        const month = date.getMonth() + 1;  // getMonth() מחזיר 0-11
        const day = date.getDate();

        const monthData = this.monthsData.get(month);
        if (!monthData) return null;

        return monthData.find(dayTimes =>
            parseInt(dayTimes.dayOfMonth) === day
        );
    }

    // קבלת כל הנתונים של חודש מסוים
    getMonthData(month) {
        return this.monthsData.get(month) || [];
    }
}

// אתחול גלובלי של TimesManager
let timesManager;

// אתחול כאשר הדף נטען
document.addEventListener('DOMContentLoaded', async () => {
    timesManager = new TimesManager();
    await timesManager.initialize();

    // הוספת הפניה גלובלית
    window.timesManager = timesManager;
});

// טעינת הגדרות מהאחסון המקומי
function loadSettings() {
    const defaultSettings = {
        display: {
            fontSize: 'medium',
            themeColor: 'blue'
        },
        dawnType: '72',           // '72' או '90' דקות
        tzeitType: '14',          // '14', '22.5', או '24' דקות
        shabbatEndType: 'regular', // 'regular' או 'hazon'
        showEvents: true,
        eventCategories: {
            holidays: true,      // חגים, כולל חגים מודרניים
            weeklyPortion: true, // פרשת שבוע
            specialDays: true    // ימים מיוחדים (ראשי חדשים, תעניות, וכו')
        }
    };

    try {
        const savedDisplaySettings = localStorage.getItem('display-settings');
        const savedTimesSettings = localStorage.getItem('settings');
        const savedEventCategoriesSettings = localStorage.getItem('event-categories-settings');

        let settings = { ...defaultSettings };

        if (savedDisplaySettings) {
            settings.display = JSON.parse(savedDisplaySettings);
        }

        if (savedTimesSettings) {
            const times = JSON.parse(savedTimesSettings);
            settings.dawnType = times.dawnType || settings.dawnType;
            settings.tzeitType = times.tzeitType || settings.tzeitType;
            settings.shabbatEndType = times.shabbatEndType || settings.shabbatEndType;
        }

        if (savedEventCategoriesSettings) {
            const savedCategories = JSON.parse(savedEventCategoriesSettings);
            settings.eventCategories = {
                ...defaultSettings.eventCategories,  // קודם ברירת המחדל
                ...savedCategories                   // ואז הערכים השמורים
            };
        }

        return settings;
    } catch (error) {
        console.error('Error loading settings:', error);
        return defaultSettings;
    }
}


function hideEventsModal() {
    const eventsModal = document.getElementById('eventsModal');
    const overlay = document.getElementById('overlay');
    
    if (eventsModal) {
        eventsModal.classList.remove('active');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
}

// החלת ההגדרות על העיצוב
function applySettings(settings = loadSettings()) {
    const displaySettings = settings.display;

    if (displaySettings) {
        // Update font size
        document.documentElement.style.setProperty(
            '--font-size-multiplier',
            getFontSizeMultiplier(displaySettings.fontSize)
        );

        // Update theme color
        const themeColors = getThemeColor(displaySettings.themeColor);
        document.documentElement.style.setProperty('--theme-color', themeColors.main);
        document.documentElement.style.setProperty('--theme-secondary', themeColors.secondary);
    }
}

// פונקציות עזר להגדרות
function getFontSizeMultiplier(size) {
    switch (size) {
        case 'small': return '0.8';
        case 'large': return '1.2';
        default: return '1';
    }
}

function getThemeColor(theme) {
    const themeColors = {
        blue: {
            main: '#4a90e2',
            secondary: '#357abd'
        },
        green: {
            main: '#2ecc71',
            secondary: '#27ae60'
        },
        orange: {
            main: '#f39c12',
            secondary: '#d35400'
        }
    };

    return themeColors[theme] || themeColors.blue;
}

// מאזיני אירועים להגדרות תצוגה
function setupDisplaySettings() {
    const displayModal = document.getElementById('displayModal');
    const displaySettingsForm = document.getElementById('displaySettingsForm');

    if (displaySettingsForm) {
        // טעינת ההגדרות הנוכחיות
        const settings = loadSettings();
        if (settings.display) {
            // עדכון הטופס עם הערכים השמורים
            const fontSizeInputs = displaySettingsForm.querySelectorAll('[name="fontSize"]');
            fontSizeInputs.forEach(input => {
                input.checked = input.value === settings.display.fontSize;
            });

            const themeInputs = displaySettingsForm.querySelectorAll('[name="themeColor"]');
            themeInputs.forEach(input => {
                input.checked = input.value === settings.display.themeColor;
            });
        }

        // הוספת מאזין לשמירת הטופס
        displaySettingsForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const formData = new FormData(displaySettingsForm);

            const newSettings = {
                display: {
                    fontSize: formData.get('fontSize'),
                    themeColor: formData.get('themeColor')
                }
            };

            if (saveSettings(newSettings)) {
                applySettings();
                hideDisplayModal;
            }
        });

        // מאזינים לשינויים בזמן אמת
        displaySettingsForm.querySelectorAll('input[type="radio"]').forEach(input => {
            input.addEventListener('change', () => {
                const formData = new FormData(displaySettingsForm);
                const previewSettings = {
                    display: {
                        fontSize: formData.get('fontSize'),
                        themeColor: formData.get('themeColor')
                    }
                };
                // תצוגה מקדימה של השינויים
                applySettings(previewSettings);
            });
        });

        // סגירת המודאל בלחיצה מחוץ לאזור המודאל
        const overlay = document.getElementById('overlay');
        if (overlay) {
            overlay.addEventListener('click', (event) => {
                // בדיקה שהלחיצה הייתה על האוברלי עצמו ולא על תוכן המודאל
                if (event.target === overlay) {
                    hideDisplayModal();
                }
            });
        }

        // סגירת המודאל בלחיצה על כפתור הסגירה (X)
        const closeButton = displayModal.querySelector('.close');
        if (closeButton) {
            closeButton.addEventListener('click', () => {
                hideDisplayModal();
            });
        }
    }
}

function setupSidebarEventListeners() {
    // 1. הגדרת המשתנים הדרושים
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const sidebarItems = document.querySelectorAll('.sidebar-item');
    const closeSidebarBtn = document.querySelector('.close-sidebar');

    // 2. טיפול בכפתור ההמבורגר ובסרגל הצד
    if (hamburgerBtn && sidebar && overlay) {
        // פתיחת סרגל הצד
        hamburgerBtn.addEventListener('click', () => {
            sidebar.classList.toggle('active');
            overlay.style.display = sidebar.classList.contains('active') ? 'block' : 'none';
        });

        // סגירת סרגל הצד
        closeSidebarBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
            overlay.style.display = 'none';
        });

    }

    // 3. טיפול בפריטי התפריט
    sidebarItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.getAttribute('data-modal');
            if (modalId) {
                const modal = document.getElementById(modalId);
                if (modal) {
                    // פתיחת המודאל המתאים
                    switch(modalId) {
                        case 'displayModal': showDisplayModal(); break;
                        case 'eventsModal': showEventsModal(); break;
                        case 'timesModal': showTimesModal(); break;
                        case 'exportModal': showExportModal(); break;
                        case 'halachaModal': showHalachaModal(); break;
                        case 'aboutModal': showAboutModal(); break;
                    }
                    // סגירת סרגל הצד לאחר בחירת פריט
                    sidebar.classList.remove('active');
                }
            }
        });
    });

    // 4. טיפול בכפתורי הסגירה של המודאלים
    document.querySelector('#exportModal .close').addEventListener('click', hideExportModal);
    document.querySelector('#displayModal .close').addEventListener('click', hideDisplayModal);
    document.querySelector('#eventsModal .close').addEventListener('click', hideEventsModal);
    document.querySelector('#timesModal .close').addEventListener('click', hideTimesModal);
    document.querySelector('#halachaModal .close').addEventListener('click', hideHalachaModal);
    document.querySelector('#aboutModal .close').addEventListener('click', hideAboutModal);
}


function setupDisplayModalEventListeners() {
    console.log('setupDisplayModalEventListeners called');
    const displayModal = document.getElementById('displayModal');
    const displayForm = document.getElementById('displaySettingsForm');
    const displayCloseBtn = displayModal.querySelector('.close');


    if (displayModal && displayForm && displayCloseBtn) {


        displayCloseBtn.addEventListener('click', hideDisplayModal);

        // Close display modal when clicking outside
        document.addEventListener('click', (event) => {
            if (event.target === displayModal) {
                hideDisplayModal();
            }
        });
    } else {
        console.error('One or more display modal elements not found');
    }
}

function setupTimesModalEventListeners() {
    console.log('setupTimesModalEventListeners called');
    const timesModal = document.getElementById('timesModal');
    const timesForm = document.getElementById('timesSettingsForm');
    const timesCloseBtn = timesModal.querySelector('.close');
    const timesSaveBtn = timesModal.querySelector('.save-button');

    if (timesModal && timesForm && timesCloseBtn && timesSaveBtn) {
        timesModal.addEventListener('click', (event) => {
            if (event.target === timesModal) {
                hideTimesModal();
            }
        });
        // טעינת הגדרות זמני היום למודאל
        const timesSettings = loadTimesSettings();

        // עדכון ערכי הטופס בהתאם להגדרות השמורות
        timesForm.querySelector('input[name="autoTimeZone"]').checked = timesSettings.autoTimeZone;
        timesForm.querySelector('select[name="dawnType"]').value = timesSettings.dawnType;
        timesForm.querySelector('select[name="tzeitType"]').value = timesSettings.tzeitType;
        timesForm.querySelector('select[name="shabbatEndType"]').value = timesSettings.shabbatEndType;

        timesSaveBtn.addEventListener('click', (event) => {
            event.preventDefault();
            const formData = new FormData(timesForm);
            saveTimesSettings(formData);
            hideTimesModal();
        });

        timesCloseBtn.addEventListener('click', () => {
            hideTimesModal();
        });
        // Close times modal when clicking outside
        document.addEventListener('click', (event) => {
            if (event.target === timesModal) {
                hideTimesModal();
            }
        });
    } else {
        console.error('One or more times modal elements not found');
    }
}

function saveTimesSettings(input) {
    // שמירת הגדרות זמני היום
    const timesSettings = input instanceof FormData ? {
        autoTimeZone: input.get('autoTimeZone') === 'on',
        dawnType: input.get('dawnType'),
        tzeitType: input.get('tzeitType'),
        shabbatEndType: input.get('shabbatEndType'),
        showDawn: input.get('showDawn') === 'on',
        showStars: input.get('showStars') === 'on',
        showShabbatEnd: input.get('showShabbatEnd') === 'on'
    } : {
        autoTimeZone: input.autoTimeZone,
        dawnType: input.dawnType,
        tzeitType: input.tzeitType,
        shabbatEndType: input.shabbatEndType,
        showDawn: input.showDawn,
        showStars: input.showStars,
        showShabbatEnd: input.showShabbatEnd
    };

    localStorage.setItem('times-settings', JSON.stringify(timesSettings));

    applyTimesSettings(); // פונקציה שתחיל את ההגדרות
    renderCalendar();
}

function loadTimesSettings() {
    const defaultTimesSettings = {
        autoTimeZone: true,
        dawnType: '72',
        tzeitType: '14',
        shabbatEndType: 'regular',
        showDawn: true,
        showStars: true,
        showShabbatEnd: true
    };

    try {
        const savedTimesSettings = localStorage.getItem('times-settings');
        return savedTimesSettings ? JSON.parse(savedTimesSettings) : defaultTimesSettings;
    } catch (error) {
        console.error('Error loading times settings:', error);
        return defaultTimesSettings;
    }
}

function applyTimesSettings(settings = loadTimesSettings()) {
    // כאן תוסיף לוגיקה להחלת ההגדרות על הלוח שנה
    console.log('Applying times settings:', settings);
    // דוגמה: עדכון תצוגת זמנים
    // document.documentElement.style.setProperty('--dawn-type', settings.dawnType);
}

// פונקציה להדפסת כל האירועים בחודש
function printMonthEvents(year, month) {
    console.log(`אירועים בחודש ${getHebrewMonthName(month, year)} ${convertNumberToHebrewYear(year)}:`);

    // קבלת מספר הימים בחודש
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const currentDate = new Date(year, month, day);
        const hebDate = new HDate(currentDate);
        const events = HebrewCalendar.getHolidaysOnDate(hebDate, eventOptions);

        if (events && events.length > 0) {
            // הדפסת תאריך עברי ולועזי
            console.log(`תאריך: ${hebDate.getDate()} ${getHebrewMonthName(hebDate.getMonth() - 1, hebDate.getFullYear())} ${convertNumberToHebrewYear(hebDate.getFullYear())} (${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()})`);

            events.forEach(event => {
                console.log(`- ${event.desc}`);
            });
        }
    }
}

function printEventsWithCategories(events) {
    console.log('אירועים מקוטלגים:');

    events.forEach(event => {
        const mappedCategory = mapEventCategory(event);

        if (mappedCategory) {
            console.log(`תאריך: ${event.getDate().getDate()} ${getHebrewMonthName(event.getDate().getMonth(), event.getDate().getFullYear())} ${convertNumberToHebrewYear(event.getDate().getFullYear())}`);
            console.log(`- אירוע: ${event.getDesc()}`);
            console.log(`- קטגוריה: ${mappedCategory}\n`);
        }
    });
}

function mapEventCategory(event) {
    const settings = loadSettings();
    const desc = event.getDesc().toLowerCase();
    const categories = event.getCategories();

    // מיפוי מיוחד לאירועים ספציפיים
    const specialMappings = [
        { keywords: ['yom kippur katan'], category: 'תענית', enabled: settings.eventCategories.specialDays },
        { keywords: ['shabbat', 'שבת'], category: 'שבת מיוחדת', enabled: settings.eventCategories.specialDays },
        { keywords: ['rosh chodesh', 'ראש חודש'], category: 'ראש חודש', enabled: settings.eventCategories.specialDays },
        { keywords: ['tu bishvat', 'טו בשבט'], category: 'חגים משניים', enabled: settings.eventCategories.holidays },
        { keywords: ['family day'], category: 'חג מודרני', enabled: settings.eventCategories.specialDays }
    ];

    // בדיקת מיפויים מיוחדים
    for (const mapping of specialMappings) {
        if (mapping.enabled && mapping.keywords.some(keyword => desc.includes(keyword))) {
            return mapping.category;
        }
    }

    // מיפוי קטגוריות סטנדרטי
    const categoryMappings = {
        'parashat': settings.eventCategories.weeklyPortion ? 'פרשת שבוע' : null,
        'major_holiday': settings.eventCategories.holidays ? 'חגים עיקריים' : null,
        'minor_holiday': settings.eventCategories.holidays ? 'חגים משניים' : null,
        'holiday': settings.eventCategories.holidays ? 'חגים' : null
    };

    // מציאת הקטגוריה הראשונה המתאימה
    for (const category of categories) {
        if (categoryMappings[category]) {
            return categoryMappings[category];
        }
    }

    // טיפול מיוחד בפרשות שבוע
    if (event.constructor.name === 'ParshaEvent' && settings.eventCategories.weeklyPortion) {
        return 'פרשת שבוע';
    }

    return null;
}

function showEventsModal() {
    const eventsModal = document.getElementById('eventsModal');
    const overlay = document.getElementById('overlay');

    if (eventsModal) {
        // הפעלת אירוע show לפני הצגת המודאל
        const showEvent = new CustomEvent('modal-show');
        eventsModal.dispatchEvent(showEvent);

        // הצגת המודאל וה-overlay
        eventsModal.classList.add('active');
        if (overlay) {
            overlay.classList.add('active');
        }
    }
}

function hideEventsModal() {
    const eventsModal = document.getElementById('eventsModal');
    const overlay = document.getElementById('overlay');

    if (eventsModal) {
        eventsModal.classList.remove('active');
        if (overlay) {
            overlay.classList.remove('active');
        }
    }
}

// פונקציה לקבלת כל האירועים בחודש
function getAllMonthEvents(year, month, isHebrewMonth = false) {
    const events = new Map(); // מפה של תאריך -> רשימת אירועים

    try {
        if (isHebrewMonth) {
            // אם זה חודש עברי
            const daysInMonth = HDate.daysInMonth(month, year);
            for (let day = 1; day <= daysInMonth; day++) {
                const hebDate = new HDate(day, month, year);
                const gregDate = hebDate.greg();
                const dayEvents = getFilteredEventsForDay(gregDate);
                if (dayEvents.length > 0) {
                    events.set(day, dayEvents);
                }
            }
        } else {
            // אם זה חודש לועזי
            const firstDay = new Date(year, month, 1);
            const lastDay = new Date(year, month + 1, 0);

            for (let date = new Date(firstDay); date <= lastDay; date.setDate(date.getDate() + 1)) {
                const dayEvents = getFilteredEventsForDay(new Date(date));
                if (dayEvents.length > 0) {
                    events.set(date.getDate(), dayEvents);
                }
            }
        }
    } catch (error) {
        console.error('שגיאה בטעינת אירועי החודש:', error);
    }

    return events;
}

// פונקציה לקבלת האירועים המסוננים ליום מסוים
function getFilteredEventsForDay(date) {
    const settings = loadSettings();
        
    if (!settings.showEvents) {
        return [];
    }

    try {
        const hebDate = new HDate(date);
        let events = HebrewCalendar.getHolidaysOnDate(hebDate, eventOptions);

        if (!events) {
            events = [];
        }

        // הוספת פרשת השבוע
        if (settings.eventCategories.weeklyPortion) {
            if (hebDate.getDay() === 6) {  // אם זה יום שבת
                const events1 = HebrewCalendar.calendar({
                    year: hebDate.getFullYear(),
                    isHebrewYear: true,
                    sedrot: true,
                    noHolidays: true
                });

                const parashaEvent = events1.find(ev => {
                    return ev.getDate().toString() === hebDate.toString() &&
                           ev.getDesc().startsWith("Parashat");
                });
                
                if (parashaEvent) {
                    events.unshift(parashaEvent);
                }
            }
        }

        if (events.length === 0) {
            return [];
        }

        // סינון האירועים לפי הקטגוריות המופעלות
        const filteredEvents = events.filter(event => {
            const desc = event.getDesc().toLowerCase();
            const categories = event.getCategories();
            const hebrewDesc = event.render('he').toLowerCase();

            // מיפוי מיוחד לאירועים ספציפיים
            const specialMappings = [
                { keywords: ['yom kippur katan', 'יום כיפור קטן'], enabled: settings.eventCategories.specialDays },
                { keywords: ['shabbat', 'שבת'], enabled: settings.eventCategories.specialDays },
                { keywords: ['rosh chodesh', 'ראש חודש', 'rosh hodesh'], enabled: settings.eventCategories.holidays },  // שינוי לקטגוריית חגים
                { keywords: ['tu bishvat', 'טו בשבט'], enabled: settings.eventCategories.holidays },
                { keywords: ['family day', 'יום המשפחה'], enabled: settings.eventCategories.specialDays }
            ];

            // בדיקת מיפויים מיוחדים
            for (const mapping of specialMappings) {
                if (mapping.keywords.some(keyword => desc.includes(keyword) || hebrewDesc.includes(keyword))) {
                    return mapping.enabled;
                }
            }

            // בדיקת קטגוריות סטנדרטיות
            const categoryMappings = {
                'parashat': settings.eventCategories.weeklyPortion,
                'major_holiday': settings.eventCategories.holidays,
                'minor_holiday': settings.eventCategories.holidays,
                'holiday': settings.eventCategories.holidays,
                'rosh_chodesh': settings.eventCategories.holidays,  // שינוי לקטגוריית חגים
                'roshchodesh': settings.eventCategories.holidays    // שינוי לקטגוריית חגים
            };

            // בדיקה אם לפחות אחת מהקטגוריות של האירוע מופעלת
            const hasEnabledCategory = categories.some(category => categoryMappings[category]);
            return hasEnabledCategory;
        });

        return filteredEvents;
    } catch (error) {
        console.error('שגיאה בטעינת אירועים:', error);
        return [];
    }
}
