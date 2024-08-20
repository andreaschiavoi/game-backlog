import React, { useEffect, useState } from "react";
import axios from 'axios';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Game {
  _id: string;
  gameName: string;
  rating: number;
  comment: string;
}

const GamesTable: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [newGame, setNewGame] = useState<Partial<Game>>({ gameName: '', rating: 0, comment: '' });

  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/getAllGames')
      .then(response => {
        setGames(response.data);
      })
      .catch(error => {
        console.error('Error during data retrieval:', error);
      });
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewGame({ ...newGame, [name]: value });
  };

  const handleSave = () => {
    axios.post('http://localhost:8080/api/v1/addNewGame', newGame)
      .then(response => {
        setGames([...games, response.data]);
        setNewGame({ gameName: '', rating: 0, comment: '' });
        handleClose();
      })
      .catch(error => {
        console.error('Error during add new game:', error);
      });
  };

  return (
    <div>
      <h1>Games Dashboard</h1>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        Add New Game
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add New Game</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="gameName"
            label="Game Name"
            type="text"
            fullWidth
            variant="outlined"
            value={newGame.gameName || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="rating"
            label="Rating"
            type="number"
            fullWidth
            variant="outlined"
            value={newGame.rating || ''}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            name="comment"
            label="Comment"
            type="text"
            fullWidth
            variant="outlined"
            value={newGame.comment || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Game Name</TableCell>
              <TableCell>Rating</TableCell>
              <TableCell>Comment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map(game => (
              <TableRow key={game._id}>
                <TableCell>{game.gameName}</TableCell>
                <TableCell>{game.rating}</TableCell>
                <TableCell>{game.comment}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default GamesTable;
