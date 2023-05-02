package com.tnvacademy.finalproject.controller;

import  com.tnvacademy.finalproject.model.User;
import com.tnvacademy.finalproject.service.AuthenticationException;
import  com.tnvacademy.finalproject.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/auth/users")
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //CRUD operations (Create Read Update Delete)

    // CREATE - Aggiungi nuovo utente
    @PostMapping("/")
    public User addUser(@RequestBody User user) {
        try {
            return userService.addUser(user);
        } catch (ResponseStatusException e) {
            throw e;
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nell'aggiunta dello user", e);
        }
    }

    // READ - Leggi utente con id specifico
    @GetMapping("/{id}")
    public User getUserById(@PathVariable("id") int id) {
        return userService.getUser(id);
    }

    // READ - Leggi tutti gli utenti
    @GetMapping("/")
    public Iterable<User> allUsers() {
        return userService.allUsers();
    }

    // UPDATE - Aggiorna utente con id specifico
    @PutMapping("/{id}")
    public String updateUser(@PathVariable("id") int id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    // DELETE - Cancella utente con id specifico
    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable("id") int id) {
        return userService.deleteUser(id);
    }

    // LOGIN - Autenticazione utente
    @PostMapping("/login")
    public User loginUser(@RequestBody User user) {
        try {
            return userService.login(user);
        } catch (AuthenticationException e) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, e.getMessage(), e);
        }
    }

}

