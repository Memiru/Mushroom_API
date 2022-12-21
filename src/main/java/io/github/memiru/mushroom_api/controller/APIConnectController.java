package io.github.memiru.mushroom_api.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.HashMap;

@RestController
public class APIConnectController {

    @GetMapping("/test")
    public ResponseEntity<Object> test(HttpServletRequest request){

        //request로 받을 예정
        String key = request.getParameter("api_key");

        String url = "https://public.api.nexon.com/openapi/maplestory/v1/cube-use-results?";

        String api_count = "?count="+request.getParameter("api_count")+"&";
        String api_date = "date="+request.getParameter("api_date")+"&";
        String api_cursor = "cursor="+request.getParameter("api_cursor");

        WebClient webClient = WebClient.builder()
                .baseUrl(url)
                .defaultHeader(HttpHeaders.AUTHORIZATION, key)
                .build();

        HashMap<String, Object> result = webClient.get()
                .uri(api_count+api_date+api_cursor)
                .retrieve()
                .bodyToMono(HashMap.class)
                .block();

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
