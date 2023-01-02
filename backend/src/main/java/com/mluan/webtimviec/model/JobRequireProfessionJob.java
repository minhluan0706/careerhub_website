package com.mluan.webtimviec.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mluan.webtimviec.model.Identity.JobRequireProfessionJobId;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Entity(name="job_require_profession_job")
public class JobRequireProfessionJob implements Serializable {

    @EmbeddedId
    private JobRequireProfessionJobId jobRequireProfessionJobId;

    @MapsId("jobId")
    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @MapsId("professionJobId")
    @ManyToOne
    @JoinColumn(name = "profession_job_id")
    private ProfessionJob professionJob;

    public JobRequireProfessionJobId getJobRequireProfessionJobId() {
        return jobRequireProfessionJobId;
    }

    public void setJobRequireProfessionJobId(JobRequireProfessionJobId jobRequireProfessionJobId) {
        this.jobRequireProfessionJobId = jobRequireProfessionJobId;
    }

    @JsonIgnore
    public Job getJob() {
        return job;
    }

    @JsonProperty
    public void setJob(Job job) {
        this.job = job;
    }

    public ProfessionJob getProfessionJob() {
        return professionJob;
    }

    public void setProfessionJob(ProfessionJob professionJob) {
        this.professionJob = professionJob;
    }

    @Override
    public String toString() {
        return "JobRequireProfessionJob{" +
                "jobRequireProfessionJobId=" + jobRequireProfessionJobId +
                ", job=" + job +
                ", professionJob=" + professionJob +
                '}';
    }
}
