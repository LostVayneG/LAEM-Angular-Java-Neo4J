package com.relvax.laem.server.security;

import com.relvax.laem.server.model.Chef;
import com.relvax.laem.server.model.User;
import com.relvax.laem.server.service.ChefService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
public class RESTUserDetailsService implements UserDetailsService {

	@Autowired
	ChefService chefService;

	public RESTUserDetailsService() {
		super();

	}
	
	@Override
	public User loadUserByUsername(String username) throws UsernameNotFoundException {
		// En este método se recupera la información de la BD
		System.out.println("*** Retrieving user");
		Chef chef = chefService.findByNick(username);
		// TODO Aqui se debería calcular el hash de la contraseña
		return new User( chef.getNickname(), chef.getContrasenia(), "ROLE_CHEF");
	}	

}
