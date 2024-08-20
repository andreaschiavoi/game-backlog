package com.backlog.backlog_games.service;

import com.backlog.backlog_games.models.MyGames;
import com.backlog.backlog_games.repository.YourGameRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BacklogService {

  @Autowired
  private YourGameRepository repository;

  public MyGames addNewGame(MyGames myGames) {
    return repository.save(myGames);
  }

  public List<MyGames> findAllGames() {
    return repository.findAll();
  }
}
