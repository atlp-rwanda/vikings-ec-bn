
export function addDurationOnDate(duration, date = new Date()) {

    if (duration.endsWith('y')) {
        date.setFullYear(date.getFullYear() + parseInt(duration));
    } else if (duration.endsWith('M')) {
        date.setMonth(date.getMonth() + parseInt(duration));
    } else if (duration.endsWith('d')) {
        date.setDate(date.getDate() + parseInt(duration));
    } else if (duration.endsWith('h')) {
        date.setHours(date.getHours() + parseInt(duration));
    } else if(duration.endsWith('m')){
        date.setMinutes(date.getMinutes() + parseInt(duration));
    }
    else if (duration.endsWith('s')) {
        date.setSeconds(date.getSeconds() + parseInt(duration));
    } else {
        throw new Error('Invalid duration format');
    }

    return date;
}

export function durationToCronRepetition(duration) {
    const time = parseInt(duration.slice(0, -1));
    const unit = duration.slice(-1);
    switch (unit) {
        case 's':
            return `*/${time} * * * * *`;
        case 'm':
            return `0 */${time} * * * *`;
        case 'h':
            return `0 0 */${time} * * *`;
        case 'd':
            return `0 0 0 */${time} * *`;
        case 'w':
            return `0 0 0 * * ${time}`;
        case 'M':
            return `0 0 0 1 */${time} *`;
        case 'y':
            return `0 0 0 1 1 */${time}`;
        default:
            throw new Error(`Invalid duration: ${duration}`);
    }
}