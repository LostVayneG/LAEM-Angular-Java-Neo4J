package com.relvax.laem.server.model;


import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

@NodeEntity
public class Pais {
	
	@Id
	@GeneratedValue
	private Long Id;
	private String nombre;
	private String descripcion;
	@JsonIgnore
	@Relationship( type = "ORIGEN", direction = "INCOMING" )
	private List<Publicacion> publicaciones;  
	
	
	public Pais(String nombre, String descripcion, List<Publicacion> publicaciones) {
		this.nombre = nombre;
		this.descripcion = descripcion;
		this.publicaciones = publicaciones;
	}
	
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
	 * @return the nombre
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * @param nombre to set
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	/**
	 * @return the descripcion
	 */
	public String getDescripcion() {
		return descripcion;
	}

	/**
	 * @param descripcion to set
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	public List<Publicacion> getPublicaciones() {
		return publicaciones;
	}

	public void setPublicaciones(List<Publicacion> publicaciones) {
		this.publicaciones = publicaciones;
	}
}
