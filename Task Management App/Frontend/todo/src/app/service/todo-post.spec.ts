import { TestBed } from '@angular/core/testing';

import { TodoPost } from './todo-post';

describe('TodoPost', () => {
  let service: TodoPost;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoPost);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
