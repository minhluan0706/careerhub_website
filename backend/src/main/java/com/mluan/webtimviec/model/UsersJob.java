package com.mluan.webtimviec.model;

import com.mluan.webtimviec.model.Identity.UsersJobId;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity(name="users_job")
public class UsersJob implements Serializable {

    @EmbeddedId
    private UsersJobId userJobId;

    @MapsId("jobId")
    @ManyToOne
    @JoinColumn(name = "job_id")
    private Job job;

    @MapsId("usersId")
    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users users;
}
