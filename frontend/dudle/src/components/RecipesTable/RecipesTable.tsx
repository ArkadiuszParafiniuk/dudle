import { useState, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  TextField,
  IconButton,
} from "@material-ui/core";
import { Recipe } from "../../model/Recipe";
import { constants } from "../../constans/constants";
import SearchIcon from "@mui/icons-material/Search";
import { getTypeOfDishByKey } from "../../model/enum/TypeOfDish";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import DeleteIcon from "@mui/icons-material/Delete";

export const RecipesTable = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [tags, setTags] = useState<string[]>([]);
  const [chosenTags, setChosenTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTags();
    fetch(constants.chefBaseUrl + "/recipe/getAll")
      .then((res) => res.json())
      .then(setData);
  }, []);

  useEffect(() => {
    fetchTags();
  }, [tagInput]);

  useEffect(() => {
    search();
  }, [title, chosenTags]);

  function fetchTags() {
    if (tagInput.length) {
      fetch(constants.chefBaseUrl + "/recipeTag/find?tagName=" + tagInput)
        .then((res) => res.json())
        .then((res) => {
          setTags(res);
        });
    } else {
      fetch(constants.chefBaseUrl + "/recipeTag/find?")
        .then((res) => res.json())
        .then((res) => {
          setTags(res);
        });
    }
  }

  const search = () => {
    let requestUrl = constants.chefBaseUrl + "/recipe/find?title=" + title;
    if (chosenTags.length) {
      chosenTags.forEach((t) => {
        requestUrl = requestUrl.concat("&tags=" + t);
      });
    }
    fetch(requestUrl)
      .then((res) => res.json())
      .then(setData);
  };

  const onTagInputChange = (value: string) => {
    setTagInput(value.toUpperCase());
  };

  const handleSetTitle = (title: string) => {
    setTitle(title);
  };

  const handleDeleteTag = (tag: string) => {
    let tags = chosenTags;
    setChosenTags(tags.filter((t: string) => t != tag));
  };

  const handleAddTagButton = () => {
    let tags = chosenTags;
    if (!tags.includes(tagInput.toUpperCase())) {
      setChosenTags(tags.concat(tagInput.toUpperCase()));
    }
    setTagInput("");
  };

  const handleAddTag = (
    event: React.KeyboardEvent<HTMLDivElement>,
    target: HTMLInputElement
  ) => {
    if (event.code === "Enter") {
      let tags = chosenTags;
      if (!tags.includes(target.value)) {
        setChosenTags(tags.concat(target.value));
      }
      setTagInput("");
    }
  };

  return (
    <Fragment>
      <form>
        <TextField
          id="search-bar"
          className="text"
          variant="outlined"
          placeholder="Szukaj przepisu..."
          size="small"
          onChange={(e) => handleSetTitle(e.target.value)}
        />
        <IconButton type="submit" aria-label="search">
          <SearchIcon />
        </IconButton>
      </form>
      <div>
        <Autocomplete
          id="tag-input-field"
          style={{ display: "inline-block" }}
          freeSolo
          options={tags}
          sx={{ width: 300 }}
          value={tagInput}
          onKeyUp={(e) => handleAddTag(e, e.target as HTMLInputElement)}
          onInputChange={(e, v) => onTagInputChange(v ? v.toUpperCase() : "")}
          blurOnSelect
          renderInput={(params) => (
            <TextField {...params} label="Filtruj po tagu" />
          )}
        />
        <IconButton
          style={{ marginTop: "40px" }}
          onClick={() => handleAddTagButton()}
        >
          <AddIcon />
        </IconButton>
      </div>
      {chosenTags?.map((chosenTag: string) => (
        <Fragment>
          <Button variant="outlined">{chosenTag}</Button>
          <IconButton
            aria-label="delete"
            size="small"
            onClick={() => handleDeleteTag(chosenTag)}
          >
            <DeleteIcon />
          </IconButton>
        </Fragment>
      ))}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Danie</b>
              </TableCell>
              <TableCell>
                <b>Typ</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((recipe: Recipe) => (
              <TableRow
                key={recipe.uuid}
                onClick={() => navigate(`/recipe/${recipe.uuid}`)}
              >
                <TableCell>{recipe.title}</TableCell>
                <TableCell>{getTypeOfDishByKey(recipe.typeOfDish)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button
        className="Button"
        variant="contained"
        onClick={() => navigate(`/recipe/create`)}
      >
        Dodaj przepis
      </Button>
    </Fragment>
  );
};
