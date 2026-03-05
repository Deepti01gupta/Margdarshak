# Spring Boot JWT — What to implement

## Endpoints the frontend calls
| Method | URL | Auth | Request Body | Response |
|--------|-----|------|-------------|----------|
| POST | /api/auth/login | None | `{username, password}` | `{token, user:{id,name,email,role}}` |
| POST | /api/auth/register | None | `{name,email,password,role}` | `{message}` |
| GET | /api/auth/me | Bearer JWT | — | `{id,name,email,role}` |
| POST | /api/auth/logout | Bearer JWT | — | `{message}` |

## pom.xml dependencies
```xml
<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt-api</artifactId>
  <version>0.11.5</version>
</dependency>
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt-impl</artifactId>
  <version>0.11.5</version>
  <scope>runtime</scope>
</dependency>
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt-jackson</artifactId>
  <version>0.11.5</version>
  <scope>runtime</scope>
</dependency>
```

## application.properties
```properties
jwt.secret=YourVeryLong256BitSecretKeyHereMakeItAtLeast32Chars
jwt.expiration=86400000
spring.security.cors.allowed-origins=http://localhost:5173
```

## CORS Config (SecurityConfig.java)
```java
@Bean
CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration cfg = new CorsConfiguration();
    cfg.setAllowedOrigins(List.of("http://localhost:5173"));
    cfg.setAllowedMethods(List.of("GET","POST","PUT","DELETE","OPTIONS"));
    cfg.setAllowedHeaders(List.of("*"));
    cfg.setAllowCredentials(true);
    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", cfg);
    return source;
}
```

## Security chain (Spring Security 6)
```java
@Bean
SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    return http
        .csrf(AbstractHttpConfigurer::disable)
        .cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .sessionManagement(s -> s.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/api/auth/**").permitAll()
            .anyRequest().authenticated()
        )
        .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
        .build();
}
```

## JwtFilter.java
```java
String header = request.getHeader("Authorization");
if (header != null && header.startsWith("Bearer ")) {
    String token = header.substring(7);
    if (jwtUtil.validateToken(token)) {
        String email = jwtUtil.extractUsername(token);
        // Load UserDetails, set SecurityContextHolder
    }
}
```

## Role enum
```java
public enum Role { STUDENT, ALUMNI, ADMIN }
```

## Login response JSON
```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "user": { "id": 1, "name": "Rahul Sharma", "email": "rahul@college.edu", "role": "STUDENT" }
}
```
