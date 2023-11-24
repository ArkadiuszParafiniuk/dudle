package com.bazzarek.dudle.chef.controller;

import java.util.List;
import com.bazzarek.dudle.chef.model.Recipe;
import com.bazzarek.dudle.chef.service.RecipeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Tag(name = "recipe", description = "Recipe controller API")
@RestController
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@RequestMapping(path = "/recipe")
public class RecipeController {

  @Value("${recipe.write}")
  private boolean isRecipeEditEnabled;

  private final RecipeService recipeService;

  @GetMapping(path = "/getAll")
  @CrossOrigin
  public List<Recipe> getAllRecipes() {
    return recipeService.getAll();
  }

  @GetMapping(path = "/{recipeUuid}")
  @CrossOrigin
  public Recipe getByUuid(@PathVariable String recipeUuid) {
    return recipeService.getByUuid(recipeUuid);
  }

  @GetMapping(path = "/find")
  @CrossOrigin
  public List<Recipe> findByParameters(@RequestParam(required = false) String title,
                                  @RequestParam(required = false) String typeOfDish,
                                  @RequestParam(required = false) List<String> tags) {
    return recipeService.findByParameters(title, typeOfDish, tags);
  }

  @GetMapping(path = "/isEditEnabled")
  @CrossOrigin
  public boolean isEditEnabled() {
    return isRecipeEditEnabled;
  }

  @PostMapping(path = "/create", consumes = "application/json")
  @CrossOrigin
  public Recipe createRecipe(@RequestBody Recipe recipe) {
    if (!isRecipeEditEnabled) {
      throw new RuntimeException("Recipe write is disabled");
    }
    return recipeService.create(recipe);
  }

  @PostMapping(path = "/{recipeUuid}/addPhoto", consumes = "multipart/form-data")
  @CrossOrigin
  public void addPhoto(@PathVariable String recipeUuid, @RequestParam(value = "image") MultipartFile image) {
    if (!isRecipeEditEnabled) {
      throw new RuntimeException("Recipe write is disabled");
    }
    recipeService.addPhoto(recipeUuid, image);
  }

  @PutMapping(path = "/update/{recipeUuid}", consumes = "application/json")
  @CrossOrigin
  public Recipe updateRecipe(@PathVariable String recipeUuid, @RequestBody Recipe recipe) {
    if (!isRecipeEditEnabled) {
      throw new RuntimeException("Recipe write is disabled");
    }
    return recipeService.update(recipeUuid, recipe);
  }

  @DeleteMapping(path = "/delete/{recipeUuid}")
  @CrossOrigin
  public void deleteRecipe(@PathVariable String recipeUuid) {
    if (!isRecipeEditEnabled) {
      throw new RuntimeException("Recipe write is disabled");
    }
    recipeService.delete(recipeUuid);
  }

}
