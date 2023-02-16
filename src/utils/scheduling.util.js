import cron from 'node-cron';

const schedules = {};
const crons = [];
export const knownSchedulingTime = {
    everySecond: '* * * * * *',
    everyMinute: '* * * * *',
    everyHour: '0 * * * *',
    every5Hours: '0 */5 * * *',
    everyDay: '0 0 * * *', //once every day at midnight (00:00).
    everyWeek:'0 0 * * 0', //once every week on Sundays at midnight (00:00).
};

export const schedule = (schedulingTime, callback) =>{
    if(!schedules[schedulingTime]){
        schedules[schedulingTime] = [];
        let cr = cron.schedule(schedulingTime, function() {
            schedules[schedulingTime].forEach(eachCallback => {
               eachCallback();
            });
        });
        crons.push(cr);
    }
    schedules[schedulingTime].push(callback);
};
export const closeAll = async () => {
    crons.forEach(each => {
        each.stop();
    });
};