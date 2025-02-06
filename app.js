import { HebrewCalendar, HDate, Location, Event } from '@hebcal/core';

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

// טעינת הגדרות מהאחסון המקומי
function loadSettings() {
    const defaultSettings = {
        fontSize: 'medium',
        showEvents: true,
        themeColor: 'blue',
        dawnType: '72',           // '72' או '90' דקות
        tzeitType: '14',          // '14', '22.5', או '24' דקות
        shabbatEndType: 'regular' // 'regular' או 'hazon'
    };
    
    try {
        const savedSettings = localStorage.getItem('settings');
        return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
    } catch (error) {
        console.error('Error loading settings:', error);
        return defaultSettings;
    }
}

// שמירת הגדרות באחסון המקומי
function saveSettings(formData) {
    const settings = {
        fontSize: formData.get('fontSize'),
        showEvents: formData.get('showEvents') === 'on',
        themeColor: formData.get('themeColor'),
        dawnType: formData.get('dawnType'),
        tzeitType: formData.get('tzeitType'),
        shabbatEndType: formData.get('shabbatEndType')
    };
    
    localStorage.setItem('settings', JSON.stringify(settings));
    applySettings();
    renderCalendar(); // הוספת קריאה ל-renderCalendar אחרי שמירת ההגדרות
    
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
        console.log('Current Date:', currentDate);
        console.log('Selected Date:', selectedDate);
        console.log('Is Hebrew Display:', isHebrewDisplay);
        
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
    
    if (!isOutsideMonth) {
        dayElement.classList.add('clickable');
    }
    
    // הגדרת סגנון הסמן בהתאם לסוג היום
    dayElement.style.cursor = isOutsideMonth ? 'default' : 'pointer';
    
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
    
    
    // בדיקה אם יש אירועים ביום זה והאם להציג אותם
    const settings = loadSettings();
    if (settings.showEvents) {
        try {
            const events = HebrewCalendar.getHolidaysOnDate(hebDate, eventOptions);
            if (events && events.length > 0) {
                dayElement.classList.add('has-event');
            }
        } catch (error) {
            console.error('שגיאה בטעינת אירועים:', error);
        }
    }

    // יצירת תצוגת התאריך
    if (isHebrewDisplay) {
        // תאריך לועזי בפינה
        const gregorianDate = document.createElement('div');
        gregorianDate.classList.add('secondary-date');
        const month = date.toLocaleString('he', { month: 'short' });
        gregorianDate.textContent = `${date.getDate()} ${month}`;
        dayElement.appendChild(gregorianDate);

        // תאריך עברי במרכז
        const hebrewDate = document.createElement('div');
        hebrewDate.classList.add('primary-date');
        hebrewDate.textContent = numberToHebrewLetters(hebDate.getDate());
        dayElement.appendChild(hebrewDate);
    } else {
        // תאריך עברי בפינה
        const hebrewDate = document.createElement('div');
        hebrewDate.classList.add('secondary-date');
        const monthArray = isLeapYear(hebDate.getFullYear()) ? hebrewMonthOrderLogicLeap : hebrewMonthOrderLogic;
        const monthIndex = hebDate.getMonth() - 1;  // getMonth() מחזיר 1-13, אנחנו צריכים 0-12
        const hebrewMonthName = monthArray[monthIndex];
        hebrewDate.textContent = `${numberToHebrewLetters(hebDate.getDate())} ${hebrewMonthName}`;
        dayElement.appendChild(hebrewDate);

        // תאריך לועזי במרכז
        const gregorianDate = document.createElement('div');
        gregorianDate.classList.add('primary-date');
        gregorianDate.textContent = date.getDate();
        dayElement.appendChild(gregorianDate);
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
}

// הצגת פרטי היום
function showDayDetails(date) {
    const modal = document.getElementById('dayModal');
    const modalDate = document.getElementById('modalDate');
    const modalEvents = document.getElementById('modalEvents');
    const modalZmanim = document.getElementById('modalZmanim');

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
        <div class="hebrew-date">${numberToHebrewLetters(hebDate.getDate())} ${hebrewMonthName} ${numberToHebrewLetters(hebDate.getFullYear())}</div>
        <div class="gregorian-date">${date.toLocaleDateString('he-IL')}</div>
    `;

    // טעינת אירועים
    const settings = loadSettings();
    
    try {
        const events = HebrewCalendar.getHolidaysOnDate(hebDate, eventOptions);
        if (events && events.length > 0) {
            modalEvents.innerHTML = `
                <div class="events-section">
                    <h3>אירועים</h3>
                    ${events.map(event => `<div>${event.render('he')}</div>`).join('')}
                </div>
            `;
        } else {
            modalEvents.innerHTML = '';
        }
    } catch (error) {
        console.error('שגיאה בטעינת אירועים:', error);
            modalEvents.innerHTML = '';
        }
    

    // קבלת הזמנים ליום הנבחר
    const dayTimes = timesManager.getTimesForDate(date);
    if (!dayTimes) {
        console.error('לא נמצאו זמנים לתאריך זה');
        return;
    }

    // סינון הזמנים לפי הגדרות המשתמש
    const filteredTimes = filterTimesBySettings(dayTimes, date);

    // יצירת תצוגת הזמנים
    let timesContent = '<div class="times-section">';
    timesContent += '<div class="time-group">';

    // זמני הבוקר
    filteredTimes.dawn = dayTimes.dawn72;  // Always use dawn72
    timesContent += `<div>עלות השחר: ${filteredTimes.dawn}</div>`;
    timesContent += `<div>זמן טלית ותפילין: ${filteredTimes.talitTefilin}</div>`;  // Always display talitTefilin
    timesContent += `<div>הנץ החמה: ${filteredTimes.sunrise}</div>`;

    // זמני קריאת שמע ותפילה
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
        filteredTimes.shabbatEnd = dayTimes.shabbatEnd;
        timesContent += `<div>מוצאי שבת: ${filteredTimes.shabbatEnd}</div>`;
        if (filteredTimes.rtzeit72) {
            timesContent += `<div>ר"ת: ${filteredTimes.rtzeit72}</div>`;
        }
    }

    timesContent += '</div>';
    timesContent += '</div>';
    modalZmanim.innerHTML = timesContent;

    modal.classList.add('visible');

    // סגירת המודל בלחיצה מחוץ לה
    modal.onclick = function(event) {
        if (event.target === modal) {
            modal.classList.remove('visible');
        }
    };

    // סגירת המודל בלחיצה על כפתור הסגירה
    const closeBtn = modal.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = function() {
            modal.classList.remove('visible');
        };
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

