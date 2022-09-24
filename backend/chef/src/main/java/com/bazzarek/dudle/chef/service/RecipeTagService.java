package com.bazzarek.dudle.chef.service;

import java.util.List;
import java.util.stream.Collectors;
import com.bazzarek.dudle.chef.model.RecipeTag;
import com.bazzarek.dudle.chef.repository.RecipeTagRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor(onConstructor_ = {@Autowired})
public class RecipeTagService {

  private final RecipeTagRepository repository;

  public List<String> findByName(String tagName) {
    return repository.findTop10ByTagLike(tagName).stream()
            .map(RecipeTag::getTag)
            .collect(Collectors.toList());
  }

  public void addTagIfNotExists(String tag) {
    if (repository.findByTag(tag.toUpperCase()).isEmpty()) {
      repository.save(RecipeTag.builder()
              .tag(tag.toUpperCase())
              .build());
    }
  }

}
