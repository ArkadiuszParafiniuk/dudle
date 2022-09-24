package com.bazzarek.dudle.chef.service;

import java.io.IOException;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;
import com.bazzarek.dudle.chef.exception.RecipeNotFoundException;
import com.bazzarek.dudle.chef.model.Recipe;
import com.bazzarek.dudle.chef.repository.RecipeRepository;
import lombok.RequiredArgsConstructor;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class RecipeService {

  private final RecipeRepository repository;
  private final RecipeTagService recipeTagService;

  public List<Recipe> getAll() {
    return repository.findAll();
  }

  public Recipe getByUuid(String recipeUuid) {
    return repository.findByUuid(recipeUuid)
            .orElseThrow(RecipeNotFoundException::new);
  }

  public List<Recipe> findByParameters(String title, String typeOfDish, List<String> tags) {
    return CollectionUtils.isEmpty(tags)
            ? repository.findAllByTitleAndTypeOfDish(
                Optional.ofNullable(title).orElse(""),
                Optional.ofNullable(typeOfDish).orElse(""))
            : repository.findAllByTitleAndTypeOfDishAndTags(
                Optional.ofNullable(title).orElse(""),
                Optional.ofNullable(typeOfDish).orElse(""),
                tags);
  }

  public Recipe create(Recipe recipe) {

    Optional.ofNullable(recipe.getTags())
                    .ifPresent(tags -> {
                      tags.forEach(recipeTagService::addTagIfNotExists);
                    });

    return repository.save(recipe.toBuilder()
            .uuid(UUID.randomUUID().toString())
            .tags(Optional.ofNullable(recipe.getTags())
                    .map(tags -> tags.stream()
                            .map(String::toUpperCase)
                            .collect(Collectors.toList()))
                    .orElse(Collections.emptyList()))
            .build());
  }

  public Recipe update(String recipeUuid, Recipe newRecipe) {

    Optional.ofNullable(newRecipe.getTags())
            .ifPresent(tags -> {
              tags.forEach(recipeTagService::addTagIfNotExists);
            });

    Recipe recipe = repository.findByUuid(recipeUuid)
            .map(oldRecipe -> oldRecipe.toBuilder()
                    .title(newRecipe.getTitle())
                    .content(newRecipe.getContent())
                    .typeOfDish(newRecipe.getTypeOfDish())
                    .ingredients(newRecipe.getIngredients())
                    .tags(Optional.ofNullable(newRecipe.getTags())
                            .map(tags -> tags.stream()
                                    .map(String::toUpperCase)
                                    .collect(Collectors.toList()))
                            .orElse(Collections.emptyList()))
                    .build()).orElseThrow(RecipeNotFoundException::new);
    return repository.save(recipe);
  }

  public void addPhoto(String recipeUuid, MultipartFile file) {
    repository.findByUuid(recipeUuid)
            .ifPresent(oldRecipe -> {
              List<Binary> images = oldRecipe.getImages();
              try {
                images.add(new Binary(BsonBinarySubType.BINARY, file.getBytes()));
              } catch (IOException e) {
                e.printStackTrace();
              }
              repository.save(oldRecipe.toBuilder()
                      .images(images)
                      .build());
            });
  }

  public void delete(String recipeUuid) {
    repository.deleteByUuid(recipeUuid);
  }

}
