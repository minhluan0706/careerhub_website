package com.mluan.webtimviec.controller.admin;

import com.mluan.webtimviec.model.Comment;
import com.mluan.webtimviec.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/admin/api/comment")
public class CommentController {

    @Autowired
    CommentService commentService;

    //show List
    @RequestMapping(value = "/list",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<Comment> getCommentList() {
        List<Comment> list = commentService.findAll();
        return list;
    }

    //Find particular
    @RequestMapping(value = "/{commentId}", //
            method = RequestMethod.GET, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Optional<Comment> getComment(@PathVariable("commentId") String commentId) {
        return commentService.getComment(Integer.valueOf(commentId));
    }

    //Add
    @RequestMapping(value = "", //
            method = RequestMethod.POST, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Comment addComment(@RequestBody Comment comment) {
        comment.setId(null);
        commentService.saveComment(comment);
        return comment;
    }

    //Edit
    @RequestMapping(value = "", //
            method = RequestMethod.PUT, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Comment updateComment(@RequestBody Comment comment) {
        commentService.saveComment(comment);
        return comment;
    }

    //Delete
    @RequestMapping(value = "/{commentId}", //
            method = RequestMethod.DELETE, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public void deleteComment(@PathVariable("commentId") String commentId) {
        commentService.deleteComment(Integer.valueOf(commentId));
    }

}