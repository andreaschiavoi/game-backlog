package com.backlog.backlog_games;

import com.backlog.backlog_games.models.YourGame;

public class TestHelper {

  public static YourGame yourGameTestEntity() {
    return new YourGame("123asd", "Cyberpunk 2077", 5, "nice game!");
  }

  public static YourGame yourGameTestEntity2() {
    return new YourGame("456zxc", "GTA 5", 4, "Not bad!");
  }

}
