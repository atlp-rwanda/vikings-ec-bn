import EventEmitter from 'events';
const myEmitter = new EventEmitter();

export const knownEvents = {
    changePassword:'changePassword',
    productExpired: 'productExpired'
};

export const subscribe = (eventName, callBack) => {
    myEmitter.on(eventName, callBack);
};
export const eventEmit = (eventName, data) =>{
    myEmitter.emit(eventName, data);
};