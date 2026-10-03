import { TestBed } from '@angular/core/testing';

import { TodosList } from './todos-list';

describe('TodosList', () => {
  let service: TodosList;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodosList);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
