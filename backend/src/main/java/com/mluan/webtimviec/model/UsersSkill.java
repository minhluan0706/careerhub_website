package com.mluan.webtimviec.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.mluan.webtimviec.model.Identity.UsersSkillId;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;

@AllArgsConstructor
@NoArgsConstructor
@Entity(name="users_skill")
public class UsersSkill implements Serializable {

    @EmbeddedId
    UsersSkillId userSkillId;

    @MapsId("usersId")
    @ManyToOne
    @JoinColumn(name = "users_id")
    private Users users;

    @MapsId("skillId")
    @ManyToOne
    @JoinColumn(name = "skill_id")
    private Skill skill;

    @Column(name="level")
    private Integer level;

    @Column(name="experience")
    private Integer experience;

    public UsersSkillId getUserSkillId() {
        return userSkillId;
    }

    public void setUserSkillId(UsersSkillId userSkillId) {
        this.userSkillId = userSkillId;
    }

    @JsonIgnore
    public Users getUsers() {
        return users;
    }

    @JsonProperty
    public void setUsers(Users users) {
        this.users = users;
    }

    public Skill getSkill() {
        return skill;
    }

    public void setSkill(Skill skill) {
        this.skill = skill;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getExperience() {
        return experience;
    }

    public void setExperience(Integer experience) {
        this.experience = experience;
    }
}
