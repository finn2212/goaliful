import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CalendarComponent } from 'ionic2-calendar';


@Component({
  selector: 'app-cal-modal',
  templateUrl: './cal-modal.page.html',
  styleUrls: ['./cal-modal.page.scss'],
})
export class CalModalPage implements AfterViewInit {
  eventSource = [];
  viewTitle: string;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };
  @ViewChild(CalendarComponent) myCal2: CalendarComponent;



  event = {
    title: '',
    desc: '',
    startTime: null,
    endTime: '',
    allDay: true
  };

  modalReady = false;


  constructor(private modalCtrl: ModalController) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.modalReady = true;
    }, 0);
  }

  save() {
    this.modalCtrl.dismiss({ event: this.event })
  }
  next() {
    console.log(this.myCal2);
    this.myCal2.slideNext();

  }
  back() {
    this.myCal2.slidePrev();
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onTimeSelected(ev) {
    this.event.startTime = new Date(ev.selectedTime);
  }

  close() {
    this.modalCtrl.dismiss();
  }
  onEventSelected(event) {
    console.log(event);
  }

}
