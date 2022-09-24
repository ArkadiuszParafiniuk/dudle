import React from "react";
import "./App.css";
import HeaderBar from "./HeaderBar/HeaderBar";
import { RecipesTable } from "./RecipesTable/RecipesTable";
import Container from "@material-ui/core/Container";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { Paper, MuiThemeProvider, createTheme, Grid } from "@material-ui/core";
import { RecipeDetails } from "./RecipeDetails/RecipeDetails";
import { EditRecipeDetails } from "./EditRecipeDetails/EditRecipeDetails";
import "../styles/AppStyle.scss";

type AppState = {};

class App extends React.Component<{}, AppState> {
  theme = createTheme({
    palette: {
      primary: {
        main: "#ff6600",
      },
      secondary: {
        main: "#fd7909",
      },
    },
  });

  render(): React.ReactNode {
    return (
      <MuiThemeProvider theme={this.theme}>
        <Container className="App">
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Paper>
                <BrowserRouter>
                  <HeaderBar headerText="Przepiśnik" />
                  <Routes>
                    <Route path="/" element={<RecipesTable />} />
                    <Route path="/recipe/:uuid" element={<RecipeDetails />} />
                    <Route
                      path="/recipe/:uuid/edit"
                      element={<EditRecipeDetails />}
                    />
                    <Route
                      path="/recipe/create"
                      element={<EditRecipeDetails />}
                    />
                  </Routes>
                </BrowserRouter>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default App;
