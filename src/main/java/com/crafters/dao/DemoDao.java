package com.crafters.dao;

import com.crafters.request.dto.DemoRequestDTO;
import com.crafters.response.dto.ProductResponseDTO;

public interface DemoDao {
	
	public ProductResponseDTO getProductDetails(String Cust);
	public ProductResponseDTO getProducts(DemoRequestDTO demoRequestDTO);

}
