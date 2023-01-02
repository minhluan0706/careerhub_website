package com.mluan.webtimviec.service;

import com.mluan.webtimviec.model.Identity.UsersSkillId;
import com.mluan.webtimviec.model.UsersSkill;
import com.mluan.webtimviec.repository.UsersSkillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsersSkillService {

    @Autowired
    UsersSkillRepository usersSkillRepository;

    public List<UsersSkill> findAll() {
        return usersSkillRepository.findAll();
    }

    public Optional<UsersSkill> getUsersSkill(UsersSkillId usersSkillId)
    {
        return usersSkillRepository.findById(usersSkillId);
    }

    public void saveUsersSkill(UsersSkill usersSkill) {
        usersSkillRepository.save(usersSkill);
    }

    public void deleteUsersSkill(UsersSkillId usersSkillId) {
        Optional<UsersSkill> optionalUsersSkill = getUsersSkill(usersSkillId);
        if(optionalUsersSkill.isPresent()) {
            UsersSkill usersSkill = optionalUsersSkill.get();
            usersSkillRepository.delete(usersSkill);
        }
        else
        {

        }
    }
}
