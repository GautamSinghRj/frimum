package com.musicapp.music_backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AuthenticationController {

	@Autowired
	private AuthenticationManager authenticationManager;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private JwtUtil jwtUtil;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest){
		try {
			Authentication authentication= authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							loginRequest.getUsername(),
							loginRequest.getPassword()));
			UserDetails userDetails =userDetailsService.loadUserByUsername(loginRequest.getUsername());
			String jwt=jwtUtil.generateToken(userDetails);
			return ResponseEntity.ok(new LoginResponse(jwt,userDetails.getUsername(),"Login Succesful"));
		}
		catch(Exception e){
		return ResponseEntity.badRequest().body("Login Failed"+e.getMessage());
		}
	}
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest){
		try {
			if(userService.existsByUsername(registerRequest.getUsername())) {
				return ResponseEntity.badRequest().body("Username already exists");
			}
			if(userService.existsByEmail(registerRequest.getEmail())) {
				return ResponseEntity.badRequest().body("Email already exists");
			}
			userService.createUsers(registerRequest);
			
			UserDetails userDetails= userDetailsService.loadUserByUsername(registerRequest.getUsername());
			String jwt = jwtUtil.generateToken(userDetails);
			return ResponseEntity.ok(new LoginResponse(jwt,userDetails.getUsername(),"Registration Successful"));
		}
		catch(Exception e) {
			return ResponseEntity.badRequest().body("Registration Failed"+e.getMessage());
		}
	}
	
	@GetMapping("/validate")
	public ResponseEntity<?> validate(@RequestHeader("Authorization") String authHeader){
		try {
			String token=authHeader.substring(7);
			String username=jwtUtil.extractUsername(token);
			UserDetails userDetails=userDetailsService.loadUserByUsername(username);
			
			if(jwtUtil.validateToken(token, userDetails)) {
			return ResponseEntity.ok("Token is valid");}
			else {
			return ResponseEntity.ok("Invalid Token");}
		}
		catch(Exception e) {
		return ResponseEntity.badRequest().body("Invalid Token");
		}
		
	}
}
