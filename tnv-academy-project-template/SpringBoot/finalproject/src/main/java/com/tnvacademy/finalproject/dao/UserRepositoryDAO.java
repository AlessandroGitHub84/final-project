package com.tnvacademy.finalproject.dao;

import com.tnvacademy.finalproject.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository("dbUserDAO")
public interface UserRepositoryDAO extends CrudRepository<User, Integer> {
    public List<User> findByUsernameContains(String username);

}
