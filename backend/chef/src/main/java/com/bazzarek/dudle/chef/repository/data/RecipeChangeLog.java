package com.bazzarek.dudle.chef.repository.data;

import java.util.UUID;
import com.bazzarek.dudle.chef.model.Recipe;
import com.github.cloudyrock.mongock.ChangeLog;
import com.github.cloudyrock.mongock.ChangeSet;
import com.github.cloudyrock.mongock.driver.mongodb.springdata.v3.decorator.impl.MongockTemplate;
import com.mongodb.client.MongoDatabase;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

@ChangeLog
@Component
@Slf4j
public class RecipeChangeLog {

  @ChangeSet(id = "putInitialRecipe", order = "001", author = "bazzarek")
  public void putInitialRecipe(MongoDatabase mongoDatabase,
                                              MongockTemplate mongockTemplate) {
    mongockTemplate.save(Recipe.builder()
            .uuid(UUID.randomUUID().toString())
            .title("test recipe")
            .content("test recipe content")
            .build());
  }
}
