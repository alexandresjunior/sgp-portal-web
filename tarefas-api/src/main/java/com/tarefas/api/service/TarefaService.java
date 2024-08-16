package com.tarefas.api.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tarefas.api.dto.TarefaDTO;
import com.tarefas.api.model.Tarefa;
import com.tarefas.api.repository.TarefaRepository;

@Service
public class TarefaService {

    @Autowired
    private TarefaRepository tarefaRepository;

    public Tarefa salvarTarefa(Tarefa tarefa) {
        return tarefaRepository.save(tarefa);
    }

    public List<TarefaDTO> listarTarefas() {
        return tarefaRepository.findAll()
                .stream()
                .map(Tarefa::toDTO)
                .collect(Collectors.toList());
    }

    public TarefaDTO buscarTarefaPeloId(Long id) {
        Optional<Tarefa> tarefaOpt = tarefaRepository.findById(id);

        if (tarefaOpt.isPresent()) {
            return tarefaOpt.get().toDTO();
        }

        return null;
    }

    public void deletarTarefa(Long id) {
        tarefaRepository.deleteById(id);
    }

    public Tarefa atualizarTarefa(Long id, Tarefa dadosTarefa) {
        Optional<Tarefa> tarefaOpt = tarefaRepository.findById(id);

        if (tarefaOpt.isPresent()) {
            Tarefa tarefa = tarefaOpt.get();

            tarefa.setTitulo(dadosTarefa.getTitulo());
            tarefa.setDescricao(dadosTarefa.getDescricao());
            tarefa.setDataCriacao(dadosTarefa.getDataCriacao());
            tarefa.setDataConclusao(dadosTarefa.getDataConclusao());
            tarefa.setPrioridade(dadosTarefa.getPrioridade());
            tarefa.setStatus(dadosTarefa.getStatus());

            return tarefaRepository.save(tarefa);
        }

        return null;
    }

}
