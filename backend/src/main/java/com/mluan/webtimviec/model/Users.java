package com.mluan.webtimviec.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Date;
import java.util.Calendar;
import java.util.List;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class Users implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    @Column(name = "name")
    private String name;

    @Column(name = "birthday")
    private Date birthday  = new Date(Calendar.getInstance().getTime().getTime());;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "address")
    private String address;

    @Column(name = "cmnd")
    private String cmnd;

    @Column(name = "sdt")
    private String sdt;

    @Column(name = "gender")
    private String gender;

    @Column(name = "avatar")
    private String avatar;

    @Column(name = "is_admin")
    private String isAdmin;

    @Column(name = "isverifyemail")
    private Boolean isVerifyEmail = false;

    @JsonIgnore
    @OneToMany(mappedBy = "users")
    private List<UsersJob> usersJobList;

    @OneToMany(mappedBy = "users")
    private List<UsersSkill> usersSkillList;
}
