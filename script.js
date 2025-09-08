function printForm() {
    const form = document.getElementById('activityForm');
    let printContent = '<h2>تقرير برنامج النشاط الطلابي</h2><table>';
    const elements = Array.from(form.elements);

    let imageHandled = false;
    let fileEl = document.getElementById("evidence");

    elements.forEach(el => {
        if ((el.tagName === 'INPUT' && el.type !== 'file') || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') {
            printContent += `<tr><td><strong>${el.previousElementSibling.innerText}</strong></td><td>${el.value}</td></tr>`;
        }
    });

    if (fileEl && fileEl.files[0]) {
        imageHandled = true;
        const reader = new FileReader();
        reader.onload = function(e) {
            printContent += `<tr><td><strong>الشواهد</strong></td><td><img src="${e.target.result}" style="max-width:300px;"></td></tr>`;
            printContent += '</table>';
            finalizePrint(printContent);
        };
        reader.readAsDataURL(fileEl.files[0]);
    }

    if (!imageHandled) {
        printContent += '</table>';
        finalizePrint(printContent);
    }
}

function finalizePrint(content) {
    const printWindow = window.open('', '', 'height=600,width=800');
    printWindow.document.write('<html><head><title>تقرير البرنامج</title>');
    printWindow.document.write('<style>table{width:100%;border-collapse:collapse;}td,th{border:1px solid #000;padding:8px;text-align:right;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write(content);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
}