import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NewGoalPicPage } from './new-goal-pic.page';

describe('NewGoalPicPage', () => {
  let component: NewGoalPicPage;
  let fixture: ComponentFixture<NewGoalPicPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGoalPicPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NewGoalPicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
