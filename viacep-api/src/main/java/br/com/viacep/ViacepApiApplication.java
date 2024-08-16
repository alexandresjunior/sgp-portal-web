package br.com.viacep;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.RestController;

@RestController
@SpringBootApplication
public class ViacepApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ViacepApiApplication.class, args);
	}

}
