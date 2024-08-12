package com.backlog.backlog_games.service;

import com.backlog.backlog_games.models.YourGame;
import com.backlog.backlog_games.repository.YourGameRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BacklogService {

  @Autowired
  private YourGameRepository repository;

  public YourGame addNewGame(YourGame yourGame) {
    return repository.save(yourGame);
  }

  public List<YourGame> findAllGames() {
    return repository.findAll();
  }
}
