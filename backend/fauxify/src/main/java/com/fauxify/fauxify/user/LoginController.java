package com.fauxify.fauxify.user;


import com.fauxify.fauxify.error.ApiError;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;

@RestController
public class LoginController {
    @PostMapping("/api/v1/login")
    void handleLogin(){

    }

    @ExceptionHandler({AccessDeniedException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    ApiError handleAccessDeniedException(){
        return new ApiError(401, "Access Error", "/api/v1/login");
    }
}
