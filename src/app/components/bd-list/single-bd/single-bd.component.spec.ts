import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBdComponent } from './single-bd.component';

describe('SingleBdComponent', () => {
  let component: SingleBdComponent;
  let fixture: ComponentFixture<SingleBdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleBdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
