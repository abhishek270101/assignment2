package com.example.demo.model;

import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "demomodel")
public class DemoModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(name = "name")
    private String name;
    @Column(name = "email")
    private String email;
    @Column(name = "roles")
    private String[] role;
    @Column(name = "phoneNumber")
    private String phoneNumber;
    @Column(name = "position")
    private String position;
    @Column(name = "password")
    private String password;
}
