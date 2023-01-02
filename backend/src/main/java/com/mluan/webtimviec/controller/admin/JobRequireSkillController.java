package com.mluan.webtimviec.controller.admin;

import com.mluan.webtimviec.model.Identity.JobRequireSkillId;
import com.mluan.webtimviec.model.JobRequireSkill;
import com.mluan.webtimviec.service.JobRequireSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/admin/api/jobrequireskill")
public class JobRequireSkillController {

    @Autowired
    JobRequireSkillService jobRequireSkillService;

    //show List
    @RequestMapping(value = "/list",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<JobRequireSkill> getJobRequireSkillList() {
        List<JobRequireSkill> list = jobRequireSkillService.findAll();
        return list;
    }

    //Find particular
    @RequestMapping(value = "/{jobsId}/{professionJobId}", //
            method = RequestMethod.GET, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Optional<JobRequireSkill> getJobRequireSkill(@PathVariable("jobsId") String jobsId,
                                                        @PathVariable("professionJobId") String professionJobId) {
        return jobRequireSkillService.getJobRequireSkill(new JobRequireSkillId(Integer.valueOf(jobsId),Integer.valueOf(professionJobId)));
    }

    //Add
    @RequestMapping(value = "", //
            method = RequestMethod.POST, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public JobRequireSkill addJobRequireSkill(@RequestBody JobRequireSkill jobRequireSkill) {
        JobRequireSkillId jobRequireSkillId = new JobRequireSkillId(jobRequireSkill.getJob().getId(),jobRequireSkill.getSkill().getId());
        jobRequireSkill.setJobRequireSkillIdentity(jobRequireSkillId);
        jobRequireSkillService.saveJobRequireSkill(jobRequireSkill);
        return jobRequireSkill;
    }

    //Delete
    @RequestMapping(value = "/{jobsId}/{professionJobId}", //
            method = RequestMethod.DELETE, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public void deleteJobRequireSkill(@PathVariable("jobsId") String jobsId,
                                              @PathVariable("professionJobId") String professionJobId) {
        jobRequireSkillService.deleteJobRequireSkill(new JobRequireSkillId(Integer.valueOf(jobsId),Integer.valueOf(professionJobId)));
    }
}
