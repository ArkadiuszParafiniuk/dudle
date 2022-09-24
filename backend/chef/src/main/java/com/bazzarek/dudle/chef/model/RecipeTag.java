package com.bazzarek.dudle.chef.model;

import io.swagger.v3.oas.annotations.media.Schema;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("recipeTag")
@Data
@Builder(toBuilder = true)
@Schema(name = "RecipeTag", description = "RecipeTag schema")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class RecipeTag {

  @NotNull
  @Indexed(unique = true)
  String tag;

}
