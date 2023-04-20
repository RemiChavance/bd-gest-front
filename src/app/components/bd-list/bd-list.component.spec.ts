import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdListComponent } from './bd-list.component';

describe('BdListComponent', () => {
  let component: BdListComponent;
  let fixture: ComponentFixture<BdListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BdListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
