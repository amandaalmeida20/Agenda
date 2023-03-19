const calendar = document.querySelector(".calendar"),
    date = document.querySelector(".date"),
    daysContainer = document.querySelector(".days"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    todayBtn = document.querySelector(".today-btn"),
    goBtn = document.querySelector(".go-btn"),
    dateInput = document.querySelector(".date-input"), eventDay = document.querySelector(".event-day"),
    eventDate = document.querySelector(".event-date"),
    eventsContainer = document.querySelector(".events"),
    addEventSubmit = document.querySelector(".add-event-button"),
    activeDayElem = document.querySelector(".day.active");



let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();


const months = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
];

// const eventsArr = [
//     {
//         day: 18,
//         month: 3,
//         year: 2023,
//         events: [
//             {
//                 title: " Event 1 loren ipsun dolar sit",
//                 time: "10:20"
//             },
//             {
//                 title: " Event 2",
//                 time: "11:00"
//             }
//         ]
//     },
//     {
//         day: 17,
//         month: 3,
//         year: 2023,
//         events: [
//             {
//                 title: " Event 1 loren ipsun dolar sit",
//                 time: "10:20"
//             },
//             {
//                 title: " Event 2",
//                 time: "11:00"
//             }
//         ]
//     }
// ]

let eventsArr = [];

getEvents();

function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = months[month] + " " + year;

    let days = "";

    for (let i = day; i > 0; i--) {
        days += `<div class="day prev-date" >${prevDays - i + 1}</div>`;
    }

    for (let x = 1; x <= lastDate; x++) {
        let event = false;
        eventsArr.forEach((eventObj) => {
            if (
                eventObj.day == x && eventObj.month == month + 1 && eventObj.year == year
            ) {
                // if event found
                event = true
            }
        })
        //if day is today add class today
        if (x == new Date().getDate() && year == new Date().getFullYear() && month == new Date().getMonth()) {

            activeDay = x;
            getActiveDay(x);
            updateEvents(x);

            //if event found also add event class
            //add active on today at startup
            if (event) {
                days += `<div class="day today active event" >${x}</div>`;
            } else {
                days += `<div class="day today active" >${x}</div>`;
            }
        }
        else {
            if (event) {
                days += `<div class="day  event" >${x}</div>`;
            } else {
                days += `<div class="day " >${x}</div>`;
            }
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date" >${j}</div>`;
    }

    daysContainer.innerHTML = days;

    addListener();
}

initCalendar();

function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}


function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);


todayBtn.addEventListener("click", () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length == 2) {
        dateInput.value += "/"
    }
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }
    if (e.inputType = " deleteContentBackward ") {
        if (dateInput.value.length == 3) {
            dateInput.value = dateInput.value.slice(0, 2)
        }
    }
});

goBtn.addEventListener("click", goDate);

function goDate() {
    const dateArr = dateInput.value.split("/");

    if (dateArr.length == 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length == 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }

    alert("data invalida");
}

const addEventBtn = document.querySelector(".add-event"),
    addEventContainer = document.querySelector(".add-event-wrapper"),
    addEventCloseBtn = document.querySelector(".close"),
    addEventTitle = document.querySelector(".event-name"),
    addEventFrom = document.querySelector(".event-time-from"),
    addEventTo = document.querySelector(".event-time-to"),
    day = document.querySelectorAll(".day"),
    error = document.querySelector(".alert");



addEventBtn.addEventListener("click", () => {
    addEventContainer.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", () => {
    addEventContainer.classList.remove("active")
});

document.addEventListener("click", (e) => {
    if (e.target == !addEventBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove("active");
    }
});

addEventTitle.addEventListener("input", (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50)
});

addEventFrom.addEventListener("input", (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ":";
        console.log(addEventFrom.value)
    }
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});

addEventTo.addEventListener("input", (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if (addEventTo.value.length == 2) {
        addEventTo.value += ":";
    }
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});

//lets create function to add listener on days after rendered

