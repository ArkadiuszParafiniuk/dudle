package com.bazzarek.dudle.chef.controller;

import java.util.List;
import java.util.Optional;
import com.bazzarek.dudle.chef.service.RecipeTagService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "recipe", description = "Recipe controller API")
@RestController
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
@RequestMapping(path = "/recipeTag")
public class RecipeTagController {

  private final RecipeTagService recipeTagService;

  @GetMapping(path = "/find")
  @CrossOrigin
  public List<String> findByParameters(@RequestParam(required = false) String tagName) {
    return recipeTagService.findByName(Optional.ofNullable(tagName).orElse(""));
  }
}
