function logEvent(event) {
    console.log(`Event: ${event.type}`, event);
    fetch('http://localhost:3000/log', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type: event.type, details: event }),
    }).catch(err => console.error('Logging error:', err));
}

['click', 'load', 'DOMContentLoaded'].forEach(eventType => {
    window.addEventListener(eventType, logEvent, true);
});

// Override console methods
['log', 'error', 'warn'].forEach(method => {
    const original = console[method];
    console[method] = function(...args) {
        original.apply(this, args);
        fetch('http://localhost:3000/log', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: method, args }),
        }).catch(err => original('Logging error:', err));
    };
});

