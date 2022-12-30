import React, { useState, useEffect, Fragment, useRef } from "react";
import { Recipe } from "../../model/Recipe";
import { Ingredient } from "../../model/Ingredient";
import AlertDialog from "../AlertDialog/AlertDialog";
import { useParams } from "react-router-dom";
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
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Autocomplete from "@mui/material/Autocomplete";
import { useNavigate } from "react-router-dom";
import { constants } from "../../constans/constants";
import {
  TypeOfDish,
  getTypeOfDishByEnumValue,
  getTypeOfDishByKey,
} from "../../model/enum/TypeOfDish";

export const EditRecipeDetails = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(
    new Recipe("", "", [], TypeOfDish.DINNER, [])
  );
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [chosenTags, setChosenTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [picture, setPicture] = useState({});

  useEffect(() => {
    fetchTags();
    if (uuid) {
      fetchRecipeData();
    }
  }, []);

  function fetchRecipeData() {
    fetch(constants.chefBaseUrl + "/recipe/" + uuid)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setTitle(res.title);
        setContent(res.content);
        setCategory(getTypeOfDishByKey(res.typeOfDish));
        setChosenTags(res.tags);
        res.ingredients.map((ingredient: Ingredient) => {
          ingredient.id = Math.random();
        });
        setIngredients(res.ingredients);
      });
  }

  function fetchTags() {
    fetch(constants.chefBaseUrl + "/recipeTag/find?tagName=")
      .then((res) => res.json())
      .then((res) => {
        setTags(res);
      });
  }

  const handleSaveRecipe = () => {
    if (isRecipeValid()) {
      if (uuid) {
        fetch(constants.chefBaseUrl + "/recipe/update/" + uuid, {
          method: "PUT",
          body: JSON.stringify(
            new Recipe(
              title,
              content,
              ingredients,
              getTypeOfDishByEnumValue(category),
              chosenTags,
              data.uuid
            )
          ),
          headers: { "Content-Type": "application/json" },
        }).then(() => navigate(`/recipe/` + uuid));
      } else {
        fetch(constants.chefBaseUrl + "/recipe/create", {
          method: "POST",
          body: JSON.stringify(
            new Recipe(
              title,
              content,
              ingredients,
              getTypeOfDishByEnumValue(category),
              chosenTags
            )
          ),
          headers: { "Content-Type": "application/json" },
        })
          .then((res) => res.json())
          .then((res) => navigate(`/recipe/` + res.uuid));
      }
    }
  };

  const isRecipeValid = () => {
    if (!Boolean(title)) {
      return false;
    }
    if (!Boolean(content)) {
      return false;
    }
    return true;
  };

  const handleCancel = () => {
    navigate(`/recipe/` + uuid);
  };

  const onTitleChange = (value: string) => {
    setTitle(value);
  };

  const onContentChange = (value: string) => {
    setContent(value);
  };

  const onCategoryChange = (value: string) => {
    setCategory(value);
  };

  const onTagInputChange = (value: string) => {
    setTagInput(value.toUpperCase());
  };

  const addIngredient = () => {
    setIngredients([
      ...getIngredientsListWithAdded(
        new Ingredient("", "", Math.random() * 100000)
      ),
    ]);
  };

  const deleteIngredient = (ingredientId: number) => {
    setIngredients([...getIngredientsListWithoutDeleted(ingredientId)]);
  };

  const getIngredientsListWithoutDeleted = (ingredientId: number) => {
    let ings = ingredients;
    const index = ings.findIndex(
      (ingredient) => ingredient.id === ingredientId
    );
    if (index > -1) {
      ings.splice(index, 1);
    }
    return ings;
  };

  const getIngredientsListWithAdded = (ingredient: Ingredient) => {
    let ings = ingredients;
    ings.push(ingredient);
    return ings;
  };

  const onIngredientNameChange = (ingredient: Ingredient, newName: string) => {
    let ings = ingredients;
    let ingToModify = ings.find((ing) => ing.id === ingredient.id);
    if (ingToModify != undefined) {
      ingToModify.ingredient = newName;
    }
    setIngredients([...ings]);
  };

  const onIngredientAmountChange = (
    ingredient: Ingredient,
    newAmount: string
  ) => {
    let ings = ingredients;
    let ingToModify = ings.find((ing) => ing.id === ingredient.id);
    if (ingToModify != undefined) {
      ingToModify.amount = newAmount;
    }
    setIngredients([...ings]);
  };

  const handleAddTag = (
    event: React.KeyboardEvent<HTMLDivElement>,
    target: HTMLInputElement
  ) => {
    if (event.code === "Enter") {
      let tags = chosenTags;
      setChosenTags(tags.concat(target.value));
    }
  };

  const handleAddTagButton = () => {
    let tags = chosenTags;
    setChosenTags(tags.concat(tagInput.toUpperCase()));
  };

  const handleDeleteTag = (tag: string) => {
    let tags = chosenTags;
    setChosenTags(tags.filter((t: string) => t != tag));
  };

  const addPhoto = (files: FileList | null) => {
    if (files == null) {
      return;
    }
    const formData = new FormData();
    formData.append("image", files[0]);

    fetch(constants.chefBaseUrl + "/recipe/" + uuid + "/addPhoto", {
      method: "post",
      body: formData,
    });
  };

  return (
    <div className="DetailsContainer">
      <TextField
        id="title-input-field"
        label="Nazwa"
        variant="standard"
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
      />
      <Autocomplete
        options={Object.values(TypeOfDish).filter(
          (value) => value != "Wszystkie"
        )}
        sx={{ width: 300 }}
        value={category}
        onInputChange={(e, v) => onCategoryChange(v ? v : "")}
        freeSolo
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label="Kategoria" />}
      />
      <div>
        <Autocomplete
          id="tag-input-field"
          style={{ display: "inline-block" }}
          options={tags}
          freeSolo
          sx={{ width: 300 }}
          onKeyUp={(e) => handleAddTag(e, e.target as HTMLInputElement)}
          onInputChange={(e, v) => onTagInputChange(v ? v.toUpperCase() : "")}
          renderInput={(params) => <TextField {...params} label="Dodaj tag" />}
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
      <TableContainer
        component={Paper}
        className="VerticalElement"
        variant="outlined"
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <b>Składnik</b>
              </TableCell>
              <TableCell>
                <b>Ilość</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ingredients?.map((ingredient: Ingredient) => (
              <TableRow>
                <TableCell>
                  <TextField
                    id="content-input-field"
                    variant="standard"
                    defaultValue={ingredient.ingredient}
                    onChange={(e) =>
                      onIngredientNameChange(ingredient, e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    id="content-input-field"
                    variant="standard"
                    defaultValue={ingredient.amount}
                    onChange={(e) =>
                      onIngredientAmountChange(ingredient, e.target.value)
                    }
                  />
                </TableCell>
                <IconButton
                  aria-label="delete"
                  size="small"
                  onClick={() => deleteIngredient(ingredient.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button variant="outlined" onClick={() => addIngredient()} style={{}}>
          Dodaj składnik
        </Button>
        {!constants.featurePhotos ? null : (
          <input
            type="file"
            name="image"
            onChange={(e) => addPhoto(e.target.files)}
          />
        )}
      </TableContainer>
      <TextField
        className="MultilineTextfield VerticalElement"
        id="content-input-field"
        label="Przepis"
        variant="outlined"
        multiline
        minRows={5}
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
      />
      <div className="VerticalElement">
        <AlertDialog
          buttonText="Zapisz"
          dialogText="Czy napewno chcesz zapisać zmiany w przepisie?"
          acceptText="Zapisz"
          onAccept={() => handleSaveRecipe()}
        />
        <Button
          className="Button"
          variant="contained"
          onClick={() => handleCancel()}
        >
          Anuluj
        </Button>
      </div>
    </div>
  );
};
