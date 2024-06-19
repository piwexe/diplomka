import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._dataCalendar = [];
        this._rawData = [];
        this._goodData = 0;
        this._badData = 0;
        this._dateRange = getTodayRange(); // Добавляем состояние диапазона дат
        makeAutoObservable(this)
    }
    setIsAuth(bool) {
        this._isAuth = bool
    }
    setUser(user) {
        this._user = user
    }
    setData(dataCalendar) {
        this._dataCalendar = dataCalendar
    }
    setrawData(rawData) {
        this._rawData = rawData
    }
    setGoodData(goodData) { 
        this._goodData = goodData;
    }
    setBadData(badData) {
        this._badData = badData;
    }
    setDateRange(range) {
        this._dateRange = range;
    }
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
    get dataCalendar() {
        return this._dataCalendar
    }
    get rawData() {
        return this._rawData
    }
    get goodData() { 
        return this._goodData;
    }
    get badData() {
        return this._badData;
    }
    get dateRange() {
        return this._dateRange;
    }
}
const getTodayRange = () => {
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // Установить начало дня

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // Установить конец дня

    return [startOfDay, endOfDay];
};
