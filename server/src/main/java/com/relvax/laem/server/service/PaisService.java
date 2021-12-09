package com.relvax.laem.server.service;

import org.springframework.web.bind.annotation.RestController;

import java.util.*;

import com.relvax.laem.server.model.Pais;
import com.relvax.laem.server.model.Publicacion;
import com.relvax.laem.server.repository.PaisRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController()
@CrossOrigin("*")
public class PaisService {

	@Autowired
	PaisRepository repository;
	@Autowired
	PublicacionService publicacionServicio;
	/**
	 * @param id del país
	 * @return país solicitado
	 */
	@GetMapping("/paises/{id}")
	public Pais findById(@PathVariable Long id){
		return repository.findById(id).get();
	}

	/**
	 * @return lista de países del sistema
	 */
	@GetMapping("/paises")
	public Iterable<Pais> findAll() {
		return repository.findAll();	
	}

	/**
	 * @param id del país
	 * @return lista de publicaciones del país solicitado
	 */
	@GetMapping("/paises/{id}/publicaciones")
	public Iterable<Publicacion> findPublicaciones(@PathVariable Long id){
		List<Publicacion> publicaciones =  repository.findById(id).get().getPublicaciones();
		List<Publicacion> publicacionesPais = new ArrayList<Publicacion>();
		for(Publicacion p : publicaciones){
			publicacionesPais.add( publicacionServicio.findById(p.getId()));
		}
		return publicacionesPais;
	}

}
