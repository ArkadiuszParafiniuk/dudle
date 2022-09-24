package com.bazzarek.dudle.chef.config;

import com.bazzarek.dudle.chef.repository.data.RecipeChangeLog;
import com.bazzarek.dudle.chef.repository.RecipeRepository;
import com.github.cloudyrock.mongock.driver.mongodb.springdata.v3.SpringDataMongoV3Driver;
import com.github.cloudyrock.spring.v5.MongockSpring5;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@Configuration
@EnableMongoRepositories(basePackageClasses = RecipeRepository.class)
public class MongoConfig {

  @Bean
  public MongockSpring5.MongockApplicationRunner mongockApplicationRunner(
          ApplicationContext springContext, MongoTemplate mongoTemplate) {
    return MongockSpring5.builder()
            .setDriver(SpringDataMongoV3Driver.withDefaultLock(mongoTemplate))
            .addChangeLogsScanPackage(RecipeChangeLog.class.getPackage().getName())
            .setSpringContext(springContext)
            .buildApplicationRunner();
  }
}
