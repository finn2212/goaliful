import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TalkDetailPage } from './talk-detail.page';

describe('TalkDetailPage', () => {
  let component: TalkDetailPage;
  let fixture: ComponentFixture<TalkDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TalkDetailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TalkDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
