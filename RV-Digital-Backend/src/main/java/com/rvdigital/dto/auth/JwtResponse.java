package com.rvdigital.dto.auth;

public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private String email;
    private String nome;
    private String role;
    
    public JwtResponse(String accessToken, String email, String nome, String role) {
        this.token = accessToken;
        this.email = email;
        this.nome = nome;
        this.role = role;
    }
    
    public String getAccessToken() { return token; }
    public void setAccessToken(String accessToken) { this.token = accessToken; }
    
    public String getTokenType() { return type; }
    public void setTokenType(String tokenType) { this.type = tokenType; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }
    
    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}