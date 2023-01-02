package com.mluan.webtimviec.model.Identity;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Embeddable
public class JobRequireProfessionJobId implements Serializable {

    private Integer jobId;
    private Integer professionJobId;
}
