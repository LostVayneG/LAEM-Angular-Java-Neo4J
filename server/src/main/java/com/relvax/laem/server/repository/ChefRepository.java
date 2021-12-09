package com.relvax.laem.server.repository;

import java.util.List;

import com.relvax.laem.server.model.Chef;
import com.relvax.laem.server.model.Publicacion;

import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface ChefRepository extends Neo4jRepository<Chef, Long> {

    /*@Query("MATCH (u:User)<-[r:RATED]-(m:Movie) RETURN u,r,m")
    Collection<User> getAllUsers();
    */
    /**
     * @param id id del chef
     * @return chef con id = id
     */
    @Query("MATCH (c:Chef) WHERE ID(c) = $id return c")
    Chef getChef(long id);

    /**
     * @param nickname nickname del chef
     * @return chef con nickname = nickname
     */
    @Query("MATCH (c:Chef) WHERE c.nickname = $nickname return c")
    Chef findByNick(String nickname);

    /**
     * @param idUsuario id del usuario a asociar
     * @param idPublicacion id de la publicación a asociar
     * @return chef actualizado
     */
    @Query("MATCH (ch1:Chef) where ID(ch1)=$idUsuario MATCH (pub1:Publicacion) where ID(pub1)=$idPublicacion CREATE (ch1)-[:LIKE]->(pub1) return ch1;")
    Chef agregarPublicacionFavoritos(Long idUsuario, Long idPublicacion);

    /**
     * @param idUsuario id del usuario a asociar
     * @param idPublicacion id de la publicación a asociar
     * @return chef actualizado
     */
    @Query("MATCH (ch1:Chef) where ID(ch1)=$idUsuario MATCH (pub1:Publicacion) where ID(pub1)=$idPublicacion MATCH (ch1)-[x:LIKE]->(pub1) DELETE x return ch1;")
    Chef eliminarPublicacionFavoritos(Long idUsuario, Long idPublicacion);
    

    @Query(" MATCH (c:Chef) WHERE ID(c)=$idChef "    
    +" MATCH (c)-[:SIGUE]->(chefs:Chef) "
    +" MATCH (chefs)-[:PUBLICA]->(pubs:Publicacion) "
    +" RETURN pubs "
    +" ORDER BY pubs.fecha, ID(pubs) ")
    List<Publicacion> encontarPublicacionesSeguidos(Long idChef);

    /**
     * @param idChef1 id chef seguidor
     * @param idChef2 id chef seguido
     * @return chef seguido
    @Query("MATCH (chef1:Chef) where ID(chef1)=$idChef1 " +
    "MATCH (chef2:Chef) where ID(chef2)=$idChef2" +
    " CREATE (chef1)-[:Sigue]->(chef2) return chef2")
    Chef addSeguidor(Long idChef1, Long idChef2);
     */

    /**
     * 
     * @param idChef1 id chef seguidor
     * @param idChef2 id chef seguido
     * @return chef seguido
    @Query("MATCH (chef1:Chef) where ID(chef1)=$idChef1 " +
    "MATCH (chef2:Chef) where ID(chef2)=$idChef2" +
    " CREATE (chef2)-[:EsSeguido]->(chef1) return chef2")
    Chef addSeguido(Long idChef1, Long idChef2);
     */

    /**
     * @param idChef1 id chef seguidor
     * @param idChef2 id chef seguido
     * @return chef seguido
    @Query("MATCH (chef1:Chef)-[s:Sigue]->(chef2:Chef) " +
    "where ID(chef1)=$idChef1 and ID(chef2)=$idChef2 DELETE s return chef2")
    Chef deleteSeguidor(Long idChef1, Long idChef2);
     */

    /**
     * @param idChef1 id chef seguidor
     * @param idChef2 id chef seguido
     * @return chef seguido
    @Query("MATCH (chef2:Chef)-[s:EsSeguido]->(chef1:Chef) " +
    "where ID(chef1)=$idChef1 and ID(chef2)=$idChef2 DELETE s return chef2")
    Chef deleteSeguido(Long idChef1, Long idChef2);
     */
}