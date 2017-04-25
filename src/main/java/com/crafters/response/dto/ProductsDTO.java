package com.crafters.response.dto;

import java.util.ArrayList;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;

@XmlAccessorType(XmlAccessType.FIELD)
public class ProductsDTO {
	
	@XmlElement(name = "product")
	private ArrayList<String> product;

	public ArrayList<String> getProduct() {
		return product;
	}

	public void setProduct(ArrayList<String> product) {
		this.product = product;
	}



}
