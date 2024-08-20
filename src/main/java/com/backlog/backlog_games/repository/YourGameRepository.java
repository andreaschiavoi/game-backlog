package com.backlog.backlog_games.repository;

import com.backlog.backlog_games.models.MyGames;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface YourGameRepository extends MongoRepository<MyGames, String> {

}
