package com.relvax.laem.server.model;

import java.time.LocalDate;

import org.neo4j.ogm.annotation.EndNode;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.Property;
import org.neo4j.ogm.annotation.RelationshipEntity;
import org.neo4j.ogm.annotation.StartNode;

//PROHIBIDO MODIFICAR
@RelationshipEntity
public class Comenta {
	
	@Id
	@GeneratedValue
	private Long Id;
	@Property
	private String texto;
	
	private LocalDate fecha;
	@EndNode
	private Publicacion publicacion;
	@StartNode
	private Chef chef;

	
	public Comenta(String texto, LocalDate fecha, Publicacion publicacion, Chef chef) {
		this.texto = texto;
		this.fecha = fecha;
		this.publicacion = publicacion;
		this.chef = chef;
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
	 * @return the texto
	 */
	public String getTexto() {
		return texto;
	}

	/**
	 * @param texto to set
	 */
	public void setTexto(String texto) {
		this.texto = texto;
	}

	public LocalDate getFecha() {
		return fecha;
	}

	public void setFecha(LocalDate fecha) {
		this.fecha = fecha;
	}

	public Publicacion getPublicacion() {
		return publicacion;
	}

	public void setPublicacion(Publicacion publicacion) {
		this.publicacion = publicacion;
	}

	public Chef getChef() {
		return chef;
	}

	public void setChef(Chef chef) {
		this.chef = chef;
	}

	
}
