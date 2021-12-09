package com.relvax.laem.server.security;

import com.relvax.laem.server.model.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;


@Component
public class RESTAuthenticationProvider implements AuthenticationProvider {
	private Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Autowired
	private RESTUserDetailsService userDetailsService;
	

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String name = authentication.getName();
		String password = authentication.getCredentials().toString();

		logger.info("Name = " + name + " ,Password = " + password);

		User user = userDetailsService.loadUserByUsername(name);
		System.out.println( "Contraseña BD " + user.getPassword() );

		if (user != null && encoder().matches(password, user.getPassword() ) ) {
			logger.info("Succesful authentication!");
			return new UsernamePasswordAuthenticationToken(user, user.getPassword(), user.getAuthorities());
		} else {
			logger.info("Login fail!");
			return null;
		}
	}
	
	@Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
	}


	@Override
	public boolean supports(Class<?> authentication) {
		return authentication.equals(UsernamePasswordAuthenticationToken.class);
	}

}
