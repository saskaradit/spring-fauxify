package com.fauxify.fauxify;

import com.fauxify.fauxify.error.ApiError;
import com.fauxify.fauxify.user.User;
import com.fauxify.fauxify.user.UserRepository;
import com.fauxify.fauxify.user.UserService;
import org.junit.Before;
import org.junit.Test;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.support.BasicAuthenticationInterceptor;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Map;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
public class LoginControllerTest {
    private static final String API_1_LOGIN = "/api/v1/login";

    @Autowired
    TestRestTemplate testRestTemplate;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Before
    public void cleanup(){
        userRepository.deleteAll();
        testRestTemplate.getRestTemplate().getInterceptors().clear();
    }

    @Test
    public void postLogin_withoutUserCredentials_receiveUnauthorized(){
        ResponseEntity<Object> response = login(Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    public void postLogin_withIncorrectUserCredentials_receiveUnauthorized(){
        authenticate();
        ResponseEntity<Object> response = login(Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    public void postLogin_withoutUserCredentials_receiveApiErrorWithoutValidationErrors(){
        ResponseEntity<String> response = login(String.class);
        assertThat(response.getBody().contains("validationErros")).isFalse();
    }

    @Test
    public void postLogin_withIncorrectUserCredentials_receiveUnauthorizedWithoutWWWAuthenticationHeader(){
        authenticate();
        ResponseEntity<Object> response = login(Object.class);
        assertThat(response.getHeaders().containsKey("WWW-Authenticate")).isFalse();
    }

    @Test
    public void postLogin_withValidCredentials_receivedOk(){
        userService.save(TestUtil.createValidUser());
        authenticate();
        ResponseEntity<Object> response = login(Object.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    public void postLogin_withValidCredentials_receivedLoggedInUserId(){
        User user = userService.save(TestUtil.createValidUser());
        authenticate();
        ResponseEntity<Map<String,Object>> response = login(new ParameterizedTypeReference<Map<String, Object>>() {});

        Map<String,Object> body = response.getBody();
        Integer id = (Integer) body.get("id");
        assertThat(id).isEqualTo(user.getId());
    }

    @Test
    public void postLogin_withValidCredentials_receivedLoggedInUsersImage(){
        User user = userService.save(TestUtil.createValidUser());
        authenticate();
        ResponseEntity<Map<String,Object>> response = login(new ParameterizedTypeReference<Map<String, Object>>() {});

        Map<String,Object> body = response.getBody();
        String image = (String) body.get("image");
        assertThat(image).isEqualTo(user.getImage());
    }

    @Test
    public void postLogin_withValidCredentials_receivedLoggedInUsersName(){
        User user = userService.save(TestUtil.createValidUser());
        authenticate();
        ResponseEntity<Map<String,Object>> response = login(new ParameterizedTypeReference<Map<String, Object>>() {});

        Map<String,Object> body = response.getBody();
        String displayName = (String) body.get("displayName");
        assertThat(displayName).isEqualTo(user.getDisplayName());
    }

    @Test
    public void postLogin_withValidCredentials_notReceivedLoggedInUsersPassword(){
        userService.save(TestUtil.createValidUser());
        authenticate();
        ResponseEntity<Map<String,Object>> response = login(new ParameterizedTypeReference<Map<String, Object>>() {});
        Map<String,Object> body = response.getBody();
        assertThat(body.containsKey("password")).isFalse();
    }


    private void authenticate(){
        testRestTemplate.getRestTemplate().getInterceptors().add(new BasicAuthenticationInterceptor("Saskara","Jengjet1"));
    }

    public <T> ResponseEntity<T> login(Class<T> responseType){
        return testRestTemplate.postForEntity(API_1_LOGIN,null, responseType);
    }

    public <T> ResponseEntity<T> login(ParameterizedTypeReference<T> responseType){
        return testRestTemplate.exchange(API_1_LOGIN, HttpMethod.POST,null, responseType);
    }
}
