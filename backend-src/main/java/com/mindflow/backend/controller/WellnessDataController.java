package com.mindflow.backend.controller;

import com.mindflow.backend.model.WellnessData;
import com.mindflow.backend.repository.WellnessDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wellness")
public class WellnessDataController {

    @Autowired
    private WellnessDataRepository wellnessDataRepository;

    @GetMapping
    public List<WellnessData> getAllWellnessData() {
        return wellnessDataRepository.findAll();
    }

    @PostMapping
    public WellnessData createWellnessData(@RequestBody WellnessData data) {
        return wellnessDataRepository.save(data);
    }

    @PutMapping("/{id}")
    public WellnessData updateWellnessData(@PathVariable Long id, @RequestBody WellnessData data) {
        data.setId(id);
        return wellnessDataRepository.save(data);
    }

    @DeleteMapping("/{id}")
    public String deleteWellnessData(@PathVariable Long id) {
        wellnessDataRepository.deleteById(id);
        return "Deleted successfully";
    }
}
