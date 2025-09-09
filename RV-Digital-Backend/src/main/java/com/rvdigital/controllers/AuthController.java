package com.rvdigital.controllers;

import com.rvdigital.dto.MessageResponse;
import com.rvdigital.dto.auth.JwtResponse;
import com.rvdigital.dto.auth.LoginRequest;
import com.rvdigital.dto.auth.RegisterRequest;
import com.rvdigital.entities.Profile;
import com.rvdigital.entities.User;
import com.rvdigital.repositories.ProfileRepository;
import com.rvdigital.repositories.UserRepository;
import com.rvdigital.security.JwtService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    
    @Autowired
    AuthenticationManager authenticationManager;
    
    @Autowired
    UserRepository userRepository;
    
    @Autowired
    ProfileRepository profileRepository;
    
    @Autowired
    PasswordEncoder encoder;
    
    @Autowired
    JwtService jwtService;
    
    @PostMapping("/signin")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));
        
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtService.generateToken((User) authentication.getPrincipal());
        
        User user = (User) authentication.getPrincipal();
        Profile profile = profileRepository.findByUserId(user.getId()).orElse(null);
        
        return ResponseEntity.ok(new JwtResponse(jwt,
                user.getEmail(),
                profile != null ? profile.getNome() : "",
                profile != null ? profile.getRole() : "USER"));
    }
    
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequest signUpRequest) {
        if (userRepository.existsByEmail(signUpRequest.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body(new MessageResponse("Erro: Email já está em uso!"));
        }
        
        // Criar nova conta de usuário
        User user = new User();
        user.setEmail(signUpRequest.getEmail());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));
        
        userRepository.save(user);
        
        // Criar perfil do usuário
        Profile profile = new Profile();
        profile.setUser(user);
        profile.setNome(signUpRequest.getNome());
        profile.setRole("USER");
        
        profileRepository.save(profile);
        
        return ResponseEntity.ok(new MessageResponse("Usuário registrado com sucesso!"));
    }
}