package com.fauxify.fauxify;

import com.fauxify.fauxify.user.User;
import com.fauxify.fauxify.user.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import java.util.stream.IntStream;

@SpringBootApplication
public class FauxifyApplication {

	public static void main(String[] args) {
		SpringApplication.run(FauxifyApplication.class, args);
	}

	@Bean
	@Profile("!test")
	CommandLineRunner run(UserService userService){
		return (args) -> {
			IntStream.rangeClosed(1,15).mapToObj(i -> {
				User user = new User();
				user.setUsername("user"+i);
				user.setDisplayName("display"+i);
				user.setPassword("Jengjet1");
				return user;
			}).forEach(userService::save);
		};
	}

}
