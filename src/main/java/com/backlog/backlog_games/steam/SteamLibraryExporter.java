package com.backlog.backlog_games.steam;

import com.backlog.backlog_games.models.MyGame;
import com.backlog.backlog_games.service.BacklogService;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import org.json.JSONArray;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class SteamLibraryExporter {


  private static final String API_KEY = "EAAC77D7D38E862A2B38D39EDD6C15FF";
  private static final String STEAM_ID = "marugami95";
  private static final Logger log = LoggerFactory.getLogger(SteamLibraryExporter.class);

  public static List<MyGame> retrieveSteamLibrary(BacklogService service) {
    List<MyGame> addedGames = new ArrayList<>();
    try {
      String urlString = "http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/"
          + "?key=" + API_KEY + "&steamid=" + STEAM_ID + "&format=json&include_appinfo=1";
      URL url = new URL(urlString);
      HttpURLConnection conn = (HttpURLConnection) url.openConnection();
      conn.setRequestMethod("GET");

      int responseCode = conn.getResponseCode();
      if (responseCode == HttpURLConnection.HTTP_OK) {
        Scanner scanner = new Scanner(url.openStream());
        StringBuilder response = new StringBuilder();
        while (scanner.hasNext()) {
          response.append(scanner.nextLine());
        }
        scanner.close();

        JSONObject jsonResponse = new JSONObject(response.toString());
        JSONArray games = jsonResponse.getJSONObject("response").getJSONArray("games");

        for (int i = 0; i < games.length(); i++) {
          JSONObject game = games.getJSONObject(i);
          String gameName = game.getString("name");
          int playtimeMinutes = game.getInt("playtime_forever");
          long millisecondPlayed = playtimeMinutes * 60L * 1000L;
          addedGames.add(service.addNewGame(gameName, millisecondPlayed));
        }

        System.out.println("Libreria Steam esportata con successo in steam_library.csv");
        System.out.println("Successfully exported steam)library.csv");

      } else {
        System.out.println("Error connecting Steam API");
      }

    } catch (IOException e) {
      log.error("something went wrong on importing steam library");
    }
    return addedGames;
  }

}
