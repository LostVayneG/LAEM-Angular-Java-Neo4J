package com.relvax.laem.server.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import org.neo4j.ogm.annotation.GeneratedValue;
import org.neo4j.ogm.annotation.Id;
import org.neo4j.ogm.annotation.NodeEntity;
import org.neo4j.ogm.annotation.Relationship;

@NodeEntity
public class Chef {
	
	@Id
	@GeneratedValue
	private Long Id;
	private String nickname;
	private String nombre;
	private String contrasenia;
 	private String genero;
 	private String celular;
 	private Double valoracion; 
	private String rango;
	@Relationship( type = "PUBLICA")
	@JsonIgnore
	private List<Publicacion> publicaciones;
	@Relationship( type = "LIKE")
	@JsonIgnore
	private List<Publicacion> favoritos;
	@Relationship( type = "SIGUE")
	@JsonIgnore
	private List<Chef> seguidos;
	@JsonIgnore
	@Relationship( type = "ES SEGUIDO", direction = "OUTGOING" )
    private List<Chef> seguidores;

	//Contadores
	private int numeroPublicaciones; 
	private int numeroSeguidores;
	private int numeroSeguidos;

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
	 * @return  the nickname
	 */
	public String getNickname() {
		return nickname;
	}

	/**
	 * @param nickname to set
	 */
	public void setNickname(String nickname) {
		this.nickname = nickname;
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
	 * @return the contrasenia
	 */
	public String getContrasenia() {
		return contrasenia;
	}

	/**
	 * @param contrasenia to set
	 */
	public void setContrasenia(String contrasenia) {
		this.contrasenia = contrasenia;
	}

	/**
	 * @return the genero
	 */
	public String getGenero() {
		return genero;
	}

	/**
	 * @param genero to set
	 */
	public void setGenero(String genero) {
		this.genero = genero;
	}
	
	/**
	 * @return the celular
	 */
	public String getCelular() {
		return celular;
	}

	/**
	 * @param celular to set
	 */
	public void setCelular(String celular) {
		this.celular = celular;
	}

	/**
	 * @return the valoracion
	 */
	public Double getValoracion() {
		return valoracion;
	}

	/**
	 * @param valoracion to set
	 */
	public void setValoracion(Double valoracion) {
		this.valoracion = valoracion;
	}

	/**
	 * @return the rango
	 */
	public String getRango() {
		return rango;
	}

	/**
	 * @param rango to set
	 */
	public void setRango(String rango) {
		this.rango = rango;
	}

	/**
	 * @return publicaciones
	 */
	public List<Publicacion> getPublicaciones() {
		return publicaciones;
	}

	/**
	 * @param publicaciones to set
	 */
	public void setPublicaciones(List<Publicacion> publicaciones) {
		this.publicaciones = publicaciones;
	}

	public List<Chef> getSeguidos() {
		return seguidos;
	}

	public void setSeguidos(List<Chef> seguidos) {
		this.seguidos = seguidos;
	}

	public List<Chef> getSeguidores() {
		return seguidores;
	}

	public void setSeguidores(List<Chef> seguidores) {
		this.seguidores = seguidores;
	}

	public int getNumeroPublicaciones() {
		return numeroPublicaciones;
	}

	public void setNumeroPublicaciones(int numeroPublicaciones) {
		this.numeroPublicaciones = numeroPublicaciones;
	}

	public int getNumeroSeguidores() {
		return numeroSeguidores;
	}

	public void setNumeroSeguidores(int numeroSeguidores) {
		this.numeroSeguidores = numeroSeguidores;
	}

	public int getNumeroSeguidos() {
		return numeroSeguidos;
	}

	public void setNumeroSeguidos(int numeroSeguidos) {
		this.numeroSeguidos = numeroSeguidos;
	}

	public List<Publicacion> getFavoritos() {
		return favoritos;
	}

	public void setFavoritos(List<Publicacion> favoritos) {
		this.favoritos = favoritos;
	}
}
