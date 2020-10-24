import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewGoalPrioPage } from './new-goal-prio.page';

describe('NewGoalPrioPage', () => {
  let component: NewGoalPrioPage;
  let fixture: ComponentFixture<NewGoalPrioPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGoalPrioPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewGoalPrioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
