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
    'תשרי', 'חשון', 'כסלו', 'טבת', 'שבט', 'אדר', 'אדר א׳', 'אדר ב׳'
];

// פונקציה להמרת מספר לאותיות בעברית
function numberToHebrewLetters(num) {
    const letters = {
        1: 'א', 2: 'ב', 3: 'ג', 4: 'ד', 5: 'ה',
        6: 'ו', 7: 'ז', 8: 'ח', 9: 'ט', 10: 'י',
        11: 'יא', 12: 'יב', 13: 'יג', 14: 'יד', 15: 'טו',
        16: 'טז', 17: 'יז', 18: 'יח', 19: 'יט', 20: 'כ',
        21: 'כא', 22: 'כב', 23: 'כג', 24: 'כד', 25: 'כה',
        26: 'כו', 27: 'כז', 28: 'כח', 29: 'כט', 30: 'ל'
    };
    return letters[num] || num.toString();
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
    if (isLeapYear(year)) {
        if (month === 11) return 12; // מעבר משבט לאדר א׳
        if (month === 12) return 13; // מעבר מאדר א׳ לאדר ב׳
        if (month === 13) return 1; // מעבר מאדר ב׳ לניסן
        if (month === 14) return 1; // מעבר מאלול לתשרי
        return month + 1;
    } else {
        if (month === 11) return 1; // מעבר משבט לניסן (בשנה רגילה)
        if (month === 12) return 1; // מעבר מאדר לניסן (בשנה רגילה)
        if (month === 13) return 1; // מעבר מאלול לתשרי
        return month + 1;
    }
}

// פונקציה לקבלת אינדקס החודש הקודם
function getPrevMonth(month, year) {
    if (isLeapYear(year)) {
        if (month === 1) return 14; // מעבר מתשרי לאלול
        if (month === 12) return 11; // מעבר מאדר א׳ לשבט
        if (month === 13) return 12; // מעבר מאדר ב׳ לאדר א׳
        return month - 1;
    } else {
        if (month === 1) return 12; // מעבר מתשרי לאלול
        if (month === 12) return 11; // מעבר מאדר לשבט (בשנה רגילה)
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
    const settings = loadSettings();
    
    document.documentElement.style.setProperty('--primary-color', 
        settings.themeColor === 'blue' ? '#3498DB' : 
        settings.themeColor === 'green' ? '#2ECC71' : '#E67E22');
    
    document.body.style.fontSize = 
        settings.fontSize === 'small' ? '14px' : 
        settings.fontSize === 'large' ? '18px' : '16px';
        
    return settings;
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
        const daysGrid = document.getElementById('daysGrid');
        const currentMonthElement = document.getElementById('currentMonth');
        
        // ניקוי הלוח הקיים
        daysGrid.innerHTML = '';
        
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
        currentMonthElement.textContent = isHebrewDisplay ? 
            `${monthName} ${hebYear}` : 
            `${selectedDate.toLocaleString('he', { month: 'long' })} ${selectedDate.getFullYear()}`;
        
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
        try {
            events = settings.showEvents ? HebrewCalendar.getHolidaysOnDate(hebDate, defaultLocation) : [];
        } catch (error) {
            console.error('שגיאה בטעינת אירועים:', error);
        }
        
        if (date.toDateString() === new Date().toDateString()) {
            dayElement.classList.add('today');
        }
        
        // תאריך ראשי
        const primaryDate = document.createElement('div');
        primaryDate.className = 'primary-date';
        primaryDate.textContent = numberToHebrewLetters(hebDate.getDate());
        
        // תאריך משני
        const secondaryDate = document.createElement('div');
        secondaryDate.className = 'secondary-date';
        secondaryDate.textContent = date.getDate().toString();
        
        dayElement.appendChild(primaryDate);
        dayElement.appendChild(secondaryDate);
        
        // הוספת אירועים
        if (events && events.length > 0) {
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
    
    // הצגת התאריך
    const hebDate = new HDate(date);
    modalDate.textContent = `${numberToHebrewLetters(hebDate.getDate())} ${hebrewMonths[getAdjustedMonthIndex(hebDate.getMonth(), hebDate.getFullYear()) - 1]} ${hebDate.getFullYear()}`;
    modalDate.textContent += `\n${date.toLocaleDateString('he-IL')}`;
    
    // הצגת אירועים
    modalEvents.innerHTML = '';
    if (events && events.length > 0) {
        const eventsList = document.createElement('ul');
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
    
    modal.style.display = 'block';
}

// הגדרת מאזיני אירועים
function setupEventListeners() {
    console.log('Setting up event listeners');
    
    // כפתורי ניווט
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    const todayBtn = document.getElementById('todayBtn');
    const toggleBtn = document.getElementById('toggleCalendar');
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsModal = document.getElementById('settingsModal');
    
    console.log('Buttons found:', { 
        prevMonth: !!prevMonthBtn, 
        nextMonth: !!nextMonthBtn, 
        today: !!todayBtn, 
        toggle: !!toggleBtn,
        settings: !!settingsBtn
    });

    // הגדרת כפתורי סגירה למודלים
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // סגירת מודל בלחיצה מחוץ לתוכן
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    });

    if (settingsBtn && settingsModal) {
        settingsBtn.addEventListener('click', () => {
            // טעינת ההגדרות הנוכחיות לטופס
            const settings = loadSettings();
            const fontSizeSelect = document.getElementById('fontSize');
            const themeColorSelect = document.getElementById('themeColor');
            const showEventsCheckbox = document.getElementById('showEvents');
            
            if (fontSizeSelect) fontSizeSelect.value = settings.fontSize;
            if (themeColorSelect) themeColorSelect.value = settings.themeColor;
            if (showEventsCheckbox) showEventsCheckbox.checked = settings.showEvents;
            
            settingsModal.style.display = 'block';
        });

        // שמירת הגדרות בעת שליחת הטופס
        const settingsForm = document.getElementById('settingsForm');
        if (settingsForm) {
            settingsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const fontSizeSelect = document.getElementById('fontSize');
                const themeColorSelect = document.getElementById('themeColor');
                const showEventsCheckbox = document.getElementById('showEvents');
                
                const newSettings = {
                    fontSize: fontSizeSelect ? fontSizeSelect.value : 'medium',
                    themeColor: themeColorSelect ? themeColorSelect.value : 'blue',
                    showEvents: showEventsCheckbox ? showEventsCheckbox.checked : true
                };
                
                // שמירת ההגדרות החדשות
                localStorage.setItem('calendarSettings', JSON.stringify(newSettings));
                
                // החלת ההגדרות
                const settings = applySettings();
                
                // סגירת המודל
                settingsModal.style.display = 'none';
                
                // הצגת הודעת אישור
                showToast('ההגדרות נשמרו בהצלחה');
                
                // רענון הלוח עם ההגדרות החדשות
                renderCalendar();
            });
        }
    }

    if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
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
            renderCalendar();
        });
    }
    
    if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
            const currentHebDate = new HDate(selectedDate);
            const hebMonth = currentHebDate.getMonth();
            const hebYear = currentHebDate.getFullYear();
            
            let nextMonth, nextYear;
            
            if (hebMonth === 6) { // אם אנחנו באלול
                nextMonth = 7; // נעבור לתשרי
                nextYear = hebYear + 1; // של השנה הבאה
            } else if (HDate.isLeapYear(hebYear)) {
                if (hebMonth === 13) { // אם אנחנו באדר ב'
                    nextMonth = 1; // נעבור לניסן
                    nextYear = hebYear;
                } else {
                    nextMonth = hebMonth + 1;
                    nextYear = hebYear;
                }
            } else {
                if (hebMonth === 12) { // אם אנחנו באדר
                    nextMonth = 1; // נעבור לניסן
                    nextYear = hebYear;
                } else {
                    nextMonth = hebMonth + 1;
                    nextYear = hebYear;
                }
            }
            
            const nextMonthDate = new HDate(1, nextMonth, nextYear);
            selectedDate = nextMonthDate.greg();
            renderCalendar();
        });
    }
    
    if (todayBtn) {
        todayBtn.addEventListener('click', () => {
            selectedDate = new Date();
            renderCalendar();
        });
    }
    
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            isHebrewDisplay = !isHebrewDisplay;
            renderCalendar();
        });
    }
    
    console.log('Event listeners attached successfully');
    
    // מקשי מקלדת
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
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
            renderCalendar();
        } else if (e.key === 'ArrowRight') {
            const currentHebDate = new HDate(selectedDate);
            const hebMonth = currentHebDate.getMonth();
            const hebYear = currentHebDate.getFullYear();
            
            let nextMonth, nextYear;
            
            if (hebMonth === 6) { // אם אנחנו באלול
                nextMonth = 7; // נעבור לתשרי
                nextYear = hebYear + 1; // של השנה הבאה
            } else if (HDate.isLeapYear(hebYear)) {
                if (hebMonth === 13) { // אם אנחנו באדר ב'
                    nextMonth = 1; // נעבור לניסן
                    nextYear = hebYear;
                } else {
                    nextMonth = hebMonth + 1;
                    nextYear = hebYear;
                }
            } else {
                if (hebMonth === 12) { // אם אנחנו באדר
                    nextMonth = 1; // נעבור לניסן
                    nextYear = hebYear;
                } else {
                    nextMonth = hebMonth + 1;
                    nextYear = hebYear;
                }
            }
            
            const nextMonthDate = new HDate(1, nextMonth, nextYear);
            selectedDate = nextMonthDate.greg();
            renderCalendar();
        }
    });
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
