package com.mluan.webtimviec.repository;

import com.mluan.webtimviec.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Integer> {
}
