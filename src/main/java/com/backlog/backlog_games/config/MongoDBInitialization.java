package com.backlog.backlog_games.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class MongoDBInitialization {

    @Autowired
    private MongoTemplate mongoTemplate;

    @Bean
    public CommandLineRunner init() {
        return args -> {
            // Verifica se la collezione "myGames" esiste
            if (!mongoTemplate.collectionExists("myGames")) {
                // Se non esiste, crea la collezione
                mongoTemplate.createCollection("myGames");
            }
            // Il database "backlog-games" sarà creato automaticamente quando verranno inseriti documenti nella collezione
        };
    }
}
