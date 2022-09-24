package com.bazzarek.dudle.chef.repository;

import java.util.List;
import java.util.Optional;
import com.bazzarek.dudle.chef.model.RecipeTag;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface RecipeTagRepository extends MongoRepository<RecipeTag, String> {

  Optional<RecipeTag> findByTag(String tag);

  List<RecipeTag> findTop10ByTagLike(String tagLike);

}
