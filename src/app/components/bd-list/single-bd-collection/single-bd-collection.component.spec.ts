import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleBdCollectionComponent } from './single-bd-collection.component';

describe('SingleBdCollectionComponent', () => {
  let component: SingleBdCollectionComponent;
  let fixture: ComponentFixture<SingleBdCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleBdCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleBdCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
