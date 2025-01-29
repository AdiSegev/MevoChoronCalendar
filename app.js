import { HebrewCalendar, HDate, Location, Event } from '@hebcal/core';

// אתחול משתנים גלובליים
let selectedDate = new Date();  // שינוי השם מ-currentDate ל-selectedDate
let isHebrewDisplay = true;
let settings = loadSettings();

// הגדרת מיקום ברירת מחדל (ירושלים)
const defaultLocation = Location.lookup('Jerusalem');

// מערך שמות החודשים העבריים
const hebrewMonths = [
    'ניסן', 'אייר', 'סיון', 'תמוז', 'אב', 'אלול',
    'תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר א׳', 'אדר ב׳'
];

// פונקציה להמרת מספר לאותיות בעברית
function numberToHebrewLetters(number) {
    const units = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט'];
    const tens = ['', 'י', 'כ', 'ל', 'מ', 'נ', 'ס', 'ע', 'פ', 'צ'];
    const hundreds = ['', 'ק', 'ר', 'ש', 'ת', 'תק', 'תר', 'תש', 'תת', 'תתק'];
    const thousands = ['', 'א', 'ב', 'ג', 'ד', 'ה'];

    // מוסיף גרש או גרשיים בהתאם לצורך
    function addQuotes(str) {
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
    const startOfFifthMillennium = new HDate(5000, 1, 1).greg();
    const endOfFifthMillennium = new HDate(6000, 1, 1).greg();
    
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
                    // Find the correct month index for Hebrew calendar
                    const monthIndex = hebrewMonthOrder.findIndex(m => m === monthName) + 1;
                    const newDate = new HDate(year, monthIndex, 1).greg();
                    selectedDate = newDate;
                } else {
                    // Gregorian is straightforward
                    selectedDate = new Date(year, index, 1);
                }
                
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
    if (HDate.isLeapYear(year)) {
        if (month === 12) return 'אדר א׳';
        if (month === 13) return 'אדר ב׳';
        return hebrewMonths[month - 1];
    } else {
        if (month === 12) return 'אדר';
        return hebrewMonths[month - 1];
    }
}

// טעינת הגדרות מהאחסון המקומי
function loadSettings() {
    const defaultSettings = {
        fontSize: 'medium',
        showEvents: true,
        themeColor: 'blue'
    };
    
    try {
        const savedSettings = localStorage.getItem('calendarSettings');
        return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    } catch (error) {
        console.error('Error loading settings:', error);
        return defaultSettings;
    }
}

// שמירת הגדרות באחסון המקומי
function saveSettings() {
    localStorage.setItem('calendarSettings', JSON.stringify(settings));
    applySettings();
}

// החלת ההגדרות על העיצוב
function applySettings() {
    // טעינת ההגדרות הנוכחיות
    const currentSettings = loadSettings();
    
    // עדכון גודל הפונט
    if (currentSettings.fontSize) {
        document.body.classList.remove('small-font', 'medium-font', 'large-font');
        document.body.classList.add(`${currentSettings.fontSize}-font`);
    }
    
    // עדכון צבע הנושא
    if (currentSettings.themeColor) {
        document.body.classList.remove('blue-theme', 'green-theme', 'orange-theme');
        document.body.classList.add(`${currentSettings.themeColor}-theme`);
    }
    
    // עדכון תצוגת אירועים
    const daysGrid = document.getElementById('daysGrid');
    if (daysGrid) {
        const dayElements = daysGrid.querySelectorAll('.day');
        dayElements.forEach((dayElement, index) => {
            const eventIndicator = dayElement.querySelector('.event-indicator');
            
            // הסרת סמן אירועים קיים
            if (eventIndicator) {
                eventIndicator.remove();
            }
            
            // הוספת סמן אירועים אם נדרש
            if (currentSettings.showEvents) {
                try {
                    // חישוב התאריך הנוכחי
                    const currentMonth = selectedDate.getMonth();
                    const currentYear = selectedDate.getFullYear();
                    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
                    
                    // חישוב התאריך בהתבסס על האינדקס
                    const dayOfMonth = index - (new Date(currentYear, currentMonth, 1).getDay()) + 1;
                    
                    // וודא שהתאריך תקף
                    if (dayOfMonth > 0 && dayOfMonth <= daysInMonth) {
                        const dateObj = new Date(currentYear, currentMonth, dayOfMonth);
                        const hebDate = new HDate(dateObj);
                        
                        const events = HebrewCalendar.getHolidaysOnDate(hebDate);
                        if (events && events.length > 0) {
                            const newEventIndicator = document.createElement('div');
                            newEventIndicator.className = 'event-indicator';
                            newEventIndicator.textContent = '•';
                            dayElement.appendChild(newEventIndicator);
                        }
                    }
                } catch (error) {
                    console.error('שגיאה בטעינת אירועים:', error);
                }
            }
        });
    }
}

