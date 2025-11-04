package com.example.board.user.service;

import com.example.board.user.domain.User;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Collections;

public class UserPrincipal implements UserDetails {

	private final User user;

	public UserPrincipal(User user) {
		this.user = user;
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// 권한이 필요한 경우 구현. 여기서는 ROLE_USER로 단일 권한 처리 예제.
		return Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"));
	}

	@Override
	public String getPassword() {
		return user.getPassword();
	}

	@Override
	public String getUsername() {
		return user.getUsername();
	}

	@Override
	public boolean isAccountNonExpired() {
		return true; // 만료 기능 없으면 true
	}

	@Override
	public boolean isAccountNonLocked() {
		return true; // 잠김 기능 없으면 true
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true; // 자격증명 만료 기능 없으면 true
	}

	@Override
	public boolean isEnabled() {
		return user.isEnabled();
	}
}
