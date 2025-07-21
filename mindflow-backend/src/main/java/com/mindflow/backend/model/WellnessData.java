package com.mindflow.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "wellness_data")
public class WellnessData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int mood;
    private int energy;
    private int stress;
    private int sleepHours;
    private LocalDate date;

    // Constructors
    public WellnessData() {}
    public WellnessData(int mood, int energy, int stress, int sleepHours, LocalDate date) {
        this.mood = mood;
        this.energy = energy;
        this.stress = stress;
        this.sleepHours = sleepHours;
        this.date = date;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public int getMood() {
        return mood;
    }
    public void setMood(int mood) {
        this.mood = mood;
    }

    public int getEnergy() {
        return energy;
    }
    public void setEnergy(int energy) {
        this.energy = energy;
    }

    public int getStress() {
        return stress;
    }
    public void setStress(int stress) {
        this.stress = stress;
    }

    public int getSleepHours() {
        return sleepHours;
    }
    public void setSleepHours(int sleepHours) {
        this.sleepHours = sleepHours;
    }

    public LocalDate getDate() {
        return date;
    }
    public void setDate(LocalDate date) {
        this.date = date;
    }
}
