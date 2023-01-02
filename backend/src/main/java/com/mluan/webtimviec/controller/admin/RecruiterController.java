package com.mluan.webtimviec.controller.admin;

import com.mluan.webtimviec.model.Recruiter;
import com.mluan.webtimviec.service.RecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/admin/api/recruiter")
public class RecruiterController {

    @Autowired
    RecruiterService recruiterService;

    //show List
    @RequestMapping(value = "/list",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<Recruiter> getRecruiterList() {
        List<Recruiter> list = recruiterService.findAll();
        return list;
    }

    //Find particular
    @RequestMapping(value = "/{recruiterId}", //
            method = RequestMethod.GET, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Optional<Recruiter> getRecruiter(@PathVariable("recruiterId") String recruiterId) {
        return recruiterService.getRecruiter(Integer.valueOf(recruiterId));
    }

    //Add
    @RequestMapping(value = "", //
            method = RequestMethod.POST, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Recruiter addRecruiter(@RequestBody Recruiter recruiter) {
        recruiter.setId(null);
        recruiterService.saveRecruiter(recruiter);
        return recruiter;
    }

    //Edit
    @RequestMapping(value = "", //
            method = RequestMethod.PUT, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Recruiter updateRecruiter(@RequestBody Recruiter recruiter) {
        recruiterService.saveRecruiter(recruiter);
        return recruiter;
    }

    //Delete
    @RequestMapping(value = "/{recruiterId}", //
            method = RequestMethod.DELETE, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public void deleteRecruiter(@PathVariable("recruiterId") String recruiterId) {
        recruiterService.deleteRecruiter(Integer.valueOf(recruiterId));
    }

}