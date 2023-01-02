package com.mluan.webtimviec.model.Identity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import javax.persistence.EmbeddedId;
import java.io.Serializable;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable
public class JobRequireSkillId implements Serializable {

    private Integer jobId;
    private Integer skillId;

}
