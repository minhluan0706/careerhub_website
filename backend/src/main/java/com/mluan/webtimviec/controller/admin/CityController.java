package com.mluan.webtimviec.controller.admin;

import com.mluan.webtimviec.model.City;
import com.mluan.webtimviec.service.CityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(value="/admin/api/city")
public class CityController {

    @Autowired
    CityService cityService;

    //show List
    @RequestMapping(value = "/list",
            method = RequestMethod.GET,
            produces = { MediaType.APPLICATION_JSON_VALUE })
    @ResponseBody
    public List<City> getCityList() {
        List<City> list = cityService.findAll();
        return list;
    }

    //Find particular
    @RequestMapping(value = "/{cityId}", //
            method = RequestMethod.GET, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public Optional<City> getCity(@PathVariable("cityId") String cityId) {
        return cityService.getCity(Integer.valueOf(cityId));
    }

    //Add
    @RequestMapping(value = "", //
            method = RequestMethod.POST, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public City addCity(@RequestBody City city) {
        city.setId(null);
        cityService.saveCity(city);
        return city;
    }

    //Edit
    @RequestMapping(value = "", //
            method = RequestMethod.PUT, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public City updateCity(@RequestBody City city) {
        cityService.saveCity(city);
        return city;
    }

    //Delete
    @RequestMapping(value = "/{cityId}", //
            method = RequestMethod.DELETE, //
            produces = { MediaType.APPLICATION_JSON_VALUE})
    @ResponseBody
    public void deleteCity(@PathVariable("cityId") String cityId) {
        cityService.deleteCity(Integer.valueOf(cityId));
    }

}