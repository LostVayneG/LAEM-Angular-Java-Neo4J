package com.relvax.laem.server.repository;

import java.util.List;

import com.relvax.laem.server.model.Pais;
import com.relvax.laem.server.model.Publicacion;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface PaisRepository extends Neo4jRepository<Pais, Long> {

    @Query("MATCH (pais:Pais) where ID(pais)=$idPais "+
    "MATCH (pais)-[o:ORIGEN]->(p1) return p1")
    List<Publicacion> getPublicaiones(Long idPais);
}