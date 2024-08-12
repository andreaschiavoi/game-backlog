package com.backlog.backlog_games.repository;

import com.backlog.backlog_games.models.YourGame;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface YourGameRepository extends MongoRepository<YourGame, String> {

}
