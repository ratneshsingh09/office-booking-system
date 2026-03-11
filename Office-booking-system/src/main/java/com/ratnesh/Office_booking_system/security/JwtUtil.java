package com.ratnesh.Office_booking_system.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET="ratnesh_super_secret_key_for_jwt_token";

    private static final Key key =
            Keys.hmacShaKeyFor(SECRET.getBytes());

    public static String generateToken(String username, String role){

        return Jwts.builder()
                .setSubject(username)
                .claim("role", role)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis()+86400000))
                .signWith(key)
                .compact();

    }
}