package com.rvdigital.repositories;

import com.rvdigital.entities.Servico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicoRepository extends JpaRepository<Servico, Long> {
    
    List<Servico> findByAtivo(Boolean ativo);
    
    List<Servico> findByCategoriaId(Long categoriaId);
    
    @Query("SELECT s FROM Servico s WHERE " +
           "LOWER(s.nome) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.descricao) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(s.categoria.nome) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Servico> searchServicos(@Param("searchTerm") String searchTerm);
}