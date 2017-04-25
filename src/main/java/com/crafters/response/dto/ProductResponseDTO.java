package com.crafters.response.dto;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement(name = "customer")
@XmlAccessorType(XmlAccessType.FIELD)
public class ProductResponseDTO {

	@XmlElement
	private String name;
	@XmlElement
	private int pin;
	
	@XmlElement
	private int age;	
	
	@XmlElement(name = "physicalStats")
	private ArrayList<StatsDTO> physicalStatList = new ArrayList<StatsDTO>();
	
	@XmlElement(name = "products")
	private ProductsDTO productsList = new ProductsDTO();

	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
	
	public int getPin() {
		return pin;
	}

	public void setPin(int pin) {
		this.pin = pin;
	}

	public ArrayList<StatsDTO> getPhysicalStatList() {
		return physicalStatList;
	}

	public void setPhysicalStatList(ArrayList<StatsDTO> physicalStatList) {
		this.physicalStatList = physicalStatList;
	}

	public ProductsDTO getProductsList() {
		return productsList;
	}

	public void setProductsList(ProductsDTO productsList) {
		this.productsList = productsList;
	}

	public int getAge() {
		return age;
	}

	public void setAge(int age) {
		this.age = age;
	}

}