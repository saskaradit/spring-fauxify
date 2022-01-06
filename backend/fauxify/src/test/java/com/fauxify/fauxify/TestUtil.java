package com.fauxify.fauxify;

import com.fauxify.fauxify.user.User;

public class TestUtil {
    public static User createValidUser() {
        User user = new User();
        user.setUsername("Saskara");
        user.setDisplayName("test-display");
        user.setPassword("Jengjet1");
        user.setImage("rad-image.png");
        return user;
    }
}
