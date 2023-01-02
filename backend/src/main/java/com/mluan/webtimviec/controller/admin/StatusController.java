package com.mluan.webtimviec.controller.admin;

import com.mluan.webtimviec.model.Status;
import com.mluan.webtimviec.service.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/admin/api/status")
public class StatusController {

    @Autowired
    StatusService statusService;

    //show List
    @RequestMapping(value = "/list",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<Status> getStatusList() {
        List<Status> list = statusService.findAll();
        return list;
    }

    //Find particular
    @RequestMapping(value = "/{statusId}", //
            method = RequestMethod.GET, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Optional<Status> getStatus(@PathVariable("statusId") String statusId) {
        return statusService.getStatus(Integer.valueOf(statusId));
    }

    //Add
    @RequestMapping(value = "", //
            method = RequestMethod.POST, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Status addStatus(@RequestBody Status status) {
        status.setId(null);
        statusService.saveStatus(status);
        return status;
    }

    //Edit
    @RequestMapping(value = "", //
            method = RequestMethod.PUT, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Status updateStatus(@RequestBody Status status) {
        statusService.saveStatus(status);
        return status;
    }

    //Delete
    @RequestMapping(value = "/{statusId}", //
            method = RequestMethod.DELETE, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public void deleteStatus(@PathVariable("statusId") String statusId) {
        statusService.deleteStatus(Integer.valueOf(statusId));
    }

}
