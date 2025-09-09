package com.rvdigital.controllers;

import com.rvdigital.entities.Contrato;
import com.rvdigital.repositories.ContratoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/contratos")
public class ContratoController {
    
    @Autowired
    private ContratoRepository contratoRepository;
    
    @GetMapping
    public ResponseEntity<List<Contrato>> listarTodos() {
        List<Contrato> contratos = contratoRepository.findAll();
        return ResponseEntity.ok(contratos);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Contrato> buscarPorId(@PathVariable Long id) {
        Optional<Contrato> contrato = contratoRepository.findById(id);
        return contrato.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Contrato> criar(@Valid @RequestBody Contrato contrato) {
        Contrato novoContrato = contratoRepository.save(contrato);
        return ResponseEntity.status(HttpStatus.CREATED).body(novoContrato);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Contrato> atualizar(@PathVariable Long id, @Valid @RequestBody Contrato contratoDetails) {
        Optional<Contrato> contratoOptional = contratoRepository.findById(id);
        
        if (contratoOptional.isPresent()) {
            Contrato contrato = contratoOptional.get();
            contrato.setCliente(contratoDetails.getCliente());
            contrato.setStatus(contratoDetails.getStatus());
            contrato.setDataInicio(contratoDetails.getDataInicio());
            contrato.setDataFim(contratoDetails.getDataFim());
            contrato.setValorTotal(contratoDetails.getValorTotal());
            
            Contrato contratoAtualizado = contratoRepository.save(contrato);
            return ResponseEntity.ok(contratoAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletar(@PathVariable Long id) {
        if (contratoRepository.existsById(id)) {
            contratoRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/cliente/{clienteId}")
    public ResponseEntity<List<Contrato>> listarPorCliente(@PathVariable Long clienteId) {
        List<Contrato> contratos = contratoRepository.findByClienteId(clienteId);
        return ResponseEntity.ok(contratos);
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Contrato>> searchContratos(@RequestParam String term) {
        List<Contrato> contratos = contratoRepository.searchContratos(term);
        return ResponseEntity.ok(contratos);
    }
}