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

    public String addUser(User user) {
        User resultUser = userDAO.save(user);
        if (resultUser != null) {
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
    public User login(User user) {
        // Controlla se l'utente esiste nel database
        User dbUser = (User) userDAO.findByUsernameContains(user.getUsername());
//        if (dbUser == null) {
//            return "Nome utente o password errati";
//        }
//
//        // Verifica la password
//        if (!user.getPassword().equals(dbUser.getPassword())) { //oppure user.getPassword() != dbUser.getPassword
//            return "Nome utente o password errati";
//        }

        // Restituisce un messaggio di successo
        return dbUser;
    }

}

