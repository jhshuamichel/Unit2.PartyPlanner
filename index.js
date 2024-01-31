const COHORT = "2311-FSA-ET-WEB-PT-SF"
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`

const state = {
events: [],
};

const eventList = document.querySelector("#events");

const addEventForm = document.querySelector("#addEvent");
addEventForm.addEventListener("submit", addEvents);

/**
 * Sync state with the API and rerender
 */
async function render() {
await getEvent();
renderEvents();
}
render();

/**
 * Update state with artists from API
 */
async function getEvent() {
    try {
        const response = await fetch(API_URL);
        const json = await response.json();
        state.events = json.data;
        // console.log(state.events);
    } catch (error) {
        console.error(error);
    }
}

  // TODO


/**
 * Render artists from state
 */
function renderEvents() {
if (!state.events.length) {
    eventList.innerHTML = "<li>No Events</li>";
    return;
}

const eventsCards = state.events.map((event) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <h2>${event.name}</h2>
    <p>${event.description}</p>
    `;
    return li;
});
console.log(eventsCards);
eventList.replaceChildren(...eventsCards);
}

  // TODO


/**
 * Ask the API to create a new artist based on form data
 * @param {Events} events
 */
async function addEvents(events) {
events.preventDefault();

let formData;

try {
    formData = {
        name: addEventForm.name.value,
        date: addEventForm.date.value,
        time: addEventForm.time.value,
        location: addEventForm.location.value,
        description: addEventForm.description.value,
};

console.log("Form Data:", formData);

    const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
        // name: `addEventForm.name.value`,
        // date: `addEventForm.date.value`,
        // time: `addEventForm.time.value`,
        // location: `addEventForm.location.value`,
        // description: `addEventForm.description.value`,
});
console.log("Response:", response);

    if (!response.ok) {
    throw new Error("Failed to create parrttyy");
    }

    render();
} catch (error) {
    console.error(error);
}
}


