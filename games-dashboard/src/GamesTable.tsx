import React, { useEffect, useState } from "react";
import axios from 'axios';

interface Game {
    _id: string;
    gameName: string;
    rating: number;
    comment: string;
}
const GamesTable: React.FC = () => {
    const [games, setGames] = useState<Game[]>([]);
  
    useEffect(() => {
      // Recupero dei dati dall'API
      axios.get('http://localhost:8080/api/v1/getAllGames')
        .then(response => {
          setGames(response.data);
        })
        .catch(error => {
          console.error('Errore durante il recupero dei dati:', error);
        });
    }, []);
  
    return (
      <div>
        <h1>Games Dashboard</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Game Name</th>
              <th>Rating</th>
              <th>Comment</th>
            </tr>
          </thead>
          <tbody>
            {games.map(game => (
              <tr key={game._id}>
                <td>{game._id}</td>
                <td>{game.gameName}</td>
                <td>{game.rating}</td>
                <td>{game.comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default GamesTable;
  