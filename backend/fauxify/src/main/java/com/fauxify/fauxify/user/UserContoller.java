package com.fauxify.fauxify.user;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserContoller {
    @PostMapping("/api/v1/users")
    void createUser(){

    }
}
