package com.fauxify.fauxify.user;


import com.fasterxml.jackson.annotation.JsonView;
import com.fauxify.fauxify.error.ApiError;
import com.fauxify.fauxify.shared.CurrentUser;
import com.fauxify.fauxify.user.vm.UserVM;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.nio.file.AccessDeniedException;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@RestController
public class LoginController {
    @PostMapping("/api/v1/login")
    UserVM handleLogin(@CurrentUser User loggedInUser){
        return new UserVM(loggedInUser);
    }

    @ExceptionHandler({AccessDeniedException.class})
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    ApiError handleAccessDeniedException(){
        return new ApiError(401, "Access Error", "/api/v1/login");
    }
}
