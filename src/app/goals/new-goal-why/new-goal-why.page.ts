import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GoalsService } from '../goals.service'

import { Router } from '@angular/router';

@Component({
  selector: 'app-new-goal-why',
  templateUrl: './new-goal-why.page.html',
  styleUrls: ['./new-goal-why.page.scss'],
})
export class NewGoalWhyPage implements OnInit {

  constructor(
    private goalsService: GoalsService,
    private router: Router
  ) { }

  ngOnInit() {
  }
  onSubmit(form: NgForm) {

    this.goalsService.newGoalWhy = form.value.why;
    this.router.navigateByUrl('/tabs/goals/new-goal-prio');
    form.reset();
  }


}
