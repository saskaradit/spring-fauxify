package com.fauxify.fauxify.user;

import com.fasterxml.jackson.annotation.JsonView;
import com.fauxify.fauxify.error.ApiError;
import com.fauxify.fauxify.shared.CurrentUser;
import com.fauxify.fauxify.shared.GenericResponse;
import com.fauxify.fauxify.user.vm.UserVM;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    UserService userService;

    @PostMapping("/users")
    GenericResponse createUser(@Valid @RequestBody User user){
        userService.save(user);
        return new GenericResponse("User Saved");
    }

    @GetMapping("/users")
    Page<UserVM> getUsers(@CurrentUser User loggedInUser, Pageable page) {
        return userService.getUsers(loggedInUser,page).map(UserVM::new);
    }

    @GetMapping("/users/{username}")
    UserVM getUserByUsername(@PathVariable String username){
        User user = userService.getByUsername(username);
        return new UserVM(user);
    }

    @ExceptionHandler({MethodArgumentNotValidException.class})
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    ApiError handleValidationException(MethodArgumentNotValidException exception, HttpServletRequest request){
        ApiError apiError = new ApiError(400, "Validation Error", request.getServletPath());

        BindingResult bindingResult = exception.getBindingResult();

        Map<String,String> validationErrors = new HashMap<>();

        for(FieldError fieldError: bindingResult.getFieldErrors()){
            validationErrors.put(fieldError.getField(),fieldError.getDefaultMessage());
        }
        apiError.setValidationErrors(validationErrors);
        return apiError;
    }
}
