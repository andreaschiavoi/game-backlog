package com.backlog.backlog_games.exceptions;

public class GameNotFoundException extends RuntimeException{

  public GameNotFoundException(String message) {
    super(message);
  }

}
