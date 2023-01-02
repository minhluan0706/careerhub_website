package com.mluan.webtimviec.controller.admin;

import com.mluan.webtimviec.model.Identity.JobRequireProfessionJobId;
import com.mluan.webtimviec.model.JobRequireProfessionJob;
import com.mluan.webtimviec.service.JobRequireProfessionJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/admin/api/jobrequireprofession")
public class JobRequireProfessionJobController {

    @Autowired
    JobRequireProfessionJobService jobRequireProfessionJobService;

    //show List
    @RequestMapping(value = "/list",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<JobRequireProfessionJob> getJobRequireProfessionJobList() {
        List<JobRequireProfessionJob> list = jobRequireProfessionJobService.findAll();
        return list;
    }

    //Find particular
    @RequestMapping(value = "/{jobsId}/{professionJobId}", //
            method = RequestMethod.GET, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Optional<JobRequireProfessionJob> getJobRequireProfessionJob(@PathVariable("jobsId") String jobsId,
                                                                        @PathVariable("professionJobId") String professionJobId) {
        return jobRequireProfessionJobService.getJobRequireProfessionJob(new JobRequireProfessionJobId(Integer.valueOf(jobsId),Integer.valueOf(professionJobId)));
    }

    //Add
    @RequestMapping(value = "", //
            method = RequestMethod.POST, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public JobRequireProfessionJob addJobRequireProfessionJob(@RequestBody JobRequireProfessionJob jobRequireProfessionJob) {
        JobRequireProfessionJobId jobRequireProfessionJobId = new JobRequireProfessionJobId(jobRequireProfessionJob.getJob().getId(),jobRequireProfessionJob.getProfessionJob().getId());
        jobRequireProfessionJob.setJobRequireProfessionJobId(jobRequireProfessionJobId);
        jobRequireProfessionJobService.saveJobRequireProfessionJob(jobRequireProfessionJob);
        return jobRequireProfessionJob;
    }

    //Delete
    @RequestMapping(value = "/{jobsId}/{professionJobId}", //
            method = RequestMethod.DELETE, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public void deleteJobRequireProfessionJob(@PathVariable("jobsId") String jobsId,
                                              @PathVariable("professionJobId") String professionJobId) {
        jobRequireProfessionJobService.deleteJobRequireProfessionJob(new JobRequireProfessionJobId(Integer.valueOf(jobsId),Integer.valueOf(professionJobId)));
    }
}