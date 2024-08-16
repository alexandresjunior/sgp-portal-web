package br.com.viacep.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import br.com.viacep.model.Autenticacao;
import br.com.viacep.model.Endereco;

@RestController
public class ExemplosController {

    @GetMapping("/")
	public String exibirSaudacao() {
		return "Olá, mundo!";
	}

	@GetMapping("/fulano")
	public String exibirSaudacao(@RequestParam(required = false, defaultValue = "mundo") String nome) {
		return "Olá, " + nome + "!";
	}

	@GetMapping("/endereco/{cep}")
	public String exibirCep(@PathVariable String cep) {
		return "CEP: " + cep;
	}

	@PostMapping("/login")
	public Autenticacao login(@RequestBody Autenticacao auth) {
		return new Autenticacao(auth.getLogin(), auth.getSenha(), auth.isAutenticado());
	}

	@GetMapping("/viacep/{cep}")
	public Endereco buscarEnderecoPeloCep(@PathVariable String cep) {
		String url = "https://viacep.com.br/ws/" + cep + "/json/";

		RestTemplate restTemplate = new RestTemplate();

		Endereco endereco = restTemplate.getForObject(url, Endereco.class);

		return endereco;
	}
    
}
