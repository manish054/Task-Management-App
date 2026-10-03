package com.in28minutes.restful_web_services.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.in28minutes.restful_web_services.entity.Todo;
import com.in28minutes.restful_web_services.repo.TodoRepo;

@Service
public class TodoService {
	
	@Autowired
	TodoRepo todoRepo;
	
	public List<Todo> getTodosList(String username) {
		// TODO Auto-generated method stub
		return todoRepo.findAllByUsername(username);
	}

	public Todo addTodo(String username, Todo todo) {
		// TODO Auto-generated method stub
		Todo todoNew = new Todo();
		todoNew.setDescription(todo.getDescription());
		todoNew.setTargetDate(todo.getTargetDate());
		todoNew.setDone(todo.isDone());		
		todoNew.setUsername(username);
		todoNew.setMovedToTracker(false);		
		return todoRepo.save(todoNew);
	}

	public Todo updateTodo(Long todoId, Todo todo) {
		// TODO Auto-generated method stub
		Todo todoNew = todoRepo.findById(todoId).get();
		if(todoNew != null) {
			todoNew.setDescription(todo.getDescription());
			todoNew.setDone(todo.isDone());
			todoNew.setTargetDate(todo.getTargetDate());
			todoNew.setMovedToTracker(todo.isMovedToTracker());
			return todoRepo.save(todoNew);
		}
		return new Todo();
	}
	
	public String deleteTodo(Long todoId) {
		// TODO Auto-generated method stub
		Todo todo = todoRepo.findById(todoId).get();
		if(todo != null) {
			todoRepo.deleteById(todoId);
			return "Deleted";
		}
		return "Todo Not Fount";
	}

	public Todo getById(Long todoId) {
		// TODO Auto-generated method stub
		Optional<Todo> todo = todoRepo.findById(todoId);
		if(todo.isPresent())
		 return todo.get();
		return new Todo();
	}
	
	public List<Todo> getTrackerTodos(String username){
		return todoRepo.findByMovedToTracker(username);
	}

}