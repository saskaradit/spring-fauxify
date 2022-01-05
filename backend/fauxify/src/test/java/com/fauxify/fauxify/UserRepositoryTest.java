package com.fauxify.fauxify;

import com.fauxify.fauxify.user.User;
import static org.assertj.core.api.Assertions.assertThat;
import com.fauxify.fauxify.user.UserRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

@RunWith(SpringRunner.class)
@DataJpaTest
@ActiveProfiles("test")
public class UserRepositoryTest {
    @Autowired
    TestEntityManager testEntityManager;

    @Autowired
    UserRepository userRepository;

    @Test
    public void findByUsername_whenUserExists_returnsUser(){
        testEntityManager.persist(TestUtil.createValidUser());

        User inDB = userRepository.findByUsername("Saskara");
        assertThat(inDB).isNotNull();
    }

    @Test
    public void findByUsername_whenUserDoesNotExist_returnsNull(){
        User inDB = userRepository.findByUsername("raddd");
        assertThat(inDB).isNull();
    }

}
