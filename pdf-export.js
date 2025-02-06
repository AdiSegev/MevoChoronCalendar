// פונקציית Toast להצגת הודעות
function showToast(message, duration = 3000) {
    const toastContainer = document.getElementById('toast-container');
    if (toastContainer) {
        const toast = document.createElement('div');
        toast.classList.add('toast');
        toast.textContent = message;
        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => {
                toastContainer.removeChild(toast);
            }, 500);
        }, duration);
    }
}

async function loadNotoSansHebrew() {
    try {
        const response = await fetch('https://fonts.gstatic.com/s/notosanshebrew/v46/or3HQ7v33eiDljA1IufXTtVf7V6RvEEdhQlk0LlGxCyaeNKYZC0sqk3xXGiXd4qtog.ttf');
        const fontData = await response.arrayBuffer();
        return fontData;
    } catch (error) {
        console.error('שגיאה בטעינת הגופן:', error);
        return null;
    }
}

// הגדרת הגופנים
pdfMake.fonts = {
    DavidLibre: {
        normal: 'DavidLibre-Regular.ttf',
        bold: 'DavidLibre-Bold.ttf',
        medium: 'DavidLibre-Medium.ttf'
    }
};

function processHebrewText(text) {
    if (!text) return '';
    
    // המרת תווים מיוחדים לעברית תקינה
    let processed = window.he.decode(text.toString());
    
    // מחליף גרשיים רגילים בגרשיים עבריים
    processed = processed
        .replace(/['"]/g, '')  // מסיר גרשיים מכל סוג
        .replace(/(\d+)\s*דק'?/, '$1 דקות'); // מחליף דק' במילה דקות
    
    return processed;
}

function exportToPDF(headers, monthData) {
    try {
        // בדיקת הנתונים
        console.log('Headers:', headers);
        console.log('First day data:', monthData[0]);
        console.log('Headers length:', headers.length);
        console.log('First day values length:', Object.values(monthData[0]).length);

        // מספר העמודות בטבלה
        const numColumns = headers.length;

        // הוספת כותרת החודש
        const content = [{
            text: 'ינואר',
            fontSize: 18,
            bold: true,
            alignment: 'right',
            margin: [0, 0, 0, 10]
        }];

        // הכנת נתוני הטבלה
        const tableBody = [
            // כותרות
            headers.map(header => ({
                text: header.replace(/['"]/g, ''),
                style: 'tableHeader',
                alignment: 'center',
                direction: 'rtl'
            }))
        ];

        // נתונים
        monthData.forEach(dayTimes => {
            const rowData = Object.values(dayTimes);
            console.log('Row data:', rowData);
            // וידוא שיש את כל העמודות בשורה
            while (rowData.length < numColumns) {
                rowData.push('');
            }
            tableBody.push(
                rowData.map(cell => ({
                    text: processHebrewText(cell || ''),
                    alignment: 'center'
                }))
            );
        });

        // הגדרות המסמך
        const docDefinition = {
            pageSize: 'A4',
            pageOrientation: 'landscape',
            pageMargins: [5, 5, 5, 5],
            defaultStyle: {
                font: 'DavidLibre',
                fontSize: 8,
                alignment: 'center',
                direction: 'rtl',
                lineHeight: 1
            },
            styles: {
                tableHeader: {
                    bold: true,
                    fontSize: 9,
                    fillColor: '#f0f0f0',
                    alignment: 'center',
                    lineHeight: 1.2,
                    direction: 'rtl'
                }
            },
            content: [{
                text: 'ינואר',
                fontSize: 18,
                bold: true,
                alignment: 'center',
                direction: 'rtl',
                margin: [0, 0, 0, 10]
            },
            {
                table: {
                    headerRows: 1,
                    body: tableBody,
                    widths: headers.map((_, index) => 
                        index === headers.length - 1 ? 20 : '*'
                    )
                },
                layout: {
                    hLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? 2 : 1;
                    },
                    vLineWidth: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? 2 : 1;
                    },
                    hLineColor: function(i, node) {
                        return (i === 0 || i === node.table.body.length) ? '#666' : '#999';
                    },
                    vLineColor: function(i, node) {
                        return (i === 0 || i === node.table.widths.length) ? '#666' : '#999';
                    },
                    paddingLeft: function(i) { return 2; },
                    paddingRight: function(i) { return 2; },
                    paddingTop: function(i) { return 1; },
                    paddingBottom: function(i) { return 1; }
                }
            }]
        };

        // יצירת ה-PDF
        pdfMake.createPdf(docDefinition).download('january_times.pdf');
        return true;
    } catch (error) {
        console.error('שגיאה בייצוא PDF:', error);
        throw error;
    }
}

function formatRTLText(text) {
    // Split by spaces and reverse the array
    return text.split(" ").reverse().join(" ");
}

// הוספת מאזין לכפתור יצוא PDF
document.addEventListener('DOMContentLoaded', () => {
    const exportPdfBtn = document.getElementById('exportPdfBtn');
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', async () => {
            try {
                // קבלת הכותרות והנתונים מהאובייקט הגלובלי
                const headers = window.excelTableHeaders || [];
                const monthData = window.timesManager.monthsData.get(1) || [];
                
                console.log('Debug - Headers from global:', headers);
                console.log('Debug - Month data length:', monthData.length);
                
                if (headers.length > 0 && monthData.length > 0) {
                    if (exportToPDF(headers, monthData)) {
                        const exportModal = document.getElementById('exportModal');
                        if (exportModal) {
                            exportModal.classList.remove('visible');
                        }
                        showToast('קובץ PDF יוצא בהצלחה');
                    }
                } else {
                    showToast('אין נתונים לייצוא');
                }
            } catch (error) {
                console.error('שגיאה בייצוא PDF:', error);
                showToast('שגיאה בייצוא קובץ PDF');
            }
        });
    }
});
