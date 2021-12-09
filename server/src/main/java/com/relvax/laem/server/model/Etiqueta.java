package com.relvax.laem.server.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

// TODO BUSCAR COMO FUNCIONA LA BÚSQUEDA EN NEO4J
@NodeEntity
public class Etiqueta {

    @Id
    @GeneratedValue
    private Long Id;
    private String tag;
    @Relationship( type = "ES_ETIQUETADO", direction = "INCOMING" )
    @JsonIgnore
    private List<Publicacion> publicaciones;  


    /**
     * @return the id
     */
    public Long getId() {
        return Id;
    }

    /**
     * @param id to set
     */
    public void setId(Long id) {
        Id = id;
    }

    /**
     * @return the Tag
     */
    public String getTag() {
        return tag;
    }

    /**
     * @param Tag to set
     */
    public void setTag(String tag) {
        this.tag = tag;
    }

    public List<Publicacion> getPublicaciones() {
        return publicaciones;
    }

    public void setPublicaciones(List<Publicacion> publicaciones) {
        this.publicaciones = publicaciones;
    }

    
    
}