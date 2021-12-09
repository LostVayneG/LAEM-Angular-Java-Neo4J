package com.relvax.laem.server.service;

import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

import com.relvax.laem.server.exceptions.NotFoundException;
import com.relvax.laem.server.model.Chef;
import com.relvax.laem.server.model.Publicacion;
import com.relvax.laem.server.repository.ChefRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import com.relvax.laem.server.security.RESTUserDetailsService;

@RestController()
@CrossOrigin("*")
public class ChefService {

	@Autowired
	RESTUserDetailsService userService;

	@Autowired
	ChefRepository repository;

	@Autowired
	PublicacionService publicacionService;

	/**
	 * @param chef a crear
	 * @return chef creado
	 */
	@PostMapping("/register")
	public Chef create(@RequestBody Chef chef) {
		//TODO: process POST request
		System.out.println("Registrando usuario");
		chef.setContrasenia( encoderRegister().encode( chef.getContrasenia() ) );
		if( findByNick( chef.getNickname() ) == null ){
			
			chef.setRango("Novato");
			chef.setNumeroPublicaciones(0);
			chef.setValoracion((double)0);
			chef.setNumeroSeguidores(0);
			chef.setNumeroSeguidos(0);
			return repository.save(chef);
		}
		else{
			throw new NotFoundException("Ya existe un chef con el mismo nickname");
		}
	}

	@Bean
    public PasswordEncoder encoderRegister() {
        return new BCryptPasswordEncoder();
	}
	
	/**
	 * @param id del chef
	 * @return chef con id = id
	 */
	@GetMapping("/chefs/{id}")
	public Chef findById(@PathVariable Long id){
		return repository.findById(id).get();
	}

	/**
	 * @param id del chef
	 * @return publicaciones del chef con id = id
	 */
	@GetMapping("/chefs/{id}/publicaciones")
	public Iterable<Publicacion> findPublicaciones( @PathVariable Long id){
		return repository.findById(id).get().getPublicaciones();
	}

	/**
	 * @param id del chef
	 * @return publicaciones favoritas del chef con id = id
	 */
	@GetMapping("/chefs/{id}/favoritos")
	public Iterable<Publicacion> findFavoritos( @PathVariable Long id){
		List<Publicacion> lista = repository.findById(id).get().getFavoritos();
		List<Publicacion> favoritos = new ArrayList<>();
		for( Publicacion p: lista){
			favoritos.add(  publicacionService.findById( p.getId() ) );
		}
		
		return favoritos;
	}

	/**
	 * @param idChef del chef
	 * @param idPublicacion de la publicacion
	 * @return el chef actualizado
	 */
	@GetMapping("/chefs/{idChef}/favoritos/{idPublicacion}")
	public Chef agregarFavoritos( @PathVariable Long idChef,@PathVariable Long idPublicacion){
		return repository.agregarPublicacionFavoritos(idChef, idPublicacion);
	}

	/**
	 * @param idChef del chef
	 * @param idPublicacion de la publicacion
	 * @return el chef actualizado
	 */
	@GetMapping("/chefs/{idChef}/Eliminarfavoritos/{idPublicacion}")
	public Chef eliminarFavoritos( @PathVariable Long idChef,@PathVariable Long idPublicacion){
		return repository.eliminarPublicacionFavoritos(idChef, idPublicacion);
	}

	/**
	 * @param nickname del chef
	 * @return chef con nickname = nickname
	 */
	@GetMapping("/chefs/logged/{nickname}")
	public Chef findByNick(@PathVariable String nickname){
		return repository.findByNick(nickname);
	}

	/**
	 * @param chef con cambios
	 * @return chef editado
	 */
	@PutMapping("/chefs")
	public Chef update(@RequestBody Chef chef ){
		
		Chef chefEditar = findById(chef.getId());
		
		if( chef != null && encoderRegister().matches(chef.getContrasenia(), chefEditar.getContrasenia() )){
			
			chefEditar.setNombre(chef.getNombre());
			chefEditar.setCelular(chef.getCelular());
			chefEditar.setRango(chef.getRango());
			//chefEditar.setContrasenia(chef.getContrasenia());
			chefEditar.setGenero(chef.getGenero());
			chefEditar.setValoracion(chef.getValoracion());
			return repository.save(chefEditar);
		}else{
			throw new NotFoundException("Ingreso contraseña incorrecta");
		}
	}

	/**
	 * @param idSeguido del chef seguido
	 * @param idSeguidor del chef seguidor
	 * @return chef seguido
	 */
	@GetMapping("/chefs/{idSeguido}/{idSeguidor}")
	public Chef addSeguidor(@PathVariable Long idSeguido, @PathVariable Long idSeguidor){
		Chef chefSeguido = findById(idSeguido);
		Chef chefSeguidor = findById(idSeguidor);
		if( chefSeguido != null && chefSeguidor != null){
			if(idSeguido != idSeguidor){
				chefSeguidor.setNumeroSeguidos(chefSeguidor.getNumeroSeguidos()+1);
				List<Chef> seguidos = chefSeguidor.getSeguidos();
				if(seguidos != null){
					seguidos.add(chefSeguido);
				} else {
					seguidos = new ArrayList<Chef>();
					seguidos.add(chefSeguido);
				}
				chefSeguidor.setSeguidos(seguidos);
				repository.save(chefSeguidor);
				//repository.addSeguido(chefSeguidor.getId(), chefSeguido.getId());

				chefSeguido.setNumeroSeguidores(chefSeguido.getNumeroSeguidores()+1);
				List<Chef> seguidores = chefSeguido.getSeguidores();
				if(seguidores != null){
					seguidores.add(chefSeguidor);
				} else {
					seguidores = new ArrayList<Chef>();
					seguidores.add(chefSeguidor);
				}
				chefSeguido.setSeguidores(seguidores);
				return repository.save(chefSeguido);
				//repository.addSeguidor(chefSeguidor.getId(), chefSeguido.getId());
			} else {
				throw new NotFoundException("Un chef no se puede seguir a si mismo");
			}
		} else {
			throw new NotFoundException("No fue posible encontrar el chef solicitado");
		}
	}

