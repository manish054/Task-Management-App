import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodosTracker } from './todos-tracker';

describe('TodosTracker', () => {
  let component: TodosTracker;
  let fixture: ComponentFixture<TodosTracker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodosTracker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodosTracker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
