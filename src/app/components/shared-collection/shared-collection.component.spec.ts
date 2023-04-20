import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedCollectionComponent } from './shared-collection.component';

describe('SharedCollectionComponent', () => {
  let component: SharedCollectionComponent;
  let fixture: ComponentFixture<SharedCollectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedCollectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SharedCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
