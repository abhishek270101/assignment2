package com.example.demo.controller;

import com.example.demo.model.DemoModel;
import com.example.demo.repository.DemoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class DemoController {

    @Autowired
    DemoRepository demoRepository;

    @CrossOrigin(origins = "http://localhost:3000/")
    @PostMapping("/user-add")
    public ResponseEntity<?> adduser(@RequestBody DemoModel demoModel) {
        if (demoModel != null) {
            demoRepository.save(demoModel);
            return ResponseEntity.status(HttpStatus.OK).body("User added successfully");
        } else {
            return ResponseEntity.status(HttpStatus.OK).body("Any field is empty fill that first");
        }
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @GetMapping("/user-get")
    public ResponseEntity<?> findAllUser() {
        return ResponseEntity.status(HttpStatus.OK).body(demoRepository.findAll());
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @DeleteMapping("/user-delete")
    public ResponseEntity<?> deleteUser(@RequestBody DemoModel demoModel) {
        if (demoModel != null) {
            demoRepository.delete(demoModel);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @CrossOrigin(origins = "http://localhost:3000/")
    @PutMapping("/user-update")
    public ResponseEntity<?> updateUser(@RequestBody DemoModel demoModel) {
        System.out.println(demoModel);
        DemoModel demoModel2 = new DemoModel();
        if (demoModel != null) {
            demoModel2.setEmail(demoModel.getEmail());
            demoModel2.setId(demoModel.getId());
            demoModel2.setName(demoModel.getName());
            demoModel2.setPhoneNumber(demoModel.getPhoneNumber());
            demoModel2.setRole(demoModel.getRole());
            demoModel2.setPosition(demoModel.getPosition());
            demoModel2.setPassword(demoModel.getPassword());
            demoRepository.delete(demoModel);
            demoRepository.save(demoModel2);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

}
