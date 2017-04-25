package com.crafters.response.dto;

import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlAttribute;
import javax.xml.bind.annotation.XmlValue;
import javax.xml.bind.annotation.XmlAccessType;

@XmlAccessorType(XmlAccessType.FIELD)
public class StatsDTO {
	
    @XmlAttribute(name = "attr")
    private String StName;

    @XmlValue
    private String StValue;

	public String getStName() {
		return StName;
	}

	public void setStName(String stName) {
		StName = stName;
	}

	public String getStValue() {
		return StValue;
	}

	public void setStValue(String stValue) {
		StValue = stValue;
	}	

}
