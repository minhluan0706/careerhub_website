package com.mluan.webtimviec.controller.admin;

import com.mluan.webtimviec.model.Identity.UsersSkillId;
import com.mluan.webtimviec.model.UsersSkill;
import com.mluan.webtimviec.service.UsersSkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@Controller
@RequestMapping(value="/admin/api/usersskill")
public class UsersSkillController {

    @Autowired
    UsersSkillService usersSkillService;

    //show List
    @RequestMapping(value = "/list",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<UsersSkill> getUsersSkillList() {
        List<UsersSkill> list = usersSkillService.findAll();
        return list;
    }

    //Find particular
    @RequestMapping(value = "/{jobsId}/{professionJobId}", //
            method = RequestMethod.GET, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Optional<UsersSkill> getUsersSkill(@PathVariable("jobsId") String jobsId,
                                                                        @PathVariable("professionJobId") String professionJobId) {
        return usersSkillService.getUsersSkill(new UsersSkillId(Integer.valueOf(jobsId),Integer.valueOf(professionJobId)));
    }

    //Add
    @RequestMapping(value = "", //
            method = RequestMethod.POST, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public UsersSkill addUsersSkill(@RequestBody UsersSkill usersSkill) {
        UsersSkillId usersSkillId = new UsersSkillId(usersSkill.getUsers().getId(),usersSkill.getSkill().getId());
        usersSkill.setUserSkillId(usersSkillId);
        usersSkillService.saveUsersSkill(usersSkill);
        return usersSkill;
    }

    //Delete
    @RequestMapping(value = "/{jobsId}/{professionJobId}", //
            method = RequestMethod.DELETE, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public void deleteUsersSkill(@PathVariable("jobsId") String jobsId,
                                              @PathVariable("professionJobId") String professionJobId) {
        usersSkillService.deleteUsersSkill(new UsersSkillId(Integer.valueOf(jobsId),Integer.valueOf(professionJobId)));
    }
}
