package com.backlog.backlog_games.controller;

import com.backlog.backlog_games.exceptions.GameNotFoundException;
import com.backlog.backlog_games.models.MyGame;
import com.backlog.backlog_games.service.BacklogService;
import com.backlog.backlog_games.steam.SteamLibraryExporter;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Objects;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class BacklogController {

  @Autowired
  private BacklogService service;

  @GetMapping("/getAllGames")
  public List<MyGame> retrieveAllGames() {
    return service.findAllGames();
  }

  @PostMapping("/addNewGame")
  public ResponseEntity<MyGame> addNewGame(@Valid @RequestBody MyGame newGame) {
    MyGame toSaveGame = service.addNewGame(newGame);
    return ResponseEntity.ok(toSaveGame);
  }

  @DeleteMapping("/deleteGame/{id}")
  public ResponseEntity<Void> deleteGame(@PathVariable String id) {
    boolean isGameRemoved = service.removeGameById(id);
    if (!isGameRemoved) {
      return ResponseEntity.notFound().build();
    } else {
      return ResponseEntity.noContent().build();
    }
  }

  @PutMapping("/update")
  public ResponseEntity<MyGame> updateGame(@Valid @RequestBody MyGame updatedGame) {
    try {
      MyGame updated = service.editGame(updatedGame);
      return ResponseEntity.ok(updated);
    } catch (GameNotFoundException e) {
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    }
  }

  @PostMapping("/importSteamLibrary")
  public ResponseEntity<List<MyGame>> importSteamLibrary() {
    List<MyGame> myGames = SteamLibraryExporter.retrieveSteamLibrary(service);
    return ResponseEntity.ok(myGames);
  }

  @ExceptionHandler(MethodArgumentNotValidException.class)
  public ResponseEntity<String> handleValidationExceptions(MethodArgumentNotValidException ex) {
    String errorMessage = Objects.requireNonNull(ex.getBindingResult().getFieldError())
        .getDefaultMessage();
    return ResponseEntity.badRequest().body(errorMessage);
  }
}
