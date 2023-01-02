package com.mluan.webtimviec.service;

import com.mluan.webtimviec.model.Recruiter;
import com.mluan.webtimviec.repository.RecruiterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecruiterService {

    @Autowired
    RecruiterRepository recruiterRepository;

    public Optional<Recruiter> loginRecruiter(String email, String password) {
        return recruiterRepository.findRecruiterByEmailAndPassword(email,password);
    }



    public List<Recruiter> findAll() {
        return recruiterRepository.findAll();
    }

    public Optional<Recruiter> getRecruiter(Integer recruiterId)
    {
        return recruiterRepository.findById(recruiterId);
    }

    public void saveRecruiter(Recruiter recruiter) {
        recruiterRepository.save(recruiter);
    }

    public void deleteRecruiter(Integer recruiterId) {
        Optional<Recruiter> optionalRecruiter = getRecruiter(recruiterId);
        if(optionalRecruiter.isPresent()) {
            Recruiter recruiter = optionalRecruiter.get();
            recruiterRepository.delete(recruiter);
        }
        else
        {

        }
    }
}
