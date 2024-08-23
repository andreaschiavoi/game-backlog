package com.backlog.backlog_games.repository;

import com.backlog.backlog_games.models.MyGame;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface YourGameRepository extends MongoRepository<MyGame, String> {

}
