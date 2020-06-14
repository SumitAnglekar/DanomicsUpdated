package com.example.Model;

public class CsvModel {
	
	private double depth;
	private double gr;
	private String RHOB;
	
	public CsvModel() {}
	
	public CsvModel(double depth, double gr, String rHOB) {
		this.depth = depth;
		this.gr = gr;
		RHOB = rHOB;
	}
	
	
	public double getDepth() {
		return depth;
	}
	public void setDepth(double depth) {
		this.depth = depth;
	}
	public double getGr() {
		return gr;
	}
	public void setGr(double gr) {
		this.gr = gr;
	}
	public double getRHOB() {
		if(RHOB.charAt(0)=='-') return 0;
		return Double.parseDouble(RHOB);
	}
	public void setRHOB(String rHOB) {
		RHOB = rHOB;
	}
}