function addListener() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", (e) => {
            //set current day as active day
            activeDay = Number(e.target.innerHTML);

            //call active day after click
            getActiveDay(e.target.innerHTML);
            updateEvents(e.target.innerHTML);

            // remove active from already active day
            days.forEach((day) => {
                day.classList.remove("active")
            });

            // if prev month day clicked go prev month and add active
            if (e.target.classList.contains("prev-date")) {
                prevMonth();

                setTimeout(() => {
                    // select all days of that month
                    const days = document.querySelector(".day");
                    //after going to prev month adda ctive to clicked
                    days.forEach((day) => {
                        if (!day.classList.contains("prev-date") && day.innerHTML == e.target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else if (e.target.classList.contains("next-date")) {
                nextMonth();

                setTimeout(() => {
                    // select all days of that month
                    const days = document.querySelector(".day");
                    //after going to next month adda ctive to clicked
                    days.forEach((day) => {
                        if (!day.classList.contains("next-date") && day.innerHTML == e.target.innerHTML) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            }
            else {
                //remaining  current month days
                e.target.classList.add("active")
            }
        })
    })
}

//lets show active day events and date at top
function getActiveDay(date) {
    let semana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
    const day = new Date(year, month, date);
    const dayName = semana[day.getDay()];

    eventDay.innerHTML = dayName;
    eventDate.innerHTML = `${date} de ${months[month]} de ${year}`;
}

//function to show events of that day

function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        //get events of active day only
        if (date == event.day && month + 1 == event.month && year == event.year) {
            // then show event on document
            event.events.forEach((event) => {
                events += `
                <div class="event">
                <div class="title">
                <i class="fas fa-circle"></i>
                <h3 class="event-title">${event.title}</h3></div>
                <div class="event-time">
                <span>${event.time}</span>
                </div>
                </div>`
            })
        }
    });

    if (events === "") {
        events = ` <div class="no-event">
        <h3>No Events</h3></div>`
    }

    eventsContainer.innerHTML = events;
    //save events when new one added
    saveEvents();
}

//lets create function to add events
addEventSubmit.addEventListener("click", () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    //some validations

    if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
        alert(" Por favor, preencha todos os campos");
        return;
    }

    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");

    if (timeFromArr.length !== 2 || timeToArr.length !== 2 || timeFromArr[0] > 23 || timeFromArr[1] > 59 || timeToArr[0] > 23 || timeToArr[1] > 59) {
        alert("Hora Inválida");
    }

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        title: eventTitle,
        time: `${timeFrom} - ${timeTo}`
    }

    let eventAdded = false;

    //check if eventsArr not empty
    if (eventsArr.length > 0) {
        eventsArr.forEach((item) => {
            if (item.day === activeDay && item.month === month + 1 && item.year === year) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        })
    }

    //if event array empty or current day has event create new 
    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent]
        })
    }

    //rename active from add event form 
    addEventContainer.classList.remove("active")

    //clear the fields
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";

    //Show current added event
    updateEvents(activeDay);

    //also add event class to newly added day if not already
    if (!activeDayElem.classList.contains("event")) {
        activeDayElem.classList.add("event")

    }
});

function convertTime(timer) {
    let timeArr = timer.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let time = `${timeHour}:${timeMin}`

    return timer;
}

//lets create a function to remove events on click

eventsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("event")) {
        const eventTitle = e.target.children[0].children[1].innerHTML;

        eventsArr.forEach((event) => {
            if (event.day === activeDay && event.month === month + 1 && event.year === year) {
                event.events.forEach((item, index) => {
                    if (item.title === eventTitle) {
                        event.events.splice(index, 1);
                    }
                });

                //if no event remaining on that dat remove complete day
                if (event.events.length === 0) {
                    eventsArr.splice(eventsArr.indexOf(event), 1);

                    //after remove complete day also remove active class of that day
                    if (activeDayElem.classList.contains("event")) {
                        activeDayElem.classList.remove("event")
                    }
                }
            }
        });

        updateEvents(activeDay)
    }
});

//lets store events in local
function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
};

function getEvents() {
    if (localStorage.getItem("events" === null)) {
        return;
    }
    eventsArr.push(...JSON.parse(localStorage.getItem("events")))
}