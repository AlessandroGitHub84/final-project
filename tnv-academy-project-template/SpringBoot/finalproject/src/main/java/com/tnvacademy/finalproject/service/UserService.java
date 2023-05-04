package com.tnvacademy.finalproject.service;

import com.tnvacademy.finalproject.dao.UserRepositoryDAO;
import com.tnvacademy.finalproject.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class UserService {

    UserRepositoryDAO userDAO;

    @Autowired
    public UserService(@Qualifier("dbUserDAO") UserRepositoryDAO userDAO) {
        this.userDAO = userDAO;
    }

    // Aggiunge un nuovo utente nel database
    public User addUser(User user) {
        // Verifica se l'utente è già presente nel database
        User testUser = userDAO.findByUsernameContains(user.getUsername());
        if (testUser != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username già presente nel database.");
        }

        // Salva l'utente nel database
        User resultUser = userDAO.save(user);
        if (resultUser != null) {
            return resultUser;
        } else {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Errore nel salvataggio dello user.");
        }
    }

    // Ottiene un utente dal database tramite l'ID
    public User getUser(int id) {
        return userDAO.findById(id).orElse(null);
    }

    // Ottiene tutti gli utenti dal database
    public Iterable<User> allUsers() {
        return userDAO.findAll();
    }

    // Aggiorna un utente nel database
    public String updateUser(int id, User user)  {
        user.setId(id);
        User resultUser = userDAO.save(user);
        if (resultUser != null) {
            return "Utente aggiornato correttamente";
        } else {
            return "Errore nell'aggiornamento dell'utente";
        }
    }

    // Cancella un utente dal database tramite l'ID
    public String deleteUser(int id) {
        User user = userDAO.findById(id).orElse(null);
        if (user == null) {
            return "User not found!";
        } else {
            userDAO.delete(user);
            return "User deleted correctly";
        }
    }

    // Effettua l'autenticazione dell'utente
    public User login(User user) {
        // Verifica se l'utente esiste nel database
        User dbUser = userDAO.findByUsernameContains(user.getUsername());
        if (dbUser == null) {
            throw new AuthenticationException("Username not found");
        }

        // Verifica la password
        if (!user.getPassword().equals(dbUser.getPassword())) {
            throw new AuthenticationException("Incorrect password");
        }

        // Restituisce l'oggetto utente se l'autenticazione ha successo
        return dbUser;
    }
}


