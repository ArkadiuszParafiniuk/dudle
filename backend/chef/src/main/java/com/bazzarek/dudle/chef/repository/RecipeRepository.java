package com.bazzarek.dudle.chef.repository;

import java.util.List;
import java.util.Optional;
import com.bazzarek.dudle.chef.model.Recipe;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {

  Optional<Recipe> findByUuid(String uuid);

  @Query(value = "{'title': {$regex : ?0, $options: 'i'}, $or: [ { 'typeOfDish': { $exists: false } }, { 'typeOfDish': {$regex : ?1, $options: 'i' } } ] }")
  List<Recipe> findAllByTitleAndTypeOfDish(String title, String typeOfDish);

  @Query(value = "{'title': {$regex : ?0, $options: 'i'}, $or: [ { 'typeOfDish': { $exists: false } }, { 'typeOfDish': {$regex : ?1, $options: 'i' } } ], 'tags': {$all: ?2} }")
  List<Recipe> findAllByTitleAndTypeOfDishAndTags(String title, String typeOfDish, List<String> tags);

  void deleteByUuid(String uuid);

}
