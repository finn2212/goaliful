import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { GoalsService } from '../goals.service';

@Component({
  selector: 'app-new-goal-prio',
  templateUrl: './new-goal-prio.page.html',
  styleUrls: ['./new-goal-prio.page.scss'],
})
export class NewGoalPrioPage implements OnInit {

  constructor(private router: Router,
    private goalsService: GoalsService) { }

  ngOnInit() {
  }
  selectCategory(prio: number) {
    this.goalsService.newGoalPrio = prio;
    this.router.navigateByUrl('/tabs/goals/new-goal-pic');
  }

}
