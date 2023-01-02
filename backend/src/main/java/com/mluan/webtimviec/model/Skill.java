package com.mluan.webtimviec.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "skill")
public class Skill implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "skillname")
    private String skillName;

    @JsonIgnore
    @OneToMany(mappedBy = "skill")
    private List<JobRequireSkill> jobRequireSkillList;

    @JsonIgnore
    @OneToMany(mappedBy = "skill")
    private List<UsersSkill> usersSkillList;

}
