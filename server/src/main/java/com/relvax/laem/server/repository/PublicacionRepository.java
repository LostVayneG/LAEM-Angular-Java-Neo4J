package com.relvax.laem.server.repository;

import java.time.LocalDate;
import java.util.List;

import com.relvax.laem.server.model.Publicacion;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface PublicacionRepository extends Neo4jRepository<Publicacion, Long> {

    /*@Query("MATCH (u:User)<-[r:RATED]-(m:Movie) RETURN u,r,m")
    Collection<User> getAllUsers();
    */
    
    /**
     * @param id id de la publicación
     * @return publicación con id = id
     */
    @Query("MATCH (p:Publicacion) WHERE ID(p) = $id RETURN p")
    Publicacion getPublicacion(long id);
    
    /**
     * @param anio año a comparar
     * @param mes mes a comparar
     * @param dia dia a comparar
     * @return publicaciones recientes
     */
    @Query("MATCH (p:Publicacion) WHERE date(p.fecha) > date({year: $anio, month: $mes, day: $dia}) RETURN p ORDER BY ID(p) DESC")
    List<Publicacion> getRecientes(Long anio, Long mes, Long dia);

    /**
     * @param idUsuario id del usuario a asociar
     * @param idPublicacion id de la publicación a asociar
     * @return publicación del usuario con id = idUsuario
     */
    @Query("MATCH (ch1:Chef) where ID(ch1)=$idUsuario MATCH (pub1:Publicacion) where ID(pub1)=$idPublicacion CREATE (ch1)-[:PUBLICA]->(pub1) return pub1;")
    Publicacion asociarPublicacion(Long idUsuario, Long idPublicacion);
    
     /**
     * @param idUsuario id del usuario a asociar
     * @param idPublicacion id de la publicación a asociar
     * @param comentario comentario a asociar
     * @return publicación del usuario con id = idUsuario
     */
    @Query("MATCH (c:Chef) where ID(c)=$idUsuario  MATCH (p:Publicacion) where ID(p)=$idPublicacion CREATE (c)-[x:COMENTO{ comentario:$comentario, dia:$fecha} ]->(p) return p;")
    Publicacion asociarComentario(Long idPublicacion, Long idUsuario, String comentario , LocalDate fecha);
    
    /**
     * @param idUsuario id del usuario a asociar
     * @param idPublicacion id de la publicación a asociar
     * @param valoracion valoracion a asociar
     * @return publicación del usuario con id = idUsuario
     */
    @Query("MATCH (c:Chef) where ID(c)=$idUsuario  MATCH (p:Publicacion) where ID(p)=$idPublicacion CREATE (c)-[:VALORA{ valoracion:$Valoracion}]->(p) return p;")
    Publicacion asociarValoracion(Long idPublicacion, Long idUsuario, double Valoracion);
    
    /**
     * @param idPublicacion id de la publicación a asociar
     * @return listado de valoraciones
     */
    @Query("MATCH relation=(c:Chef)-[r:VALORA]->(p:Publicacion) RETURN r.valoracion")
	  List<Double> hallarValoraciones(Long idPublicacion);

}