package com.mluan.webtimviec.repository;

import com.mluan.webtimviec.model.Identity.JobRequireSkillId;
import com.mluan.webtimviec.model.JobRequireSkill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobRequireSkillRepository extends JpaRepository<JobRequireSkill,JobRequireSkillId> {
}
