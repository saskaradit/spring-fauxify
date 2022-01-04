package com.fauxify.fauxify.user;

import lombok.Data;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

@Data
@Entity
public class User {
    @Id
    @GeneratedValue
    private long id;

//    @NotNull(message = "Username cannot be null")
    @NotNull(message = "{fauxify.constraints.username.NotNull.message}")
    @Size(min=4, max=255)
    @UniqueUsername
    private String username;

    @NotNull
    @Size(min=3, max=255)
    private String displayName;

    @NotNull
    @Size(min=6, max=255)
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$", message = "{fauxify.constraints.password.Pattern.message}")
    private String password;
}
