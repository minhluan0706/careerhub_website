package com.mluan.webtimviec.controller.admin;

import com.mluan.webtimviec.model.ProfessionJob;
import com.mluan.webtimviec.service.ProfessionJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/admin/api/profession")
public class ProfessionJobController {

    @Autowired
    ProfessionJobService professionJobService;

    //show List
    @RequestMapping(value = "/list",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<ProfessionJob> getProfessionJobList() {
        List<ProfessionJob> list = professionJobService.findAll();
        return list;
    }

    //Find particular
    @RequestMapping(value = "/{professionJobId}", //
            method = RequestMethod.GET, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Optional<ProfessionJob> getProfessionJob(@PathVariable("professionJobId") String professionJobId) {
        return professionJobService.getProfessionJob(Integer.valueOf(professionJobId));
    }

    //Add
    @RequestMapping(value = "", //
            method = RequestMethod.POST, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ProfessionJob addProfessionJob(@RequestBody ProfessionJob professionJob) {
        professionJob.setId(null);
        professionJobService.saveProfessionJob(professionJob);
        return professionJob;
    }

    //Edit
    @RequestMapping(value = "", //
            method = RequestMethod.PUT, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public ProfessionJob updateProfessionJob(@RequestBody ProfessionJob professionJob) {
        professionJobService.saveProfessionJob(professionJob);
        return professionJob;
    }

    //Delete
    @RequestMapping(value = "/{professionJobId}", //
            method = RequestMethod.DELETE, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public void deleteProfessionJob(@PathVariable("professionJobId") String professionJobId) {
        professionJobService.deleteProfessionJob(Integer.valueOf(professionJobId));
    }

}