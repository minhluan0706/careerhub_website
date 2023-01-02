package com.mluan.webtimviec.controller.admin;

import com.mluan.webtimviec.model.Identity.UsersJobId;
import com.mluan.webtimviec.model.UsersJob;
import com.mluan.webtimviec.service.UsersJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/admin/api/userjob")
public class UsersJobController {

    @Autowired
    UsersJobService usersJobService;

    //show List
    @RequestMapping(value = "/list",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<UsersJob> getUsersJobList() {
        List<UsersJob> list = usersJobService.findAll();
        return list;
    }

    //Find particular
    @RequestMapping(value = "/{jobsId}/{usersId}", //
            method = RequestMethod.GET, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Optional<UsersJob> getUsersJob(@PathVariable("jobsId") String jobsId,
                                                                        @PathVariable("usersId") String usersId) {
        return usersJobService.getUsersJob(new UsersJobId(Integer.valueOf(jobsId),Integer.valueOf(usersId)));
    }

    //Find all by job
    @RequestMapping(value = "/job/{jobId}",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<UsersJob> getAllByJob(@PathVariable("jobId") String jobId) {
        List<UsersJob> list = usersJobService.findAllByJob(Integer.valueOf(jobId));
        return list;
    }

    //Find User have apply that job
    @RequestMapping(value = "/user/{usersId}",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<UsersJob> getAllByUsers(@PathVariable("usersId") String usersId) {
        List<UsersJob> list = usersJobService.findAllByUser(Integer.valueOf(usersId));
        return list;
    }

    //Add
    @RequestMapping(value = "/", //
            method = RequestMethod.POST, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public UsersJob addUsersJob(@RequestBody UsersJob usersJob) {
        UsersJobId usersJobId = new UsersJobId(usersJob.getJob().getId(),usersJob.getUsers().getId());
        usersJob.setUserJobId(usersJobId);
        usersJobService.saveUsersJob(usersJob);
        return usersJob;
    }

    //Delete
    @RequestMapping(value = "/{jobsId}/{usersId}", //
            method = RequestMethod.DELETE, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public void deleteUsersJob(@PathVariable("jobsId") String jobsId,
                                              @PathVariable("usersId") String usersId) {
        usersJobService.deleteUsersJob(new UsersJobId(Integer.valueOf(jobsId),Integer.valueOf(usersId)));
    }
}
