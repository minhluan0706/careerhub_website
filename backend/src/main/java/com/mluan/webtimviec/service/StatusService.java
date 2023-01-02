package com.mluan.webtimviec.service;

import com.mluan.webtimviec.model.Status;
import com.mluan.webtimviec.repository.StatusRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StatusService {

    @Autowired
    StatusRepository statusRepository;

    public List<Status> findAll() {
        return statusRepository.findAll();
    }

    public Optional<Status> getStatus(Integer statusId)
    {
        return statusRepository.findById(statusId);
    }

    public void saveStatus(Status status) {
        statusRepository.save(status);
    }

    public void deleteStatus(Integer statusId) {
        Optional<Status> optionalStatus = getStatus(statusId);
        if(optionalStatus.isPresent()) {
            Status status = optionalStatus.get();
            statusRepository.delete(status);
        }
        else
        {

        }
    }
}
