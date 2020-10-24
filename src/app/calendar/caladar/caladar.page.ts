import { Component, OnInit, ViewChild, } from '@angular/core';
import { CalendarComponent } from 'ionic2-calendar';
import { CalenderService } from '../calender.service';
@Component({
  selector: 'app-caladar',
  templateUrl: './caladar.page.html',
  styleUrls: ['./caladar.page.scss'],
})
export class CaladarPage implements OnInit {
  eventSource = [];
  viewTitle: string;

  calendar = {
    mode: 'month',
    currentDate: new Date(),
  };
  @ViewChild(CalendarComponent) myCal: CalendarComponent;

  constructor(private calService: CalenderService) { }


  ngOnInit() {
  }
  ionViewDidLoad() {
    this.eventSource = this.calService.getAllEvents();

    this.myCal.loadEvents();
  }
  ionViewWillEnter() {
    this.eventSource = this.calService.getAllEvents();

    this.myCal.loadEvents();
  }

  deleteCalenderItem(externalId) {
    console.log("geklickt");
    console.log(externalId);

    this.calService.deleteCalenderItem(externalId);
    this.myCal.loadEvents();
  }

  getEntries() {
    this.calService.loadToArry();

  }

  next() {
    this.myCal.slideNext();
  }
  back() {
    this.myCal.slidePrev();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  removeEvents() {
    this.eventSource = [];
    this.calService.events = this.eventSource;
    this.calService.storeEvents();
  }

  async openCalModal() {
    this.calService.deleteAll();
  }


}
