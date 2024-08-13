package com.backlog.backlog_games;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = "com.backlog")
public class BacklogGamesApplication {

	public static void main(String[] args) {
		SpringApplication.run(BacklogGamesApplication.class, args);
	}

}
