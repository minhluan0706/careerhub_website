package com.mluan.webtimviec.model.Identity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class UsersJobId implements Serializable {

    private Integer usersId;
    private Integer jobId;
}
