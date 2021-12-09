package com.relvax.laem.server.service;

import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.relvax.laem.server.model.Comenta;
import com.relvax.laem.server.model.Publicacion;
import com.relvax.laem.server.repository.ComentaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;


@RestController()
@CrossOrigin("*")
public class ComentaService {

	@Autowired
	ComentaRepository repository;
	@Autowired
	PublicacionService publicacionServicio;
	@Autowired
	ChefService chefServicio;

	@PostMapping("/comentario/{idPublicacion}/{idChef}")
	public Comenta create(@RequestBody Comenta comentario, @PathVariable Long idPublicacion,@PathVariable Long idChef) {
		comentario.setFecha( LocalDate.now() );
		comentario.setChef(chefServicio.findById(idChef));
		Publicacion publicacionEditar = publicacionServicio.findById(idPublicacion);
		comentario.setPublicacion(publicacionEditar);
		publicacionEditar.setNumeroComentarios(publicacionEditar.getNumeroComentarios()+1);
		return repository.save(comentario);
	}


	@GetMapping("/comentario/{idPublicacion}")
	public Iterable<Comenta> getComentarios(@PathVariable Long idPublicacion) {
		
		List<Comenta> comentarios = new ArrayList<>();
		List<String> texto = repository.getTexto(idPublicacion);
		List<LocalDate>fechas = repository.getFechas(idPublicacion); 
		List<Long> comentariosIDs = repository.getComentarios(idPublicacion);
		 
		for (int i = 0; i < texto.size(); i++) {
			comentarios.add( new Comenta( texto.get(i), fechas.get(i), null,  repository.getChef(comentariosIDs.get(i)) ));
		}
		return comentarios;

	}
	

}