// אתחול הלוח
async function initCalendar() {
    try {
        console.log('Starting initCalendar');
        renderCalendar();
        console.log('Calendar rendered');
        setupEventListeners();
        console.log('Event listeners set up');
        applySettings();
        console.log('Settings applied');
    } catch (error) {
        console.error('Error in initCalendar:', error);
        showToast('שגיאה בטעינת הלוח: ' + error.message);
    }
}

// הצגת הודעת Toast
function showToast(message, duration = 3000) {
    console.log('Showing toast:', message);
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
        console.log('Starting renderCalendar');
        
        // יישום הגדרות לפני רינדור הלוח
        applySettings();
        
        const daysGrid = document.getElementById('daysGrid');
        const currentMonthElement = document.getElementById('currentMonth');
        const currentYearElement = document.getElementById('currentYear');
        
        // ניקוי הלוח הקיים
        daysGrid.innerHTML = '';
        
        if (isHebrewDisplay) {
            // מצב עברי-לועזי
            
            // המרה לתאריך עברי
            const selectedHebDate = new HDate(selectedDate);
            const hebMonth = selectedHebDate.getMonth();
            const hebYear = selectedHebDate.getFullYear();
            
            console.log('Hebrew Year:', hebYear); // הוספת לוג לבדיקה
            
            // מציאת היום הראשון והאחרון של החודש העברי
            const firstDayOfHebMonth = new HDate(1, hebMonth, hebYear);
            const daysInHebMonth = HDate.daysInMonth(hebMonth, hebYear);
            const lastDayOfHebMonth = new HDate(daysInHebMonth, hebMonth, hebYear);
            
            // המרה לתאריכים לועזיים
            const firstGregorianDate = firstDayOfHebMonth.greg();
            const lastGregorianDate = lastDayOfHebMonth.greg();
            
            // חישוב היום בשבוע של תחילת החודש העברי (0 = ראשון)
            const startingDay = firstGregorianDate.getDay();
            
            // קבלת שם החודש העברי
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
            
            // עדכון כותרת הלוח
            const currentMonth = document.getElementById('currentMonth');
            if (isHebrewDisplay) {
                const hebDate = new HDate(selectedDate);
                const hebMonth = hebDate.getMonth();
                const hebYear = hebDate.getFullYear();
                console.log('Hebrew Year (2):', hebYear); // הוספת לוג לבדיקה
                const monthName = getHebrewMonthName(hebMonth, hebYear);
                const hebrewYear = numberToHebrewLetters(hebYear);
                currentMonthElement.textContent = monthName;
                currentYearElement.textContent = hebrewYear;
            } else {
                const hebDate = new HDate(selectedDate);
                const hebMonth = hebDate.getMonth();
                const hebYear = hebDate.getFullYear();
                const hebMonthName = getHebrewMonthName(hebMonth, hebYear);
                const hebrewYear = numberToHebrewLetters(hebYear);
                
                const gregorianMonthName = selectedDate.toLocaleString('he-IL', { month: 'long' });
                const gregorianYear = selectedDate.getFullYear();
                
                currentMonthElement.textContent = gregorianMonthName;
                currentYearElement.textContent = gregorianYear.toString();
            }
            
            // חישוב היום הראשון והאחרון של החודש הלועזי
            const year = selectedDate.getFullYear();
            const month = selectedDate.getMonth();
            
            const firstDayOfMonth = new Date(year, month, 1);
            const lastDayOfMonth = new Date(year, month + 1, 0);
            
            // חישוב היום בשבוע של תחילת החודש (0 = ראשון)
            const startingDay = firstDayOfMonth.getDay();
            
            // הצגת שם החודש
            const monthName = firstDayOfMonth.toLocaleString('he', { month: 'long' });
            currentMonthElement.textContent = monthName;
            currentYearElement.textContent = year.toString();
            
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

// יצירת אלמנט יום בלוח
function createDayElement(date, container, isOutsideMonth) {
    try {
        const dayElement = document.createElement('div');
        dayElement.className = 'day' + (isOutsideMonth ? ' outside-month' : '');
        
        const hebDate = new HDate(date);
        let events = [];
        const currentSettings = loadSettings();
        
        // טעינת אירועים רק אם האפשרות מופעלת בהגדרות
        if (currentSettings && currentSettings.showEvents) {
            try {
                events = HebrewCalendar.getHolidaysOnDate(hebDate);
            } catch (error) {
                console.error('שגיאה בטעינת אירועים:', error);
            }
        }
        
        if (date.toDateString() === new Date().toDateString()) {
            dayElement.classList.add('today');
        }
        
        // תאריך ראשי
        const primaryDate = document.createElement('div');
        primaryDate.className = 'primary-date';
        
        // תאריך משני
        const secondaryDate = document.createElement('div');
        secondaryDate.className = 'secondary-date';
        
        if (isHebrewDisplay) {
            primaryDate.textContent = numberToHebrewLetters(hebDate.getDate());
            const gregorianMonth = date.toLocaleString('he-IL', { month: 'short' });
            secondaryDate.textContent = `${date.getDate()} ${gregorianMonth}`;
        } else {
            primaryDate.textContent = date.getDate().toString();
            const hebMonth = getHebrewMonthName(hebDate.getMonth(), hebDate.getFullYear());
            secondaryDate.textContent = `${numberToHebrewLetters(hebDate.getDate())} ${hebMonth}`;
        }
        
        dayElement.appendChild(primaryDate);
        dayElement.appendChild(secondaryDate);
        
        // הוספת אירועים רק אם הם קיימים והאפשרות מופעלת
        if (currentSettings && currentSettings.showEvents && events && events.length > 0) {
            const eventIndicator = document.createElement('div');
            eventIndicator.className = 'event-indicator';
            eventIndicator.textContent = '•';
            dayElement.appendChild(eventIndicator);
        }
        
        // הוספת אירוע לחיצה
        dayElement.addEventListener('click', () => showDayDetails(date, events));
        
        container.appendChild(dayElement);
    } catch (error) {
        console.error('שגיאה ביצירת תא יום:', error);
    }
}

// הצגת פרטי היום
function showDayDetails(date, events) {
    const modal = document.getElementById('dayModal');
    const modalDate = document.getElementById('modalDate');
    const modalEvents = document.getElementById('modalEvents');
    const modalZmanim = document.getElementById('modalZmanim');
    
    if (!modal || !modalDate || !modalEvents || !modalZmanim) {
        console.error('לא נמצאו אלמנטים נדרשים להצגת פרטי היום');
        return;
    }
    
    // הצגת התאריך
    const hebDate = new HDate(date);
    let eventsList = '';
    const currentSettings = loadSettings();
    
    // טעינת אירועים רק אם האפשרות מופעלת בהגדרות
    if (currentSettings && currentSettings.showEvents) {
        try {
            events = HebrewCalendar.getHolidaysOnDate(hebDate);
        } catch (error) {
            console.error('שגיאה בטעינת אירועים:', error);
        }
    }
    
    modalDate.textContent = `${numberToHebrewLetters(hebDate.getDate())} ${hebrewMonths[getAdjustedMonthIndex(hebDate.getMonth(), hebDate.getFullYear()) - 1]} ${numberToHebrewLetters(hebDate.getFullYear())}`;
    modalDate.textContent += `\n${date.toLocaleDateString('he-IL')}`;
    
    // הצגת אירועים
    modalEvents.innerHTML = '';
    if (events && events.length > 0) {
        eventsList = document.createElement('ul');
        events.forEach(event => {
            const li = document.createElement('li');
            li.textContent = event.getDesc('he');
            eventsList.appendChild(li);
        });
        modalEvents.appendChild(eventsList);
    } else {
        modalEvents.textContent = 'אין אירועים';
    }
    
    // הצגת זמנים
    try {
        const times = HebrewCalendar.getSunriseSunset(date, defaultLocation);
        modalZmanim.innerHTML = `
            <p>זריחה: ${times.sunrise.toLocaleTimeString('he-IL')}</p>
            <p>שקיעה: ${times.sunset.toLocaleTimeString('he-IL')}</p>
        `;
    } catch (error) {
        console.error('שגיאה בטעינת זמנים:', error);
        modalZmanim.textContent = 'לא ניתן לטעון זמנים';
    }
    
    // הצגת המודאל
    modal.classList.add('visible');
}

// הגדרת מאזיני אירועים
function setupEventListeners() {
    console.log('Setting up event listeners');
    
    // כפתורי ניווט
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const prevYearBtn = document.getElementById('prevYear');
    const nextYearBtn = document.getElementById('nextYear');
    const todayBtn = document.getElementById('todayBtn');
    const toggleBtn = document.getElementById('toggleCalendar');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    
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
                } else if (HDate.isLeapYear(hebYear) && hebMonth === 12) { // אדר א' בשנה מעוברת
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
            selectedDate = new Date();
            renderCalendar();
        });
    }

    // כפתור החלפת תצוגה
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            isHebrewDisplay = !isHebrewDisplay;
            toggleBtn.textContent = isHebrewDisplay ? 'לועזי עברי' : 'עברי לועזי';
            renderCalendar();
        });
    }

    // הוספת מאזיני אירועים לקלט שנה וחודש
    setupYearInput();
    setupMonthSelect();

    // מקשי קיצור דרך
    document.addEventListener('keydown', (event) => {
        if (event.altKey) {
            switch(event.key) {
                case 'ArrowLeft':
                    document.getElementById('prevYear').click();
                    break;
                case 'ArrowRight':
                    document.getElementById('nextYear').click();
                    break;
            }
        }
    });

    // כפתור הגדרות
    const settingsCloseBtn = settingsModal ? settingsModal.querySelector('.close') : null;

    if (settingsBtn && settingsModal && settingsCloseBtn) {
        settingsBtn.addEventListener('click', () => {
            settingsModal.classList.toggle('visible');
        });

        // סגירת חלון הגדרות בעת לחיצה על כפתור סגירה
        settingsCloseBtn.addEventListener('click', () => {
            settingsModal.classList.remove('visible');
        });

        // סגירת חלון הגדרות בעת לחיצה מחוץ לחלון
        document.addEventListener('click', (event) => {
            if (settingsModal.classList.contains('visible') && 
                !settingsModal.contains(event.target) && 
                event.target !== settingsBtn) {
                settingsModal.classList.remove('visible');
            }
        });
    }

    // סגירת חלון פרטי היום
    const dayModal = document.getElementById('dayModal');
    const dayModalCloseBtn = dayModal ? dayModal.querySelector('.close') : null;

    if (dayModal && dayModalCloseBtn) {
        dayModalCloseBtn.addEventListener('click', () => {
            dayModal.classList.remove('visible');
        });
    }

    // אישור הזנת שנה
    const yearValidationBtn = document.getElementById('yearValidationBtn');
    const yearInput = document.getElementById('yearInput');
    if (yearValidationBtn && yearInput) {
        yearValidationBtn.addEventListener('click', () => {
            const inputYear = yearInput.value;
            const validatedYear = validateYearInput(inputYear, isHebrewDisplay);
            
            if (validatedYear) {
                // עדכון השנה הנבחרת
                if (isHebrewDisplay) {
                    // המרת השנה העברית לתאריך גרגוריאני
                    const hebDate = new HDate(1, 7, validatedYear);
                    selectedDate = hebDate.greg();
                } else {
                    selectedDate.setFullYear(validatedYear);
                }
                
                renderCalendar();
                yearInput.value = ''; // ניקוי שדה הקלט
                showToast(`השנה עודכנה בהצלחה: ${validatedYear}`);
            } else {
                showToast('שנה לא חוקית. אנא הזן שנה תקינה.');
            }
        });
    }

    // טיפול בשמירת הגדרות
    const settingsForm = document.getElementById('settingsForm');
    if (settingsForm) {
        settingsForm.addEventListener('submit', (event) => {
            event.preventDefault(); // מניעת התנהגות ברירת המחדל של הטופס
            
            // שמירת ההגדרות
            const formData = new FormData(settingsForm);
            settings = {
                fontSize: formData.get('fontSize'),
                showEvents: formData.get('showEvents') === 'on',
                themeColor: formData.get('themeColor')
            };
            
            // שמירת ההגדרות באחסון המקומי
            saveSettings();
            
            // החלת ההגדרות
            applySettings();
            
            // סגירת המודאל
            settingsModal.classList.remove('visible');
            
            // הצגת הודעת אישור
            showToast('ההגדרות נשמרו בהצלחה');
        });
    }
}

// בדיקת מצב אופליין
window.addEventListener('online', () => {
    showToast('חיבור לאינטרנט זמין');
});

window.addEventListener('offline', () => {
    showToast('אין חיבור לאינטרנט');
});

// אתחול האפליקציה
document.addEventListener('DOMContentLoaded', () => {
    initCalendar();
});

function convertNumberToHebrewYear(year) {
    return numberToHebrewLetters(year);
}

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
