package com.mluan.webtimviec.repository;

import com.mluan.webtimviec.model.Identity.UsersSkillId;
import com.mluan.webtimviec.model.UsersSkill;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersSkillRepository extends JpaRepository<UsersSkill, UsersSkillId> {
}
