package com.backlog.backlog_games.controller;

import com.backlog.backlog_games.models.YourGame;
import com.backlog.backlog_games.service.BacklogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class BacklogController {

    @Autowired
    private BacklogService service;

    @GetMapping("/getAllGames")
    public List<YourGame> retrieveAllGames() {
        return service.findAllGames();
    }

    @PostMapping("/addNewGame")
    public YourGame addNewGame(YourGame newGame) {
        return service.addNewGame(newGame);
    }

}
