package com.backlog.backlog_games;

import com.backlog.backlog_games.models.MyGames;

public class TestHelper {

  public static MyGames yourGameTestEntity() {
    return new MyGames("123asd", "Cyberpunk 2077", 5, "nice game!");
  }

  public static MyGames yourGameTestEntity2() {
    return new MyGames("456zxc", "GTA 5", 4, "Not bad!");
  }

}
