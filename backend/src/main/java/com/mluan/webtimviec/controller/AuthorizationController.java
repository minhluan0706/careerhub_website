package com.mluan.webtimviec.controller;

import com.mluan.webtimviec.model.Recruiter;
import com.mluan.webtimviec.model.Users;
import com.mluan.webtimviec.service.RecruiterService;
import com.mluan.webtimviec.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/api")
public class AuthorizationController {

    @Autowired
    UsersService usersService;

    @Autowired
    RecruiterService recruiterService;

    //show List
    @RequestMapping(value = "/users/list",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<Users> getUsersList() {
        List<Users> list = usersService.findAll();
        return list;
    }

    //Find particular
    @RequestMapping(value = "/users/{usersId}", //
            method = RequestMethod.GET, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Optional<Users> getUsers(@PathVariable("usersId") String usersId) {
        return usersService.getUsers(Integer.valueOf(usersId));
    }

    //login user
    @RequestMapping(value = "/users/login", //
            method = RequestMethod.POST, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Users VerifyUsers(@RequestBody Users users) {
        Optional<Users> usersLogin = usersService.loginUser(users.getEmail(),users.getPassword());
        if (usersLogin.isPresent()) {
            return usersLogin.get();
        }
        return null;
    }

    //login register
    @RequestMapping(value = "/recruiter/login", //
            method = RequestMethod.POST, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Recruiter VerifyRecruiter(@RequestBody Recruiter recruiter) {
        Optional<Recruiter> recruiterLogin = recruiterService.loginRecruiter(recruiter.getEmail(),recruiter.getPassword());
        if (recruiterLogin.isPresent()) {
            return recruiterLogin.get();
        }
        return null;
    }
}