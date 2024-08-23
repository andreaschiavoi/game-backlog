import React, { useEffect, useState } from "react";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import "./App.css";

interface Game {
  id: string;
  gameName: string;
  rating: number;
  comment: string;
}

const GamesTable: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<Partial<Game> | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/getAllGames")
      .then((response) => {
        setGames(response.data);
      })
      .catch((error) => {
        console.error("Error during data retrieval:", error);
      });
  }, []);

  const handleClickOpen = () => {
    setSelectedGame(null);
    setIsEditing(false);
    setOpen(true);
  };

  const handleEditOpen = (game: Game) => {
    setSelectedGame(game);
    setIsEditing(true);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (selectedGame) {
      setSelectedGame({ ...selectedGame, [name]: value });
    }
  };

  const handleSave = () => {
    if (isEditing && selectedGame?.id) {
      axios
        .put("http://localhost:8080/api/v1/update", selectedGame)
        .then((response) => {
          setGames(
            games.map((game) =>
              game.id === selectedGame.id ? response.data : game
            )
          );
          handleClose();
        })
        .catch((error) => {
          console.error("Error during update game:", error);
        });
    } else {
      axios
        .post("http://localhost:8080/api/v1/addNewGame", selectedGame)
        .then((response) => {
          setGames([...games, response.data]);
          handleClose();
        })
        .catch((error) => {
          console.error("Error during add new game:", error);
        });
    }
  };

  const handleDelete = (id: string) => {
    axios
      .delete(`http://localhost:8080/api/v1/deleteGame/${id}`)
      .then(() => {
        setGames(games.filter((game) => game.id !== id));
      })
      .catch((error) => {
        console.error("Error during delete game:", error);
      });
  };

  const filteredGames = games.filter((game) =>
    game.gameName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="games-container">
      <section className="games-header">
        <div className="overlay"></div>
        <div className="header-wrapper"></div>
        <div className="h1">Games Dashboard</div>
      </section>
      <Button className="btn-cta" onClick={handleClickOpen}>
        Add New Game
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{isEditing ? "Edit Game" : "Add New Game"}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="gameName"
            label="Game Name"
            type="text"
            fullWidth
            variant="outlined"
            value={selectedGame?.gameName || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="rating"
            label="Rating"
            type="number"
            fullWidth
            variant="outlined"
            value={selectedGame?.rating || ""}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="outlined"
            value={selectedGame?.comment || ""}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            {isEditing ? "Update" : "Save"}
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <TextField
          label="Search by Game Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Game Name</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Comment</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredGames.map((game) => (
              <TableRow key={game.id}>
                <TableCell>{game.gameName}</TableCell>
                <TableCell style={{ width: "104px" }}>{game.rating}</TableCell>
                <TableCell>{game.comment}</TableCell>
                <TableCell style={{ width: "112px" }}>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditOpen(game)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(game.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GamesTable;
