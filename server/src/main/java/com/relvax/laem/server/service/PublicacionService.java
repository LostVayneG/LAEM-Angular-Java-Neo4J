package com.relvax.laem.server.service;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.relvax.laem.server.model.Chef;
import com.relvax.laem.server.model.Etiqueta;
import com.relvax.laem.server.model.Publicacion;
import com.relvax.laem.server.repository.ChefRepository;
import com.relvax.laem.server.repository.PublicacionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

@RestController()
@CrossOrigin("*")
public class PublicacionService {

	@Autowired
	PublicacionRepository repository;
	@Autowired
	ChefService servicioChef;
	@Autowired
	ChefRepository repositoryChef;

	@Autowired
	EtiquetaService servicioEtiqueta;
	@Autowired
	ValoracionService servicioValoracion;
	
	/**
	 * @param id publicacion
	 * @return publicacion con id = id
	 */
	@GetMapping("/publicaciones/{id}")
	public Publicacion findById(@PathVariable Long id){
		Publicacion p = repository.findById(id).get();
		System.out.println( p.getChef().getNickname() );
		return repository.findById(id).get();
	}


	/**
	 * @return publicaciones recientes
	 */
	@GetMapping("/publicaciones/recientes")
	public Iterable<Publicacion> findRecientes(){
		LocalDate actual = LocalDate.now();
		actual = actual.minusWeeks(1);
		System.out.println( actual.toString() );
		long anio =  actual.getYear();
		long mes = actual.getMonthValue();
		long dia = actual.getDayOfMonth();
		List<Publicacion> publicacionesRecientes = repository.getRecientes( anio , mes ,  dia );
		List<Publicacion> menuInicio = new ArrayList<Publicacion>(); 
		for( int i = 0; i < 20 && i < publicacionesRecientes.size(); i++){
			menuInicio.add( findById( publicacionesRecientes.get(i).getId()) );
		}
		return menuInicio;
	}

	/**
	 * @param publicacion con cambios
	 * @return publicacion editada
	 */
	@PutMapping("/publicaciones")
    public Publicacion update(@RequestBody Publicacion publicacion ){
		
		List<Etiqueta> etiquetas = publicacion.getEtiquetas();

		Publicacion publicacionEditar = findById(publicacion.getId());
        publicacionEditar.setDescripcion(publicacion.getDescripcion());
        publicacionEditar.setDuracion(publicacion.getDuracion());
        publicacionEditar.setFecha(publicacion.getFecha());
		publicacionEditar.setTitulo(publicacion.getTitulo());
		
		publicacionEditar.setValoracion(publicacion.getValoracion());
		System.out.println( "Valor2: " + publicacionEditar.getValoracion() );
		publicacionEditar.setUrl(publicacion.getUrl());
		publicacionEditar.setPreparacion( publicacion.getPreparacion() );
		publicacionEditar.setIngredientes(publicacion.getIngredientes());
		
		if(publicacionEditar.getEtiquetas() != null){
			for( Etiqueta e : publicacionEditar.getEtiquetas() ){
				servicioEtiqueta.Delete( publicacionEditar.getId() , e.getId());
			}
		}
		for( Etiqueta e: etiquetas ){
			servicioEtiqueta.create(e, publicacionEditar.getId());
		}
		return repository.save(publicacionEditar);
	}

	/**
	 * @param publicacion a crear 
	 * @param idUsuario del usuario al que le pertenece la publicación
	 * @return publicación creada
	 */
	@PostMapping("/publicaciones/{idUsuario}")
	public Publicacion create(@RequestBody Publicacion publicacion, @PathVariable Long idUsuario) {
		
		
		List<Etiqueta> etiquetas = publicacion.getEtiquetas();

		publicacion.setFecha( LocalDate.now() );
		publicacion.setNumeroComentarios(0);
		publicacion.setNumeroValoraciones(0);
		publicacion.setValoracion(0);
		publicacion.setEtiquetas(new ArrayList<Etiqueta>());
		

		Publicacion p = repository.save(publicacion);
		repository.asociarPublicacion(idUsuario, p.getId());
		
		if(etiquetas != null){
			for( Etiqueta e: etiquetas ){
				servicioEtiqueta.create(e, p.getId());
			}
		}
		p = repository.findById( p.getId() ).get();		
		p.getChef().setNumeroPublicaciones( p.getChef().getNumeroPublicaciones()+1 );

		servicioValoracion.updateChef(idUsuario);
		return repository.save(p);
	}

	/**
	 * 
	 * @param id de la publicación
	 * @param file archivo a guardar
	 * @return publicación con archivo asociado
	 * @throws IOException
	 */
	@PostMapping("/publicaciones/{id}/uploadFile")
	public Publicacion create( @PathVariable Long id, @RequestParam("file") MultipartFile file) throws IOException {
		Publicacion x = repository.findById(id).get();
		x.setArchivo(file.getBytes());
		return repository.save(x);
	}

	/**
	 * @param id de la publicación
	 */
	@DeleteMapping("/publicaciones/{id}")
	public void Delete( @PathVariable Long id ){
		
		
		if( repository.existsById( id )){
			Publicacion publicacion = repository.findById(id).get();
			Long idChef = publicacion.getChef().getId();
			repository.delete( publicacion );
			Chef chef = servicioChef.findById( idChef );
			chef.setNumeroPublicaciones( chef.getNumeroPublicaciones()-1 );
			repositoryChef.save( chef );
		}
		else{
			// TODO : Lanzar error 
		}
	}
}
