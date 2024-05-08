import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._isAuth = false;
        this._user = {};
        this._dataCalendar = [];
        this._rawData = [];
        this._goodData = 0;
        this._badData = 0;
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
}

