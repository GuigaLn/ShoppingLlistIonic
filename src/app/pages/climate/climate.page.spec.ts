import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClimatePage } from './climate.page';

describe('ClimatePage', () => {
  let component: ClimatePage;
  let fixture: ComponentFixture<ClimatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClimatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClimatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
