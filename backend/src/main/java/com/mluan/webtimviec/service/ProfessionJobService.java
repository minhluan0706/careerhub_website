package com.mluan.webtimviec.service;

import com.mluan.webtimviec.model.ProfessionJob;
import com.mluan.webtimviec.repository.ProfessionJobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProfessionJobService {

    @Autowired
    ProfessionJobRepository professionProfessionJobRepository;

    public List<ProfessionJob> findAll() {
        return professionProfessionJobRepository.findAll();
    }

    public Optional<ProfessionJob> getProfessionJob(Integer professionProfessionJobId)
    {
        return professionProfessionJobRepository.findById(professionProfessionJobId);
    }

    public void saveProfessionJob(ProfessionJob professionProfessionJob) {
        professionProfessionJobRepository.save(professionProfessionJob);
    }

    public void deleteProfessionJob(Integer professionProfessionJobId) {
        Optional<ProfessionJob> optionalProfessionJob = getProfessionJob(professionProfessionJobId);
        if(optionalProfessionJob.isPresent()) {
            ProfessionJob professionProfessionJob = optionalProfessionJob.get();
            professionProfessionJobRepository.delete(professionProfessionJob);
        }
        else
        {

        }
    }
}
