package com.backlog.backlog_games.repository;

import com.backlog.backlog_games.TestHelper;
import com.backlog.backlog_games.models.MyGames;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.test.context.junit.jupiter.SpringExtension;

import static org.assertj.core.api.Assertions.assertThat;


@ExtendWith(SpringExtension.class)
@DataMongoTest
class MyGamesRepositoryIT {

  @Autowired
  private YourGameRepository repository;

  @Test
  public void saveEntityShouldSaveNewYourGameEntity() {
    MyGames saved = repository.save(TestHelper.yourGameTestEntity());

    assertThat(saved.getId()).isNotNull();
    assertThat(saved.getGameName()).isEqualTo("Cyberpunk 2077");
    assertThat(saved.getRating()).isEqualTo(5);
    assertThat(saved.getComment()).isEqualTo("nice game!");
  }
}
