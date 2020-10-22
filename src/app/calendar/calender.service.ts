import { Injectable, KeyValueDiffers } from '@angular/core';
import { Calitem } from '../models/calItem';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { TodoCalenderPair } from '../models/TodoCalenderPair';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {
  calenderEvent;
  _events = [];
  events: Array<Calitem> = [];
  isDataloaded: boolean;

  constructor(private router: Router,
    private localDb: Storage,) {
    this.isDataloaded = false;


  }
  deleteCalenderItem(externalId: string) {
    let toDelete;
    this.events.forEach(function (el, index, object) {
      console.log(el.externalId);
      if (el.externalId == externalId) {
        toDelete = index;

      }

    });

    this.events.splice(toDelete);
    console.log(toDelete);
    toDelete = "";
  }


  addEventToCalendar(calitem: Calitem) {
    let isEdit = true;
    this.events.forEach(el => {
      if (el.externalId == calitem.externalId) {
        el.startTime = new Date(calitem.startTime);
        el.endTime = new Date(calitem.startTime);
        isEdit = false;
      }
    });
    if (isEdit) {
      calitem.startTime = new Date(calitem.startTime);
      calitem.endTime = new Date(calitem.endTime);
      this.events.push(calitem);
    }

    this.storeEvents();
  }
  getAllEvents() {

    return this.events;
  }
  deleteAll() {
    this.events = [];
    this.localDb.set('events', this.events);
  }
  storeEvents() {
    this.localDb.set('events', this.events);
  }
  getDatesWithIds() {
    var todaysDate = new Date();
    todaysDate = new Date(
      Date.UTC(
        todaysDate.getUTCFullYear(),
        todaysDate.getUTCMonth(),
        todaysDate.getUTCDate() + 1))


    let todoCalenderPairs = new Array<TodoCalenderPair>();
    this.events.forEach(evnt => {
      let state;

      if (evnt.startTime.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
        state = 'today'
      } else {
        state = 'planed'
      }
      let todoCalenderPair = new TodoCalenderPair(evnt.externalId, state);
      todoCalenderPairs.push(todoCalenderPair);

    });
    return todoCalenderPairs;
  }


  loadToArry() {
    if (this._events) {
      if (this.isDataloaded != true) {
        this._events.forEach(element => {
          console.log(element.title + "wird geladen")
          element.startTime = new Date(element.startTime);
          element.endTime = new Date(element.endTime);
          element.allDay = true;
          this.events.push(element);
          console.log(element.title + "zum Kalender hinzugefügt")
          this.isDataloaded = true;
        });
      }
    }


  }

  loadEvents() {
    return new Promise((resolve, reject) => {
      this.localDb.get('events')
        .then(events => {
          resolve(events);
          this._events = events;
        })
        .catch(reject);
    });
  }


}
