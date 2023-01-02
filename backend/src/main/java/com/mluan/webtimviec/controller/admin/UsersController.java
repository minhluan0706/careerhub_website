package com.mluan.webtimviec.controller.admin;

import com.mluan.webtimviec.model.Users;
import com.mluan.webtimviec.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
    @RequestMapping(value="/admin/api/users")
public class UsersController {

    @Autowired
    UsersService usersService;

    //show List
    @RequestMapping(value = "/list",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<Users> getUsersList() {
        List<Users> list = usersService.findAll();
        return list;
    }

    //Find particular
    @RequestMapping(value = "/{usersId}", //
            method = RequestMethod.GET, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Optional<Users> getUsers(@PathVariable("usersId") String usersId) {
        return usersService.getUsers(Integer.valueOf(usersId));
    }

    //Add
    @RequestMapping(value = "", //
            method = RequestMethod.POST, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Users addUsers(@RequestBody Users users) {
        users.setId(null);
        usersService.saveUsers(users);
        return users;
    }

    //Edit
    @RequestMapping(value = "", //
            method = RequestMethod.PUT, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Users updateUsers(@RequestBody Users users) {
        usersService.saveUsers(users);
        return users;
    }

    //Delete
    @RequestMapping(value = "/{usersId}", //
            method = RequestMethod.DELETE, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public void deleteUsers(@PathVariable("usersId") String usersId) {
        usersService.deleteUsers(Integer.valueOf(usersId));
    }

}
