package com.mluan.webtimviec.service;

import com.mluan.webtimviec.model.City;
import com.mluan.webtimviec.repository.CityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CityService {

    @Autowired
    CityRepository cityRepository;

    public List<City> findAll() {
        return cityRepository.findAll();
    }

    public Optional<City> getCity(Integer cityId)
    {
        return cityRepository.findById(cityId);
    }

    public void saveCity(City city) {
        cityRepository.save(city);
    }

    public void deleteCity(Integer cityId) {
        Optional<City> optionalCity = getCity(cityId);
        if(optionalCity.isPresent()) {
            City city = optionalCity.get();
            cityRepository.delete(city);
        }
        else
        {

        }
    }
}
