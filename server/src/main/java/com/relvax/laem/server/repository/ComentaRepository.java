package com.relvax.laem.server.repository;

import java.time.LocalDate;
import java.util.List;

import com.relvax.laem.server.model.Chef;
import com.relvax.laem.server.model.Comenta;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface ComentaRepository extends Neo4jRepository<Comenta, Long> {

    /*@Query("MATCH (ch:Chef) MATCH (pub1:Publicacion) where ID(pub1)=$idPublicacion MATCH (ch)-[c:COMENTA]->(pub1) return ID(c)")
    List<Integer> getComentarios( long idPublicacion );
    */

    @Query("MATCH (ch:Chef) MATCH (pub1:Publicacion) where ID(pub1)=$idPublicacion MATCH (ch)-[c:COMENTA]->(pub1) return c.texto ORDER BY ID(c)")
    List<String> getTexto( long idPublicacion );
    
    @Query("MATCH (ch:Chef) MATCH (pub1:Publicacion) where ID(pub1)=$idPublicacion MATCH (ch)-[c:COMENTA]->(pub1) return c.fecha ORDER BY ID(c)")
    List<LocalDate> getFechas( long idPublicacion );

    @Query("MATCH (ch:Chef) MATCH (pub1:Publicacion) where ID(pub1)=$idPublicacion MATCH (ch)-[c:COMENTA]->(pub1) return ID(c) ORDER BY ID(c)")
    List<Long> getComentarios( long idPublicacion );

    @Query("MATCH (ch:Chef)-[c:COMENTA]->(p:Publicacion) where ID(c)=$idComentario return ch")
    Chef getChef(Long idComentario);
}