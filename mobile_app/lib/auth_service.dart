import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:flutter_secure_storage/flutter_secure_storage.dart';
import 'package:http/http.dart' as http;
import 'package:jwt_decoder/jwt_decoder.dart';
import 'package:go_router/go_router.dart';

class AuthService {
  static const _authStorage = FlutterSecureStorage();
  static const _baseUrl = "https://school.amanilightequity.com/api";

  static Future<void> saveTokens(
    String access,
    String refresh,
    String role,
    String userId,
  ) async {
    await _authStorage.write(key: "access", value: access);
    await _authStorage.write(key: "refresh", value: refresh);
    await _authStorage.write(key: "role", value: role);
    await _authStorage.write(key: "user_id", value: userId);
  }

  static Future<String?> getAccessToken() => _authStorage.read(key: "access");
  static Future<String?> getRefreshToken() => _authStorage.read(key: "refresh");
  static Future<String?> getRole() => _authStorage.read(key: "role");
  static Future<String?> getUserId() => _authStorage.read(key: "user_id");

  static Future<String> logout() async {
    await _authStorage.deleteAll();
    return 'success';
  }

  static Future<String> login(String username, String password) async {
    try {
      final response = await http.post(
        Uri.parse("https://school.amanilightequity.com/api/login/"),
        headers: {'Content-Type': 'application/json'},
        body: json.encode({"username": username, "password": password}),
      );

      if (response.statusCode == 200) {
        print("Status code: ${response.statusCode}");
        print("Raw response body: ${response.body}");

        final data = jsonDecode(response.body);
        await saveTokens(
          data["access"],
          data["refresh"],
          data["role"],
          data["user_id"],
        );
        print("Login successful: ${data["user_id"]}");
        return 'success';
      } else {
        await logout();
        final errorData = jsonDecode(response.body);
        final errorMessages = errorData.values.join(", ");
        print("Login failed: ${response.statusCode}");
        print("Response body: ${response.body}");

        return errorMessages;
      }
    } catch (e, stackTrace) {
      print('Unexpected error occurred: $e');
      print('Stack trace: $stackTrace');
      return 'Unexpected error occurred';
    }
  }

  static Future<String?> refreshAccessToken() async {
    final refresh = await getRefreshToken();
    if (refresh == null) return null;

    try {
      final response = await http.post(
        Uri.parse("$_baseUrl/token/refresh/"),
        body: {"refresh": refresh},
      );

      if (response.statusCode == 200) {
        final data = jsonDecode(response.body);
        await _authStorage.write(key: "access", value: data["access"]);
        await _authStorage.write(key: "refresh", value: data["refresh"]);
        await _authStorage.write(key: "role", value: data["role"]);
        await _authStorage.write(key: "user_id", value: data["user_id"]);
        print('token refresh');
        return data["access"];
      } else {
        final errorData = jsonDecode(response.body);
        final errorMessages = errorData.values.join(", ");
        print("Login failed: ${response.statusCode}");
        print("Response body: ${response.body}");

        return errorMessages;
      }
    } catch (e) {
      return 'Unexpected error occurred';
    }
  }

  static Future<Map<String, dynamic>?> decodeAccessToken() async {
    final token = await getAccessToken();
    if (token == null) return null;

    try {
      final decoded = JwtDecoder.decode(token);
      return decoded;
    } catch (e) {
      print("⚠️ Invalid token: $e");
      return null;
    }
  }

  static Future<bool> isTokenExpired() async {
    final token = await getAccessToken();
    if (token == null) return true;
    return JwtDecoder.isExpired(token);
  }

  static Future<bool> isTokenAboutToExpire() async {
    Duration threshold = const Duration(minutes: 5);
    final token = await getAccessToken();

    if (token == null) return true;

    final expirationDate = JwtDecoder.getExpirationDate(token);
    final currentTime = DateTime.now();
    final remainingTime = expirationDate.difference(currentTime);

    return remainingTime < threshold;
  }

  static Future<void> revalidateToken() async {
    final isExpiring = await isTokenAboutToExpire();
    if (isExpiring) {
      await refreshAccessToken();
    }
  }


  static Future<void> logoutScreen(BuildContext context) async{
    final repsonse = await AuthService.logout();

    if(repsonse == 'success'){
      context.go('/login');
    }
    
  }
  
}
