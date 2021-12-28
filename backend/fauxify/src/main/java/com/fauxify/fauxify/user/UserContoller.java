package com.fauxify.fauxify.user;

import com.fauxify.fauxify.shared.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserContoller {

    @Autowired
    UserService userService;

    @PostMapping("/api/v1/users")
    GenericResponse createUser(@RequestBody User user){
        userService.save(user);
        return new GenericResponse("User Saved");
    }
}
