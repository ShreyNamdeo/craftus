package com.crafters.daoImpl;

import java.util.ArrayList;

import com.crafters.dao.DemoDao;
import com.crafters.request.dto.DemoRequestDTO;
import com.crafters.response.dto.ProductResponseDTO;
import com.crafters.response.dto.ProductsDTO;
import com.crafters.response.dto.StatsDTO;

public class DemoDaoImplMongo implements DemoDao{

	@Override
	public ProductResponseDTO getProductDetails(String Cust) {
		ProductResponseDTO customerResponseDTO = new ProductResponseDTO();
		customerResponseDTO.setName(Cust);
		customerResponseDTO.setPin(123);
		
		ArrayList<StatsDTO> custStatList = new ArrayList<StatsDTO>();
		
		StatsDTO statsDTO = new StatsDTO();
		statsDTO.setStName("height");
		statsDTO.setStValue("170cm");		
		custStatList.add(statsDTO);
		
		StatsDTO statsDTO1 = new StatsDTO();
		statsDTO1.setStName("weight");
		statsDTO1.setStValue("67kg");
		custStatList.add(statsDTO1);
		
				
		ArrayList<String> productList = new ArrayList<String>();
		productList.add("Sunglass");
		productList.add("Shirt");
		
		ProductsDTO productDTO = new ProductsDTO();
		productDTO.setProduct(productList);
				
		
		customerResponseDTO.setPhysicalStatList(custStatList);
		customerResponseDTO.setProductsList(productDTO);
		
		return customerResponseDTO;
	}

	@Override
	public ProductResponseDTO getProducts(DemoRequestDTO demoRequestDTO) {
		
		ProductResponseDTO customerResponseDTO = new ProductResponseDTO();
		customerResponseDTO.setName(demoRequestDTO.getName());
		customerResponseDTO.setAge(demoRequestDTO.getAge());
		customerResponseDTO.setPin(123);
		
		
		ArrayList<StatsDTO> custStatList = new ArrayList<StatsDTO>();
		
		StatsDTO statsDTO = new StatsDTO();
		statsDTO.setStName("height");
		statsDTO.setStValue("180cm");		
		custStatList.add(statsDTO);
		
		StatsDTO statsDTO1 = new StatsDTO();
		statsDTO1.setStName("weight");
		statsDTO1.setStValue("87kg");
		custStatList.add(statsDTO1);
		
				
		ArrayList<String> productList = new ArrayList<String>();
		productList.add("Sunglass");
		productList.add("Shirt");
		
		ProductsDTO productDTO = new ProductsDTO();
		productDTO.setProduct(productList);
				
		
		customerResponseDTO.setPhysicalStatList(custStatList);
		customerResponseDTO.setProductsList(productDTO);

		return customerResponseDTO;
	}

}
