package com.crafters.service.controller;

import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.crafters.dao.DemoDao;
import com.crafters.daoImpl.DemoDaoImplMongo;
import com.crafters.request.dto.DemoRequestDTO;
import com.crafters.response.dto.ProductResponseDTO;


@Controller
@RequestMapping("/xml/product")
public class ProductServiceController {
	
	public DemoDao demoDao = new DemoDaoImplMongo();
	
	@RequestMapping(value="{productId}", method = RequestMethod.GET)
	public @ResponseBody ProductResponseDTO getProductGET(@PathVariable String productId) {
		
		ProductResponseDTO productResponseDTO = demoDao.getProductDetails(productId);
		return productResponseDTO;

	}
	
	@RequestMapping(method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody ProductResponseDTO getProductPOST(@RequestBody DemoRequestDTO demoRequestDTO) {
		
		ProductResponseDTO productResponseDTO = demoDao.getProducts(demoRequestDTO);
		return productResponseDTO;		
	
	}
	
	@RequestMapping("trialNew")
	public String trial(Map<String, Object> model) {
		System.out.println("OK");
		return "trial";
	}
	
	@RequestMapping("trialInsideCommon")
	public String trialPro(Map<String, Object> model) {
		return "common/trialInsideCommon";
	}
	

}
