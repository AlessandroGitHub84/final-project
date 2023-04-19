package com.tnvacademy.finalproject.repository;

import com.tnvacademy.finalproject.model.User;
import org.jetbrains.annotations.NotNull;

import java.util.*;

public class InMemoryDatabase {
    static Map<Integer, User> users = new HashMap<>();
    //         keys     values
    static int lastIndex = 0;

    public static int addUser(@NotNull User user) {
        user.setId(++lastIndex);
        users.put(user.getId(), user);
        return 1;
    }

    public static User getUserById(int id) {
        return users.get(id);
    }

    public static List<User> getUsers() {
//        ArrayList<User> usersResult = new ArrayList<>();
//        for (Integer i : users.keySet()) {
//            User user = users.get(i);
//            usersResult.add(user);
//        }
//        return usersResult;
        Collection<User> usersValues = users.values();
        return new ArrayList<>(usersValues);
    }

    public static int updateUser(int id, User user) {
        User userRecuperato = users.get(id);
        /*if (userRecuperato == null) {
            addUser(user);
        } else {
            userRecuperato.setUsername(user.getUsername());
            userRecuperato.setPassword(user.getPassword());
        }*/
        if (userRecuperato == null) {
            return -1;
        } else {
            user.setId(id);
            users.put(id, user);
        }
        return 1;
    }

    public static int deleteUser(int id) {
        User userRecuperato = users.get(id);
        if (userRecuperato == null) {
            return -1;
        } else {
            //users.put(id, null);
            users.remove(id);
            return 1;
        }
    }
}

