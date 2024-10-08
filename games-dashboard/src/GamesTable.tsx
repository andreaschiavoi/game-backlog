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
  millisecondPlayed: number;
  comment: string;
}

const GamesTable: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [selectedGame, setSelectedGame] = useState<Partial<Game>>({});
  const [timePlayedInput, setTimePlayedInput] = useState<string>("0h 0m");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [gameToDelete, setGameToDelete] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

  const formatMilliseconds = (milliseconds: number): string => {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  const convertToMilliseconds = (timeString: string): number => {
    let hours = 0;
    let minutes = 0;

    const hoursMatch = timeString.match(/(\d+)h/);
    const minutesMatch = timeString.match(/(\d+)m/);

    if (hoursMatch) {
      hours = parseInt(hoursMatch[1], 10);
    }
    if (minutesMatch) {
      minutes = parseInt(minutesMatch[1], 10);
    }

    const hoursInMilliseconds = hours * 60 * 60 * 1000;
    const minutesInMilliseconds = minutes * 60 * 1000;

    return hoursInMilliseconds + minutesInMilliseconds;
  };

  const handleClickOpen = () => {
    setSelectedGame({});
    setTimePlayedInput("0h 0m");
    setIsEditing(false);
    setError(null);
    setOpen(true);
  };

  const handleEditOpen = (game: Game) => {
    setSelectedGame(game);
    setTimePlayedInput(formatMilliseconds(game.millisecondPlayed || 0));
    setIsEditing(true);
    setError(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setConfirmOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "millisecondPlayed") {
      setTimePlayedInput(value);
    } else {
      setSelectedGame({
        ...selectedGame,
        [name]: value,
      });
    }
  };

  const handleSave = () => {
    const updatedGame = {
      ...selectedGame,
      millisecondPlayed: convertToMilliseconds(timePlayedInput),
    };

    if (isEditing && updatedGame.id) {
      axios
        .put("http://localhost:8080/api/v1/update", updatedGame)
        .then((response) => {
          setGames(
            games.map((game) =>
              game.id === updatedGame.id ? response.data : game
            )
          );
          handleClose();
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setError(error.response.data);
          } else {
            console.error("Error during update game:", error);
          }
        });
    } else {
      axios
        .post("http://localhost:8080/api/v1/addNewGame", updatedGame)
        .then((response) => {
          setGames([...games, response.data]);
          handleClose();
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            setError(error.response.data);
          } else {
            console.error("Error during add new game:", error);
          }
        });
    }
  };

  const handleDeleteOpen = (id: string) => {
    setGameToDelete(id);
    setConfirmOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (gameToDelete) {
      axios
        .delete(`http://localhost:8080/api/v1/deleteGame/${gameToDelete}`)
        .then(() => {
          setGames(games.filter((game) => game.id !== gameToDelete));
          handleClose();
        })
        .catch((error) => {
          console.error("Error during delete game:", error);
        });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  const handleConfirmKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleDeleteConfirm();
    }
  };

  const filteredGames = games.filter((game) =>
    game.gameName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="games-container">
      <section className="games-header">
        <div className="overlay"></div>
        <div className="header-wrapper"></div>
        <div className="h1">Games Dashboard</div>
      </section>
      <section className="games-search-add">
        <TextField
          className="search-game"
          label="Search by Game Name"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <p>OR</p>
        <Button className="btn-cta" onClick={handleClickOpen}>
          Add New Game
        </Button>
      </section>
      <section className="games-table">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Game Name</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Time Played</TableCell>
                <TableCell>Comment</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGames.map((game) => (
                <TableRow key={game.id}>
                  <TableCell>{game.gameName}</TableCell>
                  <TableCell style={{ width: "104px" }}>
                    {game.rating}
                  </TableCell>
                  <TableCell>
                    {formatMilliseconds(game.millisecondPlayed)}
                  </TableCell>
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
                      onClick={() => handleDeleteOpen(game.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </section>
      <section className="games-modals">
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>{isEditing ? "Edit Game" : "Add New Game"}</DialogTitle>
          <DialogContent>
            {error && <p style={{ color: "red" }}>{error}</p>}
            <TextField
              autoFocus
              margin="dense"
              name="gameName"
              label="Game Name"
              type="text"
              fullWidth
              variant="outlined"
              value={selectedGame.gameName || ""}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              error={!!error && selectedGame.gameName === ""}
              helperText={!!error && selectedGame.gameName === "" ? error : ""}
            />
            <TextField
              margin="dense"
              name="millisecondPlayed"
              label="Time Played (e.g., 2h 30m)"
              type="string"
              fullWidth
              variant="outlined"
              value={timePlayedInput}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <TextField
              margin="dense"
              name="rating"
              label="Rating"
              type="number"
              fullWidth
              variant="outlined"
              value={selectedGame.rating || ""}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <TextField
              margin="dense"
              name="comment"
              label="Comment"
              type="text"
              fullWidth
              variant="outlined"
              value={selectedGame.comment || ""}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
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
        <Dialog
          open={confirmOpen}
          onClose={handleClose}
          aria-labelledby="confirm-dialog-title"
          onKeyDown={handleConfirmKeyDown}
        >
          <DialogTitle id="confirm-dialog-title">Confirm Delete</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this game?
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDeleteConfirm} color="secondary">
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </section>
    </div>
  );
};

export default GamesTable;
