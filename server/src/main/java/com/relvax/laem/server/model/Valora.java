package com.relvax.laem.server.model;


import org.neo4j.ogm.annotation.EndNode;
import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.Property;
import org.neo4j.ogm.annotation.RelationshipEntity;
import org.neo4j.ogm.annotation.StartNode;

@RelationshipEntity
public class Valora {
	
	@Id
	@GeneratedValue
	private Long Id;
	@Property
	private double calificacion;
	@EndNode
	private Publicacion publicacion;
	@StartNode
	private Chef chef;
	
	/**
	 * Id de Valoración
	 * @return 
	 */
	public Long getId() {
		return Id;
	}

	/**
	 * Id a asignar
	 * @param id
	 */
	public void setId(Long id) {
		Id = id;
	}

	/**
	 * 
	 * @return Publicación valorada 
	 */
	public Publicacion getPublicacion() {
		return publicacion;
	}

	/**
	 * Publicación a asignar
	 * @param publicacion
	 */

	public void setPublicacion(Publicacion publicacion) {
		this.publicacion = publicacion;
	}

	/**
	 * Obtener calificación
	 * @return double con la calificación
	 */
	public double getCalificacion() {
		return calificacion;
	}

	/**
	 * 
	 * @param calificacion set calificación
	 */
	public void setCalificacion(double calificacion) {
		this.calificacion = calificacion;
	}

	/**
	 * 
	 * @return obtener chef
	 */
	public Chef getChef() {
		return chef;
	}

	/**
	 * Chef a asignar 
	 * @param chef
	 */
	public void setChef(Chef chef) {
		this.chef = chef;
	}
}
