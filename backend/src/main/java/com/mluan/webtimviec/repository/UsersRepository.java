package com.mluan.webtimviec.repository;

import com.mluan.webtimviec.model.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Integer> {

    Optional<Users> findUsersByEmailAndPassword(String email, String Password);

    Optional<Users> findUsersByEmail(String email);
}
