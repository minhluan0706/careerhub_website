package com.mluan.webtimviec.controller;

import com.mluan.webtimviec.model.Job;
import com.mluan.webtimviec.model.JobRequireProfessionJob;
import com.mluan.webtimviec.model.ProfessionJob;
import com.mluan.webtimviec.service.JobService;
import com.mluan.webtimviec.service.ProfessionJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/api/job")
public class HomeController {

    @Autowired
    JobService jobService;

    @Autowired
    ProfessionJobService professionJobService;

    @Autowired
    public JavaMailSender emailSender;

    //show List
    @RequestMapping(value = "/list",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<Job> getJobList() {
        List<Job> list = jobService.findAll();
        return list;
    }

    //show List Job filter by ProfessionJob
    @RequestMapping(value = "/list/{pjobId}",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<Job> getJobList1(@PathVariable("pjobId") Integer pjobId) {
        ProfessionJob professionJob = professionJobService.getProfessionJob(pjobId).get();
        List<JobRequireProfessionJob> list = jobService.findAllByProfessionJob(professionJob);
        List<Job> jobsAfterFilterByProfession = new ArrayList<>();
        for(JobRequireProfessionJob jrpj : list) {
            jobsAfterFilterByProfession.add(jrpj.getJob());
        }
        return jobsAfterFilterByProfession;
    }

    //show List Job filter by ProfessionJob and city
    @RequestMapping(value = "/list/{pjobId}/{cityId}",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<Job> getJobList2(@PathVariable("pjobId") Integer pjobId, @PathVariable("cityId") Integer city) {
        List<Job> jobsAfterFilterByProfession = getJobList1(pjobId);
        List<Job> jobsAfterFilterByCity = new ArrayList<>();
        for(Job job : jobsAfterFilterByProfession) {
            if (job.getCity().getId() == city) {
                jobsAfterFilterByCity.add(job);
            }
        }
        return jobsAfterFilterByCity;
    }

    /////////////////////////////////////////////////////////////////////////////
    //Find particular
    @RequestMapping(value = "/{jobId}", //
            method = RequestMethod.GET, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Optional<Job> getJob(@PathVariable("jobId") String jobId) {
        return jobService.getJob(Integer.valueOf(jobId));
    }

    //Add
    @RequestMapping(value = "", //
            method = RequestMethod.POST, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Job addJob(@RequestBody Job job) {
        job.setId(null);
        jobService.saveJob(job);
        return job;
    }

    //Edit
    @RequestMapping(value = "", //
            method = RequestMethod.PUT, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Job updateJob(@RequestBody Job job) {
        jobService.saveJob(job);
        return job;
    }

    //Delete
    @RequestMapping(value = "/{jobId}", //
            method = RequestMethod.DELETE, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public void deleteJob(@PathVariable("jobId") String jobId) {
        jobService.deleteJob(Integer.valueOf(jobId));
    }


    @ResponseBody
    @RequestMapping("/sendSimpleEmail")
    public String sendSimpleEmail() throws MessagingException {

        MimeMessage message = emailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo("supernija21@gmail.com");
        helper.setSubject("Test email with attachments");

        helper.setText("Hello, Im testing email with attachments!");

//        helper.addAttachment("Txt file", file1);
        emailSender.send(message);

        return "Email Sent!";
    }

    @RequestMapping(value= "/sendfile", method = RequestMethod.POST)
    public String handleFileUpload(@RequestParam("file") MultipartFile file,
                                   @RequestParam("destination") String destination,
                                   @RequestParam("content") String content) throws MessagingException{

        System.out.printf("File name=%s, size=%s\n", file.getOriginalFilename(),file.getSize());

        MimeMessage message = emailSender.createMimeMessage();

        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setTo(destination);
        helper.setSubject("You have a new applicant !!!");

        helper.setText(content);

        helper.addAttachment(file.getOriginalFilename(), file);
        emailSender.send(message);

        //everything was OK, return HTTP OK status (200) to the client
        return file.getOriginalFilename();
    }
}
