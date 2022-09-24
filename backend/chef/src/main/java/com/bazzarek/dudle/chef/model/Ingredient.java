package com.bazzarek.dudle.chef.model;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@Schema(name = "Ingredient", description = "Ingredient schema")
public class Ingredient {

  String ingredient;
  String amount;

}
