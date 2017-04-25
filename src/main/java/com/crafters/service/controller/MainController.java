package com.crafters.service.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

	// inject via application.properties
	//@Value("${welcome.message:test}")
	private String message = "Hello Prithwiraj";

	@RequestMapping("/")
	public String welcome(Map<String, Object> model) {
		model.put("message", this.message);
		return "welcome";
	}

	@RequestMapping("men")
	public String categoryPage(Map<String, Object> model) {		
		return "category";
	}
	
	@RequestMapping("single")
	public String singlePage(Map<String, Object> model) {		
		return "single";
	}
	
	
}