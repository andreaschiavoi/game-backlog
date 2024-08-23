package com.backlog.backlog_games.service;

import com.backlog.backlog_games.models.MyGame;
import com.backlog.backlog_games.repository.YourGameRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BacklogService {

  @Autowired
  private YourGameRepository repository;

  public MyGame addNewGame(MyGame myGame) {
    return repository.save(myGame);
  }

  public List<MyGame> findAllGames() {
    return repository.findAll();
  }

  public boolean removeGameById(String id) {
    if (repository.existsById(id)) {
      repository.deleteById(id);
      return true;
    } else {
      return false;
    }
  }
}
