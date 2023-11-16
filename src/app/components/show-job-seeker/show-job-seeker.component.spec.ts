import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowJobSeekerComponent } from './show-job-seeker.component';

describe('ShowJobSeekerComponent', () => {
  let component: ShowJobSeekerComponent;
  let fixture: ComponentFixture<ShowJobSeekerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowJobSeekerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowJobSeekerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
