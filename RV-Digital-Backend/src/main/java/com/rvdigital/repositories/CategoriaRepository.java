package com.rvdigital.repositories;

import com.rvdigital.entities.Categoria;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoriaRepository extends JpaRepository<Categoria, Long> {
    List<Categoria> findByAtivo(Boolean ativo);
    List<Categoria> findByNomeContainingIgnoreCase(String nome);
}