package com.backlog.backlog_games.service;

import com.backlog.backlog_games.exceptions.GameNotFoundException;
import com.backlog.backlog_games.models.MyGame;
import com.backlog.backlog_games.repository.YourGameRepository;
import java.util.List;
import java.util.Optional;
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
    return repository.findByOrderByGameNameAsc();
  }

  public boolean removeGameById(String id) {
    if (repository.existsById(id)) {
      repository.deleteById(id);
      return true;
    } else {
      return false;
    }
  }

  public MyGame editGame(MyGame updatedGame) {
    Optional<MyGame> existingGame = repository.findById(updatedGame.getId());
    if (existingGame.isPresent()) {
      MyGame gameToBeModified = existingGame.get();
      gameToBeModified.setGameName(updatedGame.getGameName());
      gameToBeModified.setComment(updatedGame.getComment());
      gameToBeModified.setRating(updatedGame.getRating());
      gameToBeModified.setMillisecondPlayed(updatedGame.getMillisecondPlayed());
      return repository.save(gameToBeModified);
    } else {
      throw new GameNotFoundException("Game not found");
    }
  }
}
