package com.relvax.laem.server.service;

import org.springframework.web.bind.annotation.RestController;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

import com.relvax.laem.server.model.Chef;
import com.relvax.laem.server.model.Publicacion;
import com.relvax.laem.server.model.Valora;
import com.relvax.laem.server.repository.ChefRepository;
import com.relvax.laem.server.repository.PublicacionRepository;
import com.relvax.laem.server.repository.ValoracionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;

@RestController()
@CrossOrigin("*")
public class ValoracionService {

	@Autowired
	ValoracionRepository repository;
	@Autowired
	PublicacionService publicacionServicio;
	@Autowired
	ChefService chefServicio;
	@Autowired
	ChefRepository repositorioChef;
	@Autowired
	PublicacionRepository repositorioPublicacion;

	/**
	 * Método para crear una nueva valoración
	 * 
	 * @param valoracion
	 * @param idPublicacion
	 * @param idChef        identificador del chef que realizó la valoración
	 * @return Valoración creada
	 */
	@PostMapping("/valoracion/{idPublicacion}/{idChef}")
	public Valora createValoracion(@RequestBody Valora valoracion, @PathVariable Long idPublicacion,
			@PathVariable Long idChef) {
		Valora v = repository.encontrarValoracion(idPublicacion, idChef); 
		if( v != null){
			repository.delete( repository.findById( v.getId() ).get() );
		}
		valoracion.setChef(chefServicio.findById(idChef));
		Publicacion publicacionEditar = publicacionServicio.findById(idPublicacion);
		valoracion.setPublicacion(publicacionEditar);
		

		Valora valoracionChef = repository.save(valoracion);
		updatePublicacion(idPublicacion);
		updateChef(publicacionEditar.getChef().getId());
		return valoracionChef;
	}

	/**
	 * Método para actualizar una valoración existente
	 * 
	 * @param valoracion
	 * @param idPublicacion
	 * @param idChef        identificador del chef que realizó la valoración
	 * @return Valoración creada
	 */
	@PutMapping("/valoracion/{id}")
	public Valora updateValoracion(@RequestBody Valora valoracion, @PathVariable Long id) {
		Valora valoracionActualizada = repository.findById(id).get();
		valoracionActualizada.setCalificacion(valoracion.getCalificacion());
		return repository.save(valoracion);
	}

	/**
	 * Método para
	 * 
	 * @param valoracion
	 * @param idPublicacion
	 * @param idChef
	 * @return
	 */
	@GetMapping("/valoracion/{idPublicacion}/{idChef}")
	public Valora getValoracion(@PathVariable Long idPublicacion,
			@PathVariable Long idChef) {
		//Double v = repository.encontrarValoracion(idPublicacion, idChef); 
		Valora v = repository.encontrarValoracion(idPublicacion, idChef); 
		
		return repository.findById( v.getId() ).get();
	}

	public void updatePublicacion(Long idPublicacion){
		List<Valora> valoraciones = repository.getValoraciones(idPublicacion);
		double promedio = 0;
		for (Valora valoracion : valoraciones) {
			promedio += valoracion.getCalificacion();
		}
		promedio /= valoraciones.size();

		NumberFormat nf = NumberFormat.getNumberInstance(Locale.US);
		DecimalFormat formatter = (DecimalFormat) nf;
		formatter.applyPattern("#.##");
		promedio = Double.parseDouble( formatter.format( promedio ) );
		System.out.println(promedio);
		Publicacion p = publicacionServicio.findById(idPublicacion);
		p.setValoracion(promedio);
		repositorioPublicacion.save( p );
	}

	public void updateChef(Long idChef) {
		List<Publicacion> publicaciones = (List<Publicacion>)chefServicio.findPublicaciones(idChef);
		double promedio = 0;
		for (Publicacion publicacion : publicaciones) {
			promedio += publicacion.getValoracion();
		}
		promedio /= publicaciones.size();
		Chef chef = chefServicio.findById(idChef);
		chef.setValoracion(promedio);
		chef = actualizarRangoChef(chef);
		repositorioChef.save(chef);
	}

	public Chef actualizarRangoChef(Chef chef) {
		//Chef chef = chefServicio.findById(idChef);

		switch (chef.getRango()) {

			case "Novato":
				if (chef.getNumeroPublicaciones() > 3)
					chef.setRango("Profesional");
				break;
			// 100%
			case "Profesional":
				if (chef.getNumeroPublicaciones() > 5)
					chef.setRango("Veterano");
				break;
			// 90%

			case "Veterano":
				if (chef.getNumeroPublicaciones() > 6)
					chef.setRango("Maestro");

				break;
			// 50%
			case "Maestro":
				if (chef.getNumeroPublicaciones() > 7)
					chef.setRango("Gran Maestro");

				break;
			// 20%
			case "Gran Maestro":
				break;
			// 5%
		}

		return chef;
	}

	@GetMapping("/valoracion/top-recetas")
	public Iterable<Publicacion> getTopRecetas() {
		
		List <Publicacion> lista = repository.topRecetas();
		List <Publicacion> top = new ArrayList<>();
		for(int i=0; i<10 && i<lista.size(); i++){
			top.add( publicacionServicio.findById( lista.get(i).getId() ) );
		}

		return top;
	}

	@GetMapping("/valoracion/top-chefs")
	public Iterable<Chef> getTopchefs() {
		List <Chef> lista = repository.topChefs();
		List <Chef> top = new ArrayList<>();
		for(int i=0; i<10 && i<lista.size(); i++){
			top.add( chefServicio.findById( lista.get(i).getId() ) );
		}

		return top;
	}
}