	/**
	 * @param idSeguido del chef seguido
	 * @param idSeguidor del chef seguidor
	 * @return chef seguido
	 */
	@DeleteMapping("/chefs/{idSeguido}/{idSeguidor}")
	public Chef deleteSeguidor(@PathVariable Long idSeguido, @PathVariable Long idSeguidor){
		Chef chefSeguido = findById(idSeguido);
		Chef chefSeguidor = findById(idSeguidor);
		if( chefSeguido != null && chefSeguidor != null){
			if(idSeguido != idSeguidor){
				chefSeguidor.setNumeroSeguidos(chefSeguidor.getNumeroSeguidos()-1);
				List<Chef> seguidos = chefSeguidor.getSeguidos();
				seguidos.remove(chefSeguido);
				chefSeguidor.setSeguidos(seguidos);
				repository.save(chefSeguidor);
				//repository.deleteSeguido(chefSeguidor.getId(), chefSeguido.getId());

				chefSeguido.setNumeroSeguidores(chefSeguido.getNumeroSeguidores()-1);
				List<Chef> seguidores = chefSeguido.getSeguidores();
				seguidores.remove(chefSeguidor);
				chefSeguido.setSeguidores(seguidores);
				return repository.save(chefSeguido);
				//repository.deleteSeguidor(chefSeguidor.getId(), chefSeguido.getId());
			} else {
				throw new NotFoundException("Un chef no se puede seguir a si mismo");
			}
		} else {
			throw new NotFoundException("No fue posible encontrar el chef solicitado");
		}
	}

	/**
	 * @param id del chef en sesión
	 * @return ultimas 20 publicaciones de los chefs seguidos
	 */
	@GetMapping("/chefs/{id}/mischefs")
	public Iterable<Publicacion> findPublicacionesSeguidos(@PathVariable Long id){
		List<Publicacion> publicaciones = repository.encontarPublicacionesSeguidos(id);
		List<Publicacion> publicacionesSeguidos = new ArrayList<Publicacion>();
		for( Publicacion p: publicaciones){
			publicacionesSeguidos.add( this.publicacionService.findById( p.getId() ) );
		}
		return publicacionesSeguidos;
		
		/* CASO DE ESTUDIO --- NO BORAR
		if(chef != null){
			List<Chef> seguidos = new ArrayList<Chef>();
			seguidos = chef.getSeguidos();
			if(seguidos != null){
				List<Publicacion> publicacionesSeguidos = new ArrayList<Publicacion>();
				List<Publicacion> publicacionesMisChef = new ArrayList<Publicacion>();
				for (Chef actual : seguidos) {
					List<Publicacion> actuales = findById( actual.getId() ).getPublicaciones();				
					if(actuales != null){
						for (Publicacion publicacion : actuales) {
							publicacionesSeguidos.add(publicacion);
						}
					}
				}
				return publicacionesSeguidos;
				
				System.out.println("Entro al for");
				for (Publicacion publicacioni : publicacionesSeguidos) {
					System.out.println("Publicacion ->"  + publicacioni.toString());
					for (Publicacion publicacionj : publicacionesSeguidos) {
						if(publicacioni.getFecha().isBefore(publicacionj.getFecha())){
							Publicacion auxiliar = publicacioni;
							publicacioni = publicacionj;
							publicacionj = auxiliar;
						}
					}
				}
				if(publicacionesSeguidos.size() > 20){
					for (int i = 0; i < 20; i++) {
						publicacionesMisChef.set(i, publicacionesSeguidos.get(i));
					}
				} else {
					for (Publicacion publicacion : publicacionesSeguidos) {
						publicacionesMisChef.add(publicacion);
					}
				}
				return publicacionesMisChef;
				

			} else {
				throw new NotFoundException("El usuario no sigue a ningún usuario");
			}
		} else {
			throw new NotFoundException("No fue posible encontrar el chef solicitado");
		}*/
	}

	@GetMapping("/chefs/verificar/{idSeguido}/{idSeguidor}")
	public boolean verificarSeguido(@PathVariable Long idSeguido, @PathVariable Long idSeguidor){
		Chef c = findById(idSeguidor);
		if( c.getSeguidos() != null)
			return c.getSeguidos().contains( findById(idSeguido) );
		else 
			return false;
	}

	/*@DeleteMapping("/chefs")
	public void Delete(@RequestBody Chef chef){
		if( repository.existsById( chef.getId() )){
			repository.delete(chef);
		}
		else{
			// TODO : Lanzar error 
		}
	}*/

	

}
