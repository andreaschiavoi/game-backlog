package com.backlog.backlog_games.controller;

import com.backlog.backlog_games.models.MyGames;
import com.backlog.backlog_games.service.BacklogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@CrossOrigin(origins = "http://localhost:3000")
public class BacklogController {

    @Autowired
    private BacklogService service;

    @GetMapping("/getAllGames")
    public List<MyGames> retrieveAllGames() {
        return service.findAllGames();
    }

    @PostMapping("/addNewGame")
    public ResponseEntity<MyGames> addNewGame(@RequestBody MyGames newGame) {
        MyGames toSaveGame = service.addNewGame(newGame);
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
}
