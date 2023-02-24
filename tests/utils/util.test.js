import { JwtUtility } from '../../src/utils/jwt.util';
import {schedule,knownSchedulingTime} from '../../src/utils/scheduling.util';
import {subscribe, eventEmit} from '../../src/utils/events.util';
import {expect, describe, test, afterEach, afterAll} from '@jest/globals';
import {SocketUtil} from '../../src/utils/socket.util';
import server from '../../src/app';
import {addDurationOnDate, durationToCronRepetition} from '../../src/utils/date.util';
import '../../src/controllers/user.controller';
import {closeAll} from '../../src/utils/scheduling.util';
import dotenv from 'dotenv';
dotenv.config();


describe('Testing Jwt functions', () => {
  test('Verify token', async () => {
    let testToken = ' ';
    const JsonWebTokenError = JwtUtility.verifyToken(testToken);
    expect(JsonWebTokenError).toBeDefined();
  });
});

describe('test Scheduled', () => {
  test('test schedule and events', async () => {
    let runs = false;
    subscribe(knownSchedulingTime.everySecond, () => {
      runs = true;
    });
    schedule(knownSchedulingTime.everySecond,()=>{
      eventEmit(knownSchedulingTime.everySecond, 'nothingMore');
    });
    await new Promise(resolve => setTimeout(resolve, 1500));
    expect(runs).toBe(true);
  });
  test('sockets', async () => {
    SocketUtil.config(server);
    SocketUtil.socketEmit('key', {message: 'message'});

    expect(1).toBe(1);
  });
  test('addDurationOnDate', async ()=>{
    let date = '1/1/2023';
    let today = new Date(date);
    let newD = addDurationOnDate('1d', new Date(date));
    expect(newD.getDay()).toBe(today.getDay() +1);
    newD = addDurationOnDate('1m', new Date(date));
    expect(newD.getMinutes()).toBe(today.getMinutes() +1);
    newD = addDurationOnDate('1M', new Date(date));
    expect(newD.getMonth()).toBe(today.getMonth() +1);
    newD = addDurationOnDate('1s', new Date(date));
    expect(newD.getSeconds()).toBe(today.getSeconds() +1);
    newD = addDurationOnDate('1y', new Date(date));
    expect(newD.getFullYear()).toBe(today.getFullYear() +1);
    newD = addDurationOnDate('1h', new Date(date));
    expect(newD.getHours()).toBe(today.getHours() +1);
    expect(()=>addDurationOnDate('1r')).toThrow(Error);

  });
  test('durationToCronRepetition', async () =>{
    let result  = durationToCronRepetition('1y');
    expect(result).toBeDefined();
    result  = durationToCronRepetition('1M');
    expect(result).toBeDefined();
    result  = durationToCronRepetition('1w');
    expect(result).toBeDefined();
    result  = durationToCronRepetition('1d');
    expect(result).toBeDefined();
    result  = durationToCronRepetition('1h');
    expect(result).toBeDefined();
    result  = durationToCronRepetition('1m');
    expect(result).toBeDefined();
    result  = durationToCronRepetition('1s');
    expect(result).toBeDefined();
    expect(()=>durationToCronRepetition('1r')).toThrow(Error);





  });
});
afterAll(async () =>{
  await closeAll();
});
