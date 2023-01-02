package com.mluan.webtimviec.service;

import com.mluan.webtimviec.model.Comment;
import com.mluan.webtimviec.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    public List<Comment> findAll() {
        return commentRepository.findAll();
    }

    public Optional<Comment> getComment(Integer commentId)
    {
        return commentRepository.findById(commentId);
    }

    public void saveComment(Comment comment) {
        commentRepository.save(comment);
    }

    public void deleteComment(Integer commentId) {
        Optional<Comment> optionalComment = getComment(commentId);
        if(optionalComment.isPresent()) {
            Comment comment = optionalComment.get();
            commentRepository.delete(comment);
        }
        else
        {

        }
    }
}
