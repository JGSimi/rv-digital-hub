package com.rvdigital.repositories;

import com.rvdigital.entities.Contrato;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContratoRepository extends JpaRepository<Contrato, Long> {
    
    List<Contrato> findByClienteId(Long clienteId);
    
    List<Contrato> findByStatus(String status);
    
    @Query("SELECT c FROM Contrato c WHERE " +
           "LOWER(c.cliente.nome) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.status) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Contrato> searchContratos(@Param("searchTerm") String searchTerm);
    
    @Query("SELECT COUNT(c) FROM Contrato c WHERE c.status = 'ativo'")
    Long countActiveContratos();
}