package com.mluan.webtimviec.service;

import com.mluan.webtimviec.model.Identity.JobRequireProfessionJobId;
import com.mluan.webtimviec.model.JobRequireProfessionJob;
import com.mluan.webtimviec.repository.JobRequireProfessionJobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class JobRequireProfessionJobService {

    @Autowired
    JobRequireProfessionJobRepository jobRequireProfessionJobRepository;

    public List<JobRequireProfessionJob> findAll() {
        return jobRequireProfessionJobRepository.findAll();
    }

    public Optional<JobRequireProfessionJob> getJobRequireProfessionJob(JobRequireProfessionJobId jobRequireProfessionJobId)
    {
        return jobRequireProfessionJobRepository.findById(jobRequireProfessionJobId);
    }

    public void saveJobRequireProfessionJob(JobRequireProfessionJob jobRequireProfessionJob) {
        jobRequireProfessionJobRepository.save(jobRequireProfessionJob);
    }

    public void deleteJobRequireProfessionJob(JobRequireProfessionJobId jobRequireProfessionJobId) {
        Optional<JobRequireProfessionJob> optionalJobRequireProfessionJob = getJobRequireProfessionJob(jobRequireProfessionJobId);
        if(optionalJobRequireProfessionJob.isPresent()) {
            JobRequireProfessionJob jobRequireProfessionJob = optionalJobRequireProfessionJob.get();
            jobRequireProfessionJobRepository.delete(jobRequireProfessionJob);
        }
        else
        {

        }
    }
}
