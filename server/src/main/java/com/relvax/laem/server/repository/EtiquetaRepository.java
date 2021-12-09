package com.relvax.laem.server.repository;

import java.util.List;

import com.relvax.laem.server.model.Etiqueta;
import com.relvax.laem.server.model.Publicacion;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface EtiquetaRepository extends Neo4jRepository<Etiqueta, Long> {

    /**
     * @param idEtiqueta id de la etiqueta a asociar
     * @param idPublicacion id de la publicación a asociar
     * @return etiqueta de la publiacacion con id = idPublicacion
     */
    @Query("MATCH (p:Publicacion) where ID(p)=$idPublicacion MATCH (etiq1:Etiqueta) where ID(etiq1)=$idEtiqueta CREATE (p)-[:ES_ETIQUETADO]->(etiq1) return etiq1;")
    Etiqueta asociarEtiqueta(Long idPublicacion, Long idEtiqueta);

    /**
     * @param etiqueta nombre de la etiqueta
     * @return publicaciones con dicha etiqueta
     */
    @Query("MATCH (p:Publicacion) -[:ES_ETIQUETADO]->(e: Etiqueta) WHERE e.tag =$etiqueta  return p")
    List<Publicacion> getPublicaciones(String etiqueta);

    /**
     * @param idEtiqueta id de la etiqueta a asociar
     * @param idPublicacion id de la publicación a asociar
     * @return etiqueta de la publiacacion con id = idPublicacion
     */
    @Query("MATCH (p:Publicacion) where ID(p)=$idPublicacion MATCH (etiq1:Etiqueta) where ID(etiq1)=$idEtiqueta MATCH (p)-[x:ES_ETIQUETADO]->(etiq1) DELETE x return etiq1;")
    Etiqueta deleteRelacion(Long idPublicacion, Long idEtiqueta);

    /**
     * @param etiqueta nombre de la etiqueta
     * @return etiqueta con dicho tag
     */
    @Query("MATCH (e:Etiqueta) WHERE e.tag =$etiqueta  return e")
    Etiqueta getEtiqueta(String etiqueta);

    @Query("MATCH (p:Publicacion)-[r:ES_ETIQUETADO]->(e:Etiqueta) WHERE ID(e)=$idEtiqueta return p")
    List<Publicacion> getPublicacionesByID(Long idEtiqueta);
}