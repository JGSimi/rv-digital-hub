package com.rvdigital.repositories;

import com.rvdigital.entities.Cliente;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    
    Optional<Cliente> findByCpf(String cpf);
    
    List<Cliente> findByNomeContainingIgnoreCase(String nome);
    
    List<Cliente> findByEmailContainingIgnoreCase(String email);
    
    List<Cliente> findByAtivo(Boolean ativo);
    
    @Query("SELECT c FROM Cliente c WHERE " +
           "LOWER(c.nome) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.cpf) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
           "LOWER(c.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Cliente> searchClientes(@Param("searchTerm") String searchTerm);
}