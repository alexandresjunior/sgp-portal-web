package com.tarefas.api.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.tarefas.api.constants.Prioridade;
import com.tarefas.api.constants.StatusTarefa;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TarefaDTO {

    private Long id;
    private String titulo;
    private String descricao;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate dataCriacao;
    private int qtdeDiasTrabalhados;
    private Prioridade prioridade;
    private StatusTarefa status;

}
