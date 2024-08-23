package com.backlog.backlog_games.service;

import com.backlog.backlog_games.TestHelper;
import com.backlog.backlog_games.models.MyGame;
import com.backlog.backlog_games.repository.YourGameRepository;
import java.util.ArrayList;
import java.util.List;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

class BacklogServiceIT {

  @Mock
  private YourGameRepository repository;

  @InjectMocks
  private BacklogService service;

  @BeforeEach
  public void setUp() {
    MockitoAnnotations.openMocks(this);
  }

  @Test
  public void addNewGameShouldSaveNewEntity() {
    MyGame game = TestHelper.yourGameTestEntity();
    when(repository.save(game)).thenReturn(game);

    MyGame saved = service.addNewGame(game);
    assertThat(saved).isNotNull();
    assertThat(saved.getGameName()).isEqualTo(game.getGameName());
    assertThat(saved.getRating()).isEqualTo(game.getRating());
    assertThat(saved.getComment()).isEqualTo(game.getComment());

    verify(repository, times(1)).save(game);
  }

  @Test
  public void findAllGamesShouldReturnListOfGames() {
    MyGame game = TestHelper.yourGameTestEntity();
    MyGame game2 = TestHelper.yourGameTestEntity2();
    when(repository.findAll()).thenReturn(List.of(game, game2));
    List<String> namesExpected = List.of(game.getGameName(), game2.getGameName());
    List<Integer> ratingsExpected = List.of(game.getRating(), game2.getRating());
    List<String> commentsExpected = List.of(game.getComment(), game2.getComment());

    List<MyGame> saved = service.findAllGames();
    List<String> gamesNames = new ArrayList<>();
    List<Integer> gamesRating = new ArrayList<>();
    List<String> gamesComments = new ArrayList<>();
    gamesNames.add(saved.get(0).getGameName());
    gamesNames.add(saved.get(1).getGameName());
    gamesRating.add(saved.get(0).getRating());
    gamesRating.add(saved.get(1).getRating());
    gamesComments.add(saved.get(0).getComment());
    gamesComments.add(saved.get(1).getComment());

    assertThat(saved.size()).isEqualTo(2);
    assertThat(gamesNames).containsAll(namesExpected);
    assertThat(gamesRating).containsAll(ratingsExpected);
    assertThat(gamesComments).containsAll(commentsExpected);

    verify(repository, times(1)).findAll();
  }

}
