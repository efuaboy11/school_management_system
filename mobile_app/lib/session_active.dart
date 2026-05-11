import 'dart:convert';
import 'dart:io';
import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:http/http.dart' as http;

class SessionActive {
  /// This function checks if a given [http.Response] indicates an expired or invalid token.
  /// If it does, it shows a dialog and returns false.
  static Future<bool> handleSession(BuildContext context, http.Response response) async {
    try {
      if (response.statusCode == 401 || response.statusCode == 403) {
        final body = jsonDecode(response.body);

        // Check if it's a token validity issue
        if (body["code"] == "token_not_valid" ||
            body["detail"] == "Given token not valid for any token type") {
          // Show platform dialog
          _showPlatformDialog(context);
          return false; // session invalid
        }
      }
    } catch (e) {
      print("Error checking session: $e");
    }
    return true; // session still valid
  }

  /// Platform-aware alert dialog
  static void _showPlatformDialog(BuildContext context) {
    if (Platform.isIOS) {
      showCupertinoDialog(
        context: context,
        builder: (context) {
          return CupertinoAlertDialog(
            title: const Text('Session Expired'),
            content: const Text('Please sign out and try signing in again.'),
            actions: [
              CupertinoDialogAction(
                child: const Text('OK'),
                onPressed: () {
                  Navigator.of(context).pop(); // close dialog
                  context.go('/login'); // redirect
                },
              ),
            ],
          );
        },
      );
    } else {
      showDialog(
        context: context,
        builder: (context) {
          return AlertDialog(
            title: const Text('Session Expired'),
            content: const Text('Please sign out and try signing in again.'),
            actions: [
              TextButton(
                child: const Text('OK'),
                onPressed: () {
                  Navigator.of(context).pop(); // close dialog
                  context.go('/login'); // redirect
                },
              ),
            ],
          );
        },
      );
    }
  }
}
