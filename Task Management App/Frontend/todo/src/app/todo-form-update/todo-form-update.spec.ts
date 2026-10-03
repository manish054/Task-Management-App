import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoFormUpdate } from './todo-form-update';

describe('TodoFormUpdate', () => {
  let component: TodoFormUpdate;
  let fixture: ComponentFixture<TodoFormUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoFormUpdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoFormUpdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
