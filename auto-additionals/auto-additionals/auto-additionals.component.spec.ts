import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoAdditionalsComponent } from './auto-additionals.component';

describe('AutoAdditionalsComponent', () => {
  let component: AutoAdditionalsComponent;
  let fixture: ComponentFixture<AutoAdditionalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoAdditionalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoAdditionalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
