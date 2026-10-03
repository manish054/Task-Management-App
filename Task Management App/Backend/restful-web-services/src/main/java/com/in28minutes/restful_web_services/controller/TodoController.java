package com.in28minutes.restful_web_services.controller;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.in28minutes.restful_web_services.entity.Todo;
import com.in28minutes.restful_web_services.service.ExcelService;
import com.in28minutes.restful_web_services.service.TodoService;

@CrossOrigin(origins="http://localhost:4200/")
@RestController
public class TodoController {
	
	@Autowired
	TodoService todoService;
	
	@Autowired
	ExcelService excelservice;
	
	@GetMapping("user/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username){
		return todoService.getTodosList(username);
	}
	
	@GetMapping("user/{username}/todos/{todoId}")
	public Todo getTodoById(@PathVariable Long todoId) {
		return todoService.getById(todoId);
	}
	
	@PostMapping("user/{username}/todos")
	public Todo addTodo(@PathVariable String username, @RequestBody Todo todo) {
		System.out.println("username--"+username);
		System.out.println("todo--"+todo.toString());
		return todoService.addTodo(username, todo);
	}
	
	@PutMapping("user/{username}/todos/{todoId}")
	public Todo updateTodo(@PathVariable String username, @PathVariable Long todoId, 
			@RequestBody Todo todo) {
		return todoService.updateTodo(todoId, todo);
		
	}
	
	@DeleteMapping("user/{username}/todos/{todoId}")
	public String deleteTodo(@PathVariable String username, @PathVariable Long todoId) {
		return todoService.deleteTodo(todoId);
	}
	
	@GetMapping("/user/{username}/todos/tracker/export")
	public ResponseEntity<InputStreamResource> exportTrackerTodos(@PathVariable String username)throws IOException{
		List<Todo> todos = todoService.getTrackerTodos(username);
		ByteArrayInputStream in = excelservice.exportTodos(todos);
		HttpHeaders headers = new HttpHeaders();
		headers.add("Content-Disposition", "attachment; filename=history_todos.xlsx");
		
		return ResponseEntity.ok().headers(headers)
									.contentType(MediaType.APPLICATION_OCTET_STREAM)
									.body(new InputStreamResource(in));
	}
}

