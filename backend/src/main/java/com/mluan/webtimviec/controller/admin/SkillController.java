package com.mluan.webtimviec.controller.admin;

import com.mluan.webtimviec.model.Skill;
import com.mluan.webtimviec.service.SkillService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/admin/api/skill")
public class SkillController {

    @Autowired
    SkillService skillService;

    //show List
    @RequestMapping(value = "/list",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<Skill> getSkillList() {
        List<Skill> list = skillService.findAll();
        return list;
    }

    //Find particular
    @RequestMapping(value = "/{skillId}", //
            method = RequestMethod.GET, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Optional<Skill> getSkill(@PathVariable("skillId") String skillId) {
        return skillService.getSkill(Integer.valueOf(skillId));
    }

    //Add
    @RequestMapping(value = "", //
            method = RequestMethod.POST, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Skill addSkill(@RequestBody Skill skill) {
        skill.setId(null);
        skillService.saveSkill(skill);
        return skill;
    }

    //Edit
    @RequestMapping(value = "", //
            method = RequestMethod.PUT, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Skill updateSkill(@RequestBody Skill skill) {
        skillService.saveSkill(skill);
        return skill;
    }

    //Delete
    @RequestMapping(value = "/{skillId}", //
            method = RequestMethod.DELETE, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public void deleteSkill(@PathVariable("skillId") String skillId) {
        skillService.deleteSkill(Integer.valueOf(skillId));
    }

}
