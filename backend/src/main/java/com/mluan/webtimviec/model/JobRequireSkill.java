package com.mluan.webtimviec.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mluan.webtimviec.model.Identity.JobRequireSkillId;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;


@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "job_require_skill")
public class JobRequireSkill {
    @EmbeddedId
    private JobRequireSkillId jobRequireSkillIdentity;

    @MapsId("jobId")
    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @MapsId("skillId")
    @ManyToOne
    @JoinColumn(name = "skill_id")
    private Skill skill;

    public JobRequireSkillId getJobRequireSkillIdentity() {
        return jobRequireSkillIdentity;
    }

    public void setJobRequireSkillIdentity(JobRequireSkillId jobRequireSkillIdentity) {
        this.jobRequireSkillIdentity = jobRequireSkillIdentity;
    }

    @JsonIgnore
    public Job getJob() {
        return job;
    }

    @JsonProperty
    public void setJob(Job job) {
        this.job = job;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }
}
