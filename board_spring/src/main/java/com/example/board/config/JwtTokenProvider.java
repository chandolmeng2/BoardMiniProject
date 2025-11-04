package com.example.board.config;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.example.board.user.domain.User;

import io.jsonwebtoken.security.Keys;
import javax.annotation.PostConstruct;
import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;

@Component
public class JwtTokenProvider {

	@Value("${jwt.secret}")
	private String secretKeyString;

	private final User user = new User();

	private SecretKey secretKey;

	@PostConstruct
	protected void init() {
		secretKey = Keys.hmacShaKeyFor(secretKeyString.getBytes(StandardCharsets.UTF_8));
	}

	private long validityInMilliseconds = 3600000;

	public String createToken(String username, Long userId) {
		System.out.println("토큰 생성 - username: " + username + ", userId: " + userId); // 로그 추가

		Claims claims = Jwts.claims().setSubject(username);
		claims.put("userId", userId);

		Date now = new Date();
		Date validity = new Date(now.getTime() + validityInMilliseconds);

		return Jwts.builder().setClaims(claims).setIssuedAt(now).setExpiration(validity)
				.signWith(secretKey, SignatureAlgorithm.HS256).compact();
	}

	public String getUsername(String token) {
		return Jwts.parserBuilder().setSigningKey(secretKey) // 변경된 부분
				.build().parseClaimsJws(token).getBody().getSubject();
	}

	public boolean validateToken(String token) {
		try {
			Jws<Claims> claims = Jwts.parserBuilder().setSigningKey(secretKey) // 변경된 부분
					.build().parseClaimsJws(token);
			return !claims.getBody().getExpiration().before(new Date());
		} catch (JwtException | IllegalArgumentException e) {
			return false;
		}
	}
}
