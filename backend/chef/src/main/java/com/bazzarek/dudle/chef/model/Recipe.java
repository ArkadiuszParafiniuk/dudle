package com.bazzarek.dudle.chef.model;

import java.util.ArrayList;
import java.util.List;
import io.swagger.v3.oas.annotations.media.Schema;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.bson.types.Binary;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("recipe")
@Data
@Builder(toBuilder = true)
@Schema(name = "Recipe", description = "Recipe schema")
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Recipe {

  private transient ObjectId _id;

  @NotNull
  @Indexed(unique = true)
  String uuid;
  @NotNull
  String title;
  String content;
  List<Ingredient> ingredients;
  TypeOfDish typeOfDish;
  List<String> tags = new ArrayList<>();
  List<Binary> images = new ArrayList<>();

}
