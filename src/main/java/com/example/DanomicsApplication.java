package com.example;

import javax.annotation.PostConstruct;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;


@SpringBootApplication
public class DanomicsApplication extends SpringBootServletInitializer{
	
	@Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(DanomicsApplication.class);
    }

	public static void main(String[] args) {
		SpringApplication.run(DanomicsApplication.class, args);
	}
	
	@PostConstruct
    public void init()
    {
            Logger log = LoggerFactory.getLogger(DanomicsApplication.class);

            try
            {
                    log.info("Started the application successfully!");

                   // throw new NullPointerException("Oh no!");
            }
            catch (Exception e)
            {
                    log.error("Could not start the application successfully", e);
            }
    }

}
