package com.mealapp.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    // ── Validation errors (@Valid) ────────────────────────────────────────────
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, Object>> handleValidationErrors(
            MethodArgumentNotValidException ex) {

        Map<String, String> fieldErrors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String field = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            fieldErrors.put(field, message);
        });

        return buildResponse(HttpStatus.BAD_REQUEST, "Dữ liệu không hợp lệ", fieldErrors);
    }

    // ── Business logic RuntimeExceptions ─────────────────────────────────────
    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<Map<String, Object>> handleRuntimeException(RuntimeException ex) {
        String message = ex.getMessage() != null ? ex.getMessage() : "Lỗi không xác định";

        HttpStatus status = resolveStatus(message);
        return buildResponse(status, message, null);
    }

    // ── Access Denied (403) ───────────────────────────────────────────────────
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<Map<String, Object>> handleAccessDenied(AccessDeniedException ex) {
        return buildResponse(HttpStatus.FORBIDDEN, "Bạn không có quyền truy cập", null);
    }

    // ── Catch-all (500) ───────────────────────────────────────────────────────
    @ExceptionHandler(Exception.class)
    public ResponseEntity<Map<String, Object>> handleGenericException(Exception ex) {
        return buildResponse(HttpStatus.INTERNAL_SERVER_ERROR,
                "Lỗi hệ thống. Vui lòng thử lại sau.", null);
    }

    // ── Helpers ───────────────────────────────────────────────────────────────

    /**
     * Map error message keywords → HTTP status code.
     */
    private HttpStatus resolveStatus(String message) {
        String lower = message.toLowerCase();

        if (lower.contains("not found") || lower.contains("không tìm thấy")) {
            return HttpStatus.NOT_FOUND;
        }
        if (lower.contains("invalid password") || lower.contains("incorrect password")
                || lower.contains("sai mật khẩu") || lower.contains("unauthorized")) {
            return HttpStatus.UNAUTHORIZED;
        }
        if (lower.contains("already exists") || lower.contains("đã tồn tại")) {
            return HttpStatus.CONFLICT;
        }
        if (lower.contains("forbidden") || lower.contains("không có quyền")) {
            return HttpStatus.FORBIDDEN;
        }
        return HttpStatus.BAD_REQUEST;
    }

    private ResponseEntity<Map<String, Object>> buildResponse(
            HttpStatus status, String message, Object details) {

        Map<String, Object> body = new HashMap<>();
        body.put("timestamp", LocalDateTime.now().toString());
        body.put("status", status.value());
        body.put("error", status.getReasonPhrase());
        body.put("message", message);
        if (details != null) {
            body.put("details", details);
        }
        return ResponseEntity.status(status).body(body);
    }
}
