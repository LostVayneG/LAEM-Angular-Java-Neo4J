package com.relvax.laem.server.repository;

import java.util.List;

import com.relvax.laem.server.model.Chef;
import com.relvax.laem.server.model.Publicacion;
import com.relvax.laem.server.model.Valora;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface ValoracionRepository extends Neo4jRepository<Valora, Long> {

    @Query("MATCH (ch1:Chef) where ID(ch1)=$idChef MATCH (pub1:Publicacion) where ID(pub1)=$idPublicacion MATCH (ch1)-[v:VALORA]->(pub1) return ch1,v,pub1")
    Valora encontrarValoracion( long idPublicacion, long idChef );

    @Query("MATCH (p:Publicacion) WHERE p.valoracion > 3 RETURN p ORDER BY p.valoracion DESC LIMIT 9")
    List<Publicacion> topRecetas();

    @Query("MATCH (c:Chef) WHERE c.valoracion > 3 "+
    " WITH c, CASE c.rango "+
    " WHEN 'Gran Maestro' THEN 0 "+
    " WHEN 'Maestro' THEN 1 "+
    " WHEN 'Veterano' THEN 2 "+
    " WHEN 'Profesional' THEN 3 "+
    " WHEN 'Novato' THEN 4 "+
    " ELSE -1 "+
    " END as sortOrder "+
    " RETURN c ORDER BY sortOrder, c.valoracion DESC LIMIT 9")
    List<Chef> topChefs();

    @Query("MATCH (c:Chef)-[v:VALORA]->(p:Publicacion) WHERE ID(p)=$idPublicacion return c,v,p")
    List<Valora> getValoraciones(Long idPublicacion);

}