// הוספת קוד להדפסת נתוני timesManager עם כותרות מקוריות
document.addEventListener('DOMContentLoaded', async () => {
    window.timesManager = new TimesManager(); // יצירת המופע כאן
    await timesManager.initialize();
    
    // קבלת הכותרות מהאקסל
    const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.19.3/package/xlsx.mjs');
    const response = await fetch('tables/tables.xlsx');
    const data = new Uint8Array(await response.arrayBuffer());
    const workbook = XLSX.read(data, { type: 'array' });
    
    // נדגים את החודש הראשון
    const worksheet = workbook.Sheets['1'];
    let headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
    
    // תיקון פורמט הכותרות
    headers = headers.map(header => {
        if (!header) return '';
        let text = header.toString();
        
        // תיקון פורמט של דקות
        if (text.includes('דק')) {
            // מוצאי שבת ר"ת 72 דק' -> מוצאי שבת ר"ת דק' 72
            text = text.replace(/(\d+)\s*דק'?/, 'דק\' $1');
        }
        
        return text;
    });
    
    window.excelTableHeaders = headers;
    
    console.log("כותרות העמודות:", window.excelTableHeaders);
    
    // הדפסת נתוני החודש הראשון
    const january = timesManager.monthsData.get(1);
    january.forEach((dayTimes, index) => {
        console.log(`יום ${dayTimes.dayOfMonth}:`);
        window.excelTableHeaders.forEach((header, colIndex) => {
            console.log(`${header}: ${Object.values(dayTimes)[colIndex]}`);
        });
        console.log('---');
    });
});

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
        settingsBtn.addEventListener('click', showSettingsModal);
        console.log('Settings button event listener added');
    } else {
        console.error('Settings button not found');
    }
}

function showSettingsModal() {
    const modal = document.getElementById('settingsModal');
    
    // גלילה לראש המודאל
    const modalHeader = modal.querySelector('.modal-header');
    if (modalHeader) {
        modalHeader.scrollIntoView({ behavior: 'auto', block: 'start' });
    }

    // טעינת הגדרות הנוכחיות לטופס
    const currentSettings = loadSettings();
    const fontSizeSelect = modal.querySelector('#fontSize');
    const themeColorSelect = modal.querySelector('#themeColor');
    const showEventsCheckbox = modal.querySelector('#showEvents');
    
    if (fontSizeSelect) fontSizeSelect.value = currentSettings.fontSize;
    if (themeColorSelect) themeColorSelect.value = currentSettings.themeColor;
    if (showEventsCheckbox) showEventsCheckbox.checked = currentSettings.showEvents;
    
    // הצגת המודאל
    modal.classList.add('visible');

    // סגירת המודאל בלחיצה מחוץ לתחום
    const closeOnOutsideClick = (event) => {
        if (event.target === modal) {
            modal.classList.remove('visible');
            // הסרת המאזין לאחר הסגירה כדי למנוע דליפת זיכרון
            modal.removeEventListener('click', closeOnOutsideClick);
        }
    };

    // הוספת המאזין רק אם טרם נוסף
    modal.removeEventListener('click', closeOnOutsideClick);
    modal.addEventListener('click', closeOnOutsideClick);
}

// עדכון מאזיני האירועים
document.addEventListener('DOMContentLoaded', () => {
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    const settingsCloseBtn = settingsModal ? settingsModal.querySelector('.close') : null;
    const settingsForm = document.getElementById('settingsForm');

    if (settingsBtn && settingsModal) {
        // הוספת מאזין ללחיצה על כפתור ההגדרות
        settingsBtn.addEventListener('click', showSettingsModal);
        console.log('Settings button event listener added');

        // סגירת חלון הגדרות בעת לחיצה על כפתור הסגירה
        settingsCloseBtn.addEventListener('click', () => {
            settingsModal.classList.remove('visible');
        });
    } else {
        console.error('Settings button not found');
    }

    // טיפול בשמירת הגדרות
    if (settingsForm) {
        settingsForm.addEventListener('submit', (event) => {
            event.preventDefault(); // מניעת שליחת טופס
            const formData = new FormData(settingsForm);
            saveSettings(formData);
            
            // החלת ההגדרות
            applySettings();
            
            // סגירת המודאל
            settingsModal.classList.remove('visible');
            
            // הצגת הודעת אישור
            showToast('ההגדרות נשמרו בהצלחה');
        });
    }
});

// בדיקת מצב אופליין
window.addEventListener('online', () => {
    showToast('חיבור לאינטרנט זמין');
});

window.addEventListener('offline', () => {
    showToast('אין חיבור לאינטרנט');
});

// אתחול האפליקציה
document.addEventListener('DOMContentLoaded', () => {
    initializeCurrentHebrewYear();
    initCalendar();
});

function convertNumberToHebrewYear(year) {
    return numberToHebrewLetters(year);
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
    switch (theme) {
        case 'green': return '#4CAF50';
        case 'orange': return '#FF9800';
        default: return '#2196F3';
    }
}

// סינון זמנים לפי הגדרות המשתמש
function filterTimesBySettings(dayTimes, date) {
    const settings = loadSettings();
    const filteredTimes = {};
    
    // עלות השחר
    filteredTimes.dawn = dayTimes.dawn72;  // Always use dawn72
    
    // זמני ק"ש ותפילה
    filteredTimes.shemaGra = dayTimes.shemaGra;  // Always display shemaGra
    filteredTimes.tefilaGra = dayTimes.tefilaGra;  // Always display tefilaGra
    
    // הוספת זמני מג"א בהתאם לסוג עלות השחר
    if (settings.dawnType === '72') {
        filteredTimes.shemaMga = dayTimes.shemaMga72;
        filteredTimes.tefilaMga = dayTimes.tefilaMga72;
    } else {  // '90'
        filteredTimes.shemaMga = dayTimes.shemaMga90;
        filteredTimes.tefilaMga = dayTimes.tefilaMga90;
    }
    
    // צאת הכוכבים
    filteredTimes.tzeit = dayTimes.tzeit1;  // Always display tzeit1
    
    // זמנים קבועים שתמיד מוצגים
    filteredTimes.sunrise = dayTimes.sunrise;
    filteredTimes.sunset = dayTimes.sunset;
    filteredTimes.chatzot = dayTimes.chatzot;
    filteredTimes.minchaGedola = dayTimes.minchaGedola;
    filteredTimes.minchaKetana = dayTimes.minchaKetana;
    filteredTimes.plag = dayTimes.plag;
    filteredTimes.talitTefilin = dayTimes.talitTefilin;
    
    // זמני ערב שבת
    if (date.getDay() === 5) { // יום שישי
        filteredTimes.candlelighting = dayTimes.candlelighting;
    }
    
    let timesContent = '';
    timesContent += `<div>שקיעת החמה: ${filteredTimes.sunset}</div>`;
    timesContent += `<div>צאת הכוכבים: ${filteredTimes.tzeit}</div>`; // Always display tzeit

    // זמני מוצאי שבת
    if (date.getDay() === 6) { // שבת
        // מוצאי שבת רגיל או חזו"א
        filteredTimes.shabbatEnd = dayTimes.shabbatEnd;
        filteredTimes.rtzeit72 = dayTimes.rtzeit72;
    }

    return filteredTimes;
}

// קריאת נתונים מקובץ Excel
async function loadTimesData() {
    try {
        const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.19.3/package/xlsx.mjs');
        const response = await fetch('tables/tables.xlsx');
        const data = new Uint8Array(await response.arrayBuffer());
        const workbook = XLSX.read(data, { type: 'array' });

        console.log('=== בדיקת נתונים - השוואה בין שתי השיטות ===');
        
        // נעבור על כל גיליונות Excel
        for (let month = 1; month <= 12; month++) {
            const worksheet = workbook.Sheets[month.toString()];
            if (worksheet) {
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
                    header: 1,
                    raw: false
                });
                
                // נמצא את השורה של ה-1 בחודש (נדלג על שורת הכותרות)
                const firstDayRow = jsonData[1];
                if (firstDayRow) {
                    // נתונים מהקריאה הישירה
                    const sunrise = firstDayRow[18];
                    console.log(`\nחודש ${month}:`);
                    console.log(`קריאה ישירה: זמן זריחה ב-1 לחודש: ${sunrise}`);
                    
                    // נתונים מה-TimesManager
                    const date = new Date(2025, month - 1, 1);  // שנת 2025 כדוגמה
                    const dayTimes = timesManager.getTimesForDate(date);
                    if (dayTimes) {
                        console.log(`TimesManager: זמן זריחה ב-1 לחודש: ${dayTimes.sunrise}`);
                        console.log(`TimesManager: זמני תפילה נוספים ליום זה:`);
                        console.log(`- הנץ החמה: ${dayTimes.sunrise}`);
                        console.log(`- שקיעה: ${dayTimes.sunset}`);
                        console.log(`- צאת הכוכבים: ${dayTimes.tzeit1}`);
                        console.log(`- סוף זמן ק"ש (גר"א): ${dayTimes.shemaGra}`);
                    }
                }
            }
        }
        
        console.log('\nבדיקת הנתונים הושלמה');
    } catch (error) {
        console.error('שגיאה בטעינת קובץ הזמנים:', error);
    }
}

// טעינת הנתונים כשהדף נטען
document.addEventListener('DOMContentLoaded', loadTimesData);

// הוספת קוד להדפסת נתוני timesManager עם כותרות מקוריות
document.addEventListener('DOMContentLoaded', async () => {
    await timesManager.initialize();
    
    // קבלת הכותרות מהאקסל
    const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.19.3/package/xlsx.mjs');
    const response = await fetch('tables/tables.xlsx');
    const data = new Uint8Array(await response.arrayBuffer());
    const workbook = XLSX.read(data, { type: 'array' });
    
    // נדגים את החודש הראשון
    const worksheet = workbook.Sheets['1'];
    let headers = XLSX.utils.sheet_to_json(worksheet, { header: 1 })[0];
    
    // תיקון פורמט הכותרות
    // headers = headers.map(header => {
    //     if (!header) return '';
    //     let text = header.toString();
        
    //     // תיקון פורמט של דקות
    //     if (text.includes('דק')) {
    //         // מוצאי שבת ר"ת 72 דק' -> מוצאי שבת ר"ת דק' 72
    //         text = text.replace(/(\d+)\s*דק'?/, 'דק\' $1');
    //     }
        
    //     return text;
    // });
    
    window.excelTableHeaders = headers;
    
    console.log("כותרות העמודות:", window.excelTableHeaders);
    
    // הדפסת נתוני החודש הראשון
    const january = timesManager.monthsData.get(1);
    january.forEach((dayTimes, index) => {
        console.log(`יום ${dayTimes.dayOfMonth}:`);
        window.excelTableHeaders.forEach((header, colIndex) => {
            console.log(`${header}: ${Object.values(dayTimes)[colIndex]}`);
        });
        console.log('---');
    });
});

// מאזיני אירועים ליצוא
document.addEventListener('DOMContentLoaded', () => {
    const exportBtn = document.getElementById('exportBtn');
    const exportModal = document.getElementById('exportModal');
    const exportExcelBtn = document.getElementById('exportExcelBtn');
    const exportPdfBtn = document.getElementById('exportPdfBtn');
    const exportModalClose = exportModal ? exportModal.querySelector('.close') : null;

    // פונקציה לטיפול בסגירת מודאל היצוא
    const closeExportModal = () => {
        if (exportModal) {
            exportModal.classList.remove('visible');
        }
    };

    // הוספת מאזין לכפתור היצוא
    if (exportBtn && exportModal) {
        exportBtn.addEventListener('click', () => {
            exportModal.classList.add('visible');
        });
    }

    // הוספת מאזין לכפתור סגירה
    if (exportModalClose) {
        exportModalClose.addEventListener('click', closeExportModal);
    }

    // יצוא לאקסל
    if (exportExcelBtn) {
        exportExcelBtn.addEventListener('click', async () => {
            try {
                const response = await fetch('tables/tables.xlsx');
                const blob = await response.blob();
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'calendar_tables.xlsx';
                link.click();
                URL.revokeObjectURL(link.href);
                closeExportModal();
                showToast('קובץ Excel ייוצא בהצלחה');
            } catch (error) {
                console.error('שגיאה בייצוא Excel:', error);
                showToast('שגיאה בייצוא קובץ Excel');
            }
        });
    }

    // יצוא ל-PDF
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', async () => {
            try {
                const XLSX = await import('https://cdn.sheetjs.com/xlsx-0.19.3/package/xlsx.mjs');

                const response = await fetch('tables/tables.xlsx');
                const data = new Uint8Array(await response.arrayBuffer());
                const workbook = XLSX.read(data, { type: 'array' });
                
                exportToPDF(workbook);
                
                exportModal.classList.remove('visible');
                showToast('קובץ PDF ייוצא בהצלחה');
            } catch (error) {
                console.error('שגיאה בייצוא PDF:', error);
                showToast('שגיאה בייצוא קובץ PDF');
            }
        });
    }
});
