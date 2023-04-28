package com.tnvacademy.finalproject.service;

import com.tnvacademy.finalproject.dao.UserRepositoryDAO;
import com.tnvacademy.finalproject.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    UserRepositoryDAO userDAO;

    @Autowired
    public UserService(@Qualifier("dbUserDAO") UserRepositoryDAO userDAO) {
        this.userDAO = userDAO;
    }

    public String addUser(User user) throws UsernameAlreadyExistsException {
        User testUser = (User) userDAO.findByUsernameContains(user.getUsername());
        if (testUser != null) {
            throw new UsernameAlreadyExistsException("Username already exists in the database.");
        }
        User resultUser = userDAO.save(user);
        if (resultUser != null ) {
            return "Utente salvato correttamente";
        } else {
            return "Errore nel salvataggio dell'utente";
        }
    }

    public User getUser(int id) {
        return userDAO.findById(id).orElse(null);
    }

    public Iterable<User> allUsers() {
        return userDAO.findAll();
    }

    public String updateUser(int id, User user) {
        user.setId(id);
        User resultUser = userDAO.save(user);
        if (resultUser != null) {
            return "Utente aggiornato correttamente";
        } else {
            return "Errore nell'aggiornamento dell'utente";
        }
    }

    public String deleteUser(int id) {
        User user = userDAO.findById(id).orElse(null);
        if (user == null) {
            return "Utente non trovato!";
        } else {
            userDAO.delete(user);
            return "Utente cancellato correttamente";
        }
    }
    public User login(User user) throws InvalidUsernameException, InvalidPasswordException {
        // Check if the user exists in the database
        User dbUser = (User) userDAO.findByUsernameContains(user.getUsername());
        if (dbUser == null) {
            throw new InvalidUsernameException("Username not found");
        }

        // Verify the password
        if (!user.getPassword().equals(dbUser.getPassword())) {
            throw new InvalidPasswordException("Incorrect password");
        }

        // Return the user object if the authentication succeeds
        return dbUser;
    }

}

