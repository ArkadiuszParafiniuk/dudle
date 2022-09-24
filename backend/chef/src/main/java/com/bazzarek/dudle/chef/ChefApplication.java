package com.bazzarek.dudle.chef;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
public class ChefApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChefApplication.class, args);
	}

}
