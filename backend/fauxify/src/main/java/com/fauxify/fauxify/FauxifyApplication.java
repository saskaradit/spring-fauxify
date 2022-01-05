package com.fauxify.fauxify;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication
public class FauxifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(FauxifyApplication.class, args);
	}

}
