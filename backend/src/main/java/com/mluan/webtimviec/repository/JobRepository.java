package com.mluan.webtimviec.repository;

import com.mluan.webtimviec.model.Job;
import com.mluan.webtimviec.model.Recruiter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRepository extends JpaRepository<Job, Integer> {

    List<Job> findAllByRecruiter(Recruiter recruiter);
}
