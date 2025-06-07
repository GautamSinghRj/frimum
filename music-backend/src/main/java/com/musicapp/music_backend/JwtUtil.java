package com.musicapp.music_backend;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {
	
	@Value("${jwt.secret:MySecretKey}")
	private String secret;
	
	@Value("${jwt.expiration:86400000}")
	private Long expiration;
	
	public String generateToken(UserDetails userDetails) {
		Map<String,Object> claims=new HashMap<>();
		return createToken(claims,userDetails.getUsername());
	}

	private String createToken(Map<String, Object> claims, String subject) {
		return Jwts.builder()
					.setClaims(claims)
					.setSubject(subject)
					.setIssuedAt(new Date(System.currentTimeMillis()))
					.setExpiration(new Date(System.currentTimeMillis() + expiration))
					.signWith(getSignInkey(),SignatureAlgorithm.HS256)
					.compact();
	}

	private Key getSignInkey() {
		byte[] keyBytes =Decoders.BASE64.decode(secret);
		return Keys.hmacShaKeyFor(keyBytes);
	}
	
	public Boolean validateToken(String Token,UserDetails userDetails) {
		final String username =extractUsername(Token);
		return (username==userDetails.getUsername() && !isTokenExpired(Token));
		
	}

	private boolean isTokenExpired(String token) {
		return extractExpiration(token).before(new Date());
	}

	public Date extractExpiration(String token) {
		return extractClaim(token,Claims::getExpiration);
	}

	public String extractUsername(String token) {
		return extractClaim(token,Claims::getSubject);
	}

	private <T> T extractClaim(String token, Function<Claims,T> claimsResolver) {
		final Claims claims=extractAllClaims(token);
		return claimsResolver.apply(claims);
	}

	private Claims extractAllClaims(String token) {	
		return Jwts.parserBuilder()
					.setSigningKey(getSignInkey())
					.build()
					.parseClaimsJws(token)
					.getBody();
	}
}
