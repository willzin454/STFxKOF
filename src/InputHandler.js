let eventsRegistered = false;

export function registerKeyboardEvents() {
    if (eventsRegistered) return;
    eventsRegistered = true;

    window.addEventListener('keydown', (event) => {
        console.log(event);
    });
}