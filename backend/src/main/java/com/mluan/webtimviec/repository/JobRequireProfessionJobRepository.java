package com.mluan.webtimviec.repository;

import com.mluan.webtimviec.model.Identity.JobRequireProfessionJobId;
import com.mluan.webtimviec.model.JobRequireProfessionJob;
import com.mluan.webtimviec.model.ProfessionJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface JobRequireProfessionJobRepository extends JpaRepository<JobRequireProfessionJob,JobRequireProfessionJobId> {

    List<JobRequireProfessionJob> findAllByProfessionJob(ProfessionJob professionJob);
}
