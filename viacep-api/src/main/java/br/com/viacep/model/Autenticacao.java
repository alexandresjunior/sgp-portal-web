package br.com.viacep.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Autenticacao {

    private String login;
    private String senha;
    private boolean autenticado;
    
}
