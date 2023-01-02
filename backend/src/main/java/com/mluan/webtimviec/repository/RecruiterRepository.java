package com.mluan.webtimviec.repository;

import com.mluan.webtimviec.model.Recruiter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecruiterRepository extends JpaRepository<Recruiter,Integer> {

    Optional<Recruiter> findRecruiterByEmailAndPassword(String email, String password);
}
