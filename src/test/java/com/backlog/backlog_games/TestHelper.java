package com.backlog.backlog_games;

import com.backlog.backlog_games.models.MyGame;

public class TestHelper {

  public static MyGame yourGameTestEntity() {
    return new MyGame("123asd", "Cyberpunk 2077", 5, "nice game!");
  }

  public static MyGame yourGameTestEntity2() {
    return new MyGame("456zxc", "GTA 5", 4, "Not bad!");
  }

}
