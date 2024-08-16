package com.tarefas.api.dto;

import com.tarefas.api.constants.StatusUsuario;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDTO {

    private Long id;
    private String nome;
    private String cpf;
    private String email;
    private int idade;
    private StatusUsuario status; 
    
}
