package com.rvdigital.controllers;

import com.rvdigital.entities.Servico;
import com.rvdigital.repositories.ServicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/servicos")
public class ServicoController {
    
    @Autowired
    private ServicoRepository servicoRepository;
    
    @GetMapping
    public ResponseEntity<List<Servico>> listarTodos() {
        List<Servico> servicos = servicoRepository.findAll();
        return ResponseEntity.ok(servicos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Servico> buscarPorId(@PathVariable Long id) {
        Optional<Servico> servico = servicoRepository.findById(id);
        return servico.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Servico> criar(@Valid @RequestBody Servico servico) {
        Servico novoServico = servicoRepository.save(servico);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoServico);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Servico> atualizar(@PathVariable Long id, @Valid @RequestBody Servico servicoDetails) {
        Optional<Servico> servicoOptional = servicoRepository.findById(id);
        
        if (servicoOptional.isPresent()) {
            Servico servico = servicoOptional.get();
            servico.setNome(servicoDetails.getNome());
            servico.setDescricao(servicoDetails.getDescricao());
            servico.setValor(servicoDetails.getValor());
            servico.setCategoria(servicoDetails.getCategoria());
            servico.setAtivo(servicoDetails.getAtivo());
            
            Servico servicoAtualizado = servicoRepository.save(servico);
            return ResponseEntity.ok(servicoAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        if (servicoRepository.existsById(id)) {
            servicoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/categoria/{categoriaId}")
    public ResponseEntity<List<Servico>> listarPorCategoria(@PathVariable Long categoriaId) {
        List<Servico> servicos = servicoRepository.findByCategoriaId(categoriaId);
        return ResponseEntity.ok(servicos);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Servico>> searchServicos(@RequestParam String term) {
        List<Servico> servicos = servicoRepository.searchServicos(term);
        return ResponseEntity.ok(servicos);
    }
}