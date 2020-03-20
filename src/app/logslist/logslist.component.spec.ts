import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogslistComponent } from './logslist.component';

describe('LogslistComponent', () => {
  let component: LogslistComponent;
  let fixture: ComponentFixture<LogslistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogslistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
