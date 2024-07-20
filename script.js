document.addEventListener('DOMContentLoaded', () => {
    const startTimerButton = document.getElementById('start-timer');
    const timersContainer = document.getElementById('timers-container');
    let timers = [];

    startTimerButton.addEventListener('click', () => {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;
        const totalTime = (hours * 3600) + (minutes * 60) + seconds;

        if (totalTime > 0) {
            const timer = {
                id: Date.now(),
                remainingTime: totalTime,
                interval: null
            };

            timers.push(timer);
            displayTimers();

            timer.interval = setInterval(() => {
                timer.remainingTime--;
                displayTimers();

                if (timer.remainingTime <= 0) {
                    clearInterval(timer.interval);
                    timerEnded(timer);
                }
            }, 1000);
        }
    });

    function displayTimers() {
        timersContainer.innerHTML = '';
        timers.forEach(timer => {
            const timerElement = document.createElement('div');
            timerElement.className = `timer ${timer.remainingTime <= 0 ? 'ended' : ''}`;
            timerElement.innerHTML = `
                <div class="time-remaining">${formatTime(timer.remainingTime)}</div>
                ${timer.remainingTime > 0 ? `<button onclick="stopTimer(${timer.id})">Stop</button>` : '<div>Time is Up!</div>'}
            `;
            timersContainer.appendChild(timerElement);
        });
    }

    function formatTime(seconds) {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;
        return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    window.stopTimer = (id) => {
        timers = timers.filter(timer => {
            if (timer.id === id) {
                clearInterval(timer.interval);
                return false;
            }
            return true;
        });
        displayTimers();
    };

    function timerEnded(timer) {
        const audio = new Audio('/alarm.mp3');  
        audio.play();
        displayTimers();
    }
});
