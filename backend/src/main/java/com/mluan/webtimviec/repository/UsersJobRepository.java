package com.mluan.webtimviec.repository;

import com.mluan.webtimviec.model.Identity.UsersJobId;
import com.mluan.webtimviec.model.Job;
import com.mluan.webtimviec.model.Users;
import com.mluan.webtimviec.model.UsersJob;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UsersJobRepository extends JpaRepository<UsersJob,UsersJobId> {

    List<UsersJob> findAllByJob(Job job);

    List<UsersJob> findAllByUsers(Users users);
}
