package com.example.Controller;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.Model.CsvModel;
import com.opencsv.bean.CsvToBean;
import com.opencsv.bean.CsvToBeanBuilder;

@RestController
public class CsvController {

	private String originalName;

	//@CrossOrigin("http://localhost:3001")
	@GetMapping("/check")
	public String index() {
		return "mrinal";
	}

	@CrossOrigin("http://localhost:3000")
	@PostMapping(path="/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	public ResponseEntity<String> uploadCSVFile(@RequestParam("files") MultipartFile file,
			@RequestParam ("percentile")String per, @RequestParam ("column")String col) {

		int column = Integer.parseInt(col);
		int percentileValue = Integer.parseInt(per);
		ResponseEntity<String> response;
		double percentile;
		originalName = file.getOriginalFilename();
		List<Double> DEPTHList = new ArrayList<>();
		List<Double> GRList = new ArrayList<>();
		List<Double> RHOBList = new ArrayList<>();
		System.out.println("File name is: "+originalName);

		// validate file
		if (file.isEmpty()) {
			response = new ResponseEntity<String>(originalName, HttpStatus.OK);
			return response;
		} else {

			// parse CSV file to create a list of `User` objects
			try (Reader reader = new BufferedReader(new InputStreamReader(file.getInputStream()))) {

				// create csv bean reader
				CsvToBean<CsvModel> csvToBean = new CsvToBeanBuilder(reader).withType(CsvModel.class)
						.withIgnoreLeadingWhiteSpace(true).build();

				// convert `CsvToBean` object to list of users

				Iterator<CsvModel> csvModelIterator = csvToBean.iterator();
				while (csvModelIterator.hasNext()) {
					CsvModel csvModel = csvModelIterator.next();
					System.out.println("Depth : " + csvModel.getDepth());
					DEPTHList.add(csvModel.getDepth());
					System.out.println("GR : " + csvModel.getGr());
					GRList.add(csvModel.getGr());
					System.out.println("RHOB : " + csvModel.getRHOB());
					RHOBList.add(csvModel.getRHOB());
				}

				// List<Double> list = csvService.iterating(column, originalName);
				if (column == 1)
					percentile = calculatingPercentile(DEPTHList, percentileValue);
				else if (column == 2)
					percentile = calculatingPercentile(GRList, percentileValue);
				else if (column == 3)
					percentile = calculatingPercentile(RHOBList, percentileValue);
				else
					throw new Exception("wrong column entry");
				response = new ResponseEntity<String>("Percentile = " + percentile, HttpStatus.OK);

			} catch (Exception ex) {
				response = new ResponseEntity<String>(ex.getMessage(), HttpStatus.ALREADY_REPORTED);
			}
		}

		return response;
	}
	
	@CrossOrigin("http://localhost:3001")
	 @PostMapping(value = "/uploads", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
	    public ResponseEntity uploadFile(@RequestParam MultipartFile file) {
		 
		 System.out.println("File name "+file.getOriginalFilename()+" uploaded successfully.");
	        //logger.info(String.format("File name '%s' uploaded successfully.", file.getOriginalFilename()));
	        return ResponseEntity.ok().build();
	    }

	public double calculatingPercentile(List<Double> list, int percentile) {

		Collections.sort(list);
		int index = (int) Math.ceil(list.size() * percentile / 100);
		double result = (list.get(index) + list.get(index + 1)) / 2;

		return result;
	}

}
