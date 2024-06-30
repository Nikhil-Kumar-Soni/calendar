const calendarBody = document.getElementById('calendar-body');
const monthYear = document.getElementById('month-year');
const prevMonthButton = document.getElementById('prev-month');
const nextMonthButton = document.getElementById('next-month');

let currentDate = new Date();
let today = new Date();

function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    monthYear.innerText = `${date.toLocaleString('default', { month: 'long' })} ${year}`;

    calendarBody.innerHTML = '';
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let dateCount = 1;

    for (let i = 0; i < 6; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 7; j++) {
            const cell = document.createElement('td');

            if (i === 0 && j < firstDay) {
                const prevMonthDays = new Date(year, month, 0).getDate();
                cell.innerText = prevMonthDays - firstDay + j + 1;
                cell.classList.add('inactive');
            } else if (dateCount > daysInMonth) {
                dateCount++;
                cell.innerText = dateCount - daysInMonth;
                cell.classList.add('inactive');
            } else {
                cell.innerText = dateCount;
                if (year === today.getFullYear() && month === today.getMonth() && dateCount === today.getDate()) {
                    cell.classList.add('current-day');
                }
                dateCount++;
            }

            row.appendChild(cell);
        }

        calendarBody.appendChild(row);
    }
}

prevMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
});

nextMonthButton.addEventListener('click', () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
});

renderCalendar(currentDate);
