import { useState, useEffect } from "react";
import { Recipe } from "../../model/Recipe";
import { Ingredient } from "../../model/Ingredient";
import { useParams } from "react-router-dom";
import {
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TextField,
  TableBody,
  Button,
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { constants } from "../../constans/constants";
import AlertDialog from "../AlertDialog/AlertDialog";
import { TypeOfDish, getTypeOfDishByKey } from "../../model/enum/TypeOfDish";

export const RecipeDetails = () => {
  const { uuid } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(
    new Recipe("", "", [], TypeOfDish.DINNER, [], "")
  );
  useEffect(() => {
    fetch(constants.chefBaseUrl + "/recipe/" + uuid)
      .then((res) => res.json())
      .then(setData);
  }, []);

  const handleDeleteRecipe = () => {
    fetch(constants.chefBaseUrl + "/recipe/delete/" + uuid, {
      method: "DELETE",
    }).then(() => navigate(`/`));
  };

  const handleEditRecipe = () => {
    navigate(`/recipe/` + uuid + `/edit`);
  };

  return (
    <div className="DetailsContainer">
      <h2>{data.title}</h2>
      <h3>Kategoria: {getTypeOfDishByKey(data.typeOfDish)}</h3>
      <h3>
        Tagi:
        {data.tags.map((tag) => {
          return (
            <Button className="Button" variant="contained">
              {tag}
            </Button>
          );
        })}
      </h3>
      <h3>Składniki:</h3>
      <TableContainer component={Paper} variant="outlined">
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
            {data.ingredients?.map((ingredient: Ingredient) => (
              <TableRow key={ingredient.ingredient}>
                <TableCell>{ingredient.ingredient}</TableCell>
                <TableCell>{ingredient.amount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TextField
        className="MultilineTextfield VerticalElement"
        id="content-input-field"
        label="Przepis"
        variant="outlined"
        multiline
        minRows={5}
        value={data.content}
      />
      <Button
        className="Button"
        variant="contained"
        onClick={() => handleEditRecipe()}
      >
        Edytuj
      </Button>
      <AlertDialog
        buttonText="Usuń"
        dialogText="Czy napewno chcesz usunąć przepis?"
        acceptText="Usuń"
        onAccept={() => handleDeleteRecipe()}
      />
    </div>
  );
};
