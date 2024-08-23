package com.backlog.backlog_games.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "myGames")
public class MyGame {

  @Id
  private String id;
  private String gameName;
  private int rating;
  private String comment;

  public MyGame() {}

  public MyGame(String id, String gameName, int rating, String comment) {
    this.id = id;
    this.gameName = gameName;
    this.rating = rating;
    this.comment = comment;
  }

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getGameName() {
    return gameName;
  }

  public void setGameName(String gameName) {
    this.gameName = gameName;
  }

  public int getRating() {
    return rating;
  }

  public void setRating(int rating) {
    this.rating = rating;
  }

  public String getComment() {
    return comment;
  }

  public void setComment(String comment) {
    this.comment = comment;
  }
}
