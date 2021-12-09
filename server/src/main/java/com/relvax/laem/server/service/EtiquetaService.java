package com.relvax.laem.server.service;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import com.relvax.laem.server.exceptions.NotFoundException;
import com.relvax.laem.server.model.Etiqueta;
import com.relvax.laem.server.model.Publicacion;
import com.relvax.laem.server.repository.EtiquetaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController()
@CrossOrigin("*")
public class EtiquetaService {

	@Autowired
	EtiquetaRepository repository;
	@Autowired
	PublicacionService publicacionServicio;
	
	/**
	 * @param nombre de la etiqueta
	 * @return lista de publicaciones que tengan esa etiqueta
	 */
	@GetMapping("/etiqueta/{etiqueta}")
	public Iterable<Publicacion> findPublicaciones(@PathVariable String etiqueta){
		List<Publicacion> p = repository.getPublicaciones(etiqueta);
		List<Publicacion> e = new ArrayList<Publicacion>();
		for(Publicacion x : p){
			e.add(publicacionServicio.findById(x.getId()));
		}
        return e;
	}

	/**
	 * @param etiqueta a crear 
	 * @param idPublicacion de la publicacion a la que pertenece la etiqueta
	 * @return etiqueta creada
	 */
	@PostMapping("/etiqueta/{idPublicacion}")
    public Etiqueta create(@RequestBody final Etiqueta etiqueta, @PathVariable final Long idPublicacion) {
        Etiqueta e = repository.getEtiqueta(etiqueta.getTag());
        if(e == null){
            e = repository.save(etiqueta);
        }
        return repository.asociarEtiqueta(idPublicacion, e.getId());
    }
	
	/**
	 * @param id de la etiqueta
	 */
	@DeleteMapping("/etiqueta/{idPublicacion}/{id}")
	public void Delete(@PathVariable Long idPublicacion, @PathVariable Long id ){
		
		if( repository.existsById( id )){
			repository.deleteRelacion(idPublicacion,id);
		}
		else{
			throw new NotFoundException("No se pudo eliminar la etiqueta");
		}
	}
}
