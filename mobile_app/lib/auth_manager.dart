import 'dart:async';
import 'package:flutter/material.dart';
import 'auth_service.dart';

class AuthManager with WidgetsBindingObserver {
  Timer? _tokenCheckTimer;
  BuildContext context;

  AuthManager(this.context) {
    WidgetsBinding.instance.addObserver(this);
    _startTokenMonitor();
  }

  void _startTokenMonitor() {
    _tokenCheckTimer = Timer.periodic(Duration(minutes: 9), (timer) async {
    final isExpired = await AuthService.isTokenExpired();
    final access = await AuthService.getAccessToken();

    if (isExpired || access == null ) {
      _tokenCheckTimer?.cancel(); // Stop checking
    }else{
      await AuthService.refreshAccessToken();
    }
    });
  }

  void restart() {
    _tokenCheckTimer?.cancel();
    _startTokenMonitor();
  }


  void dispose() {
    _tokenCheckTimer?.cancel();
    WidgetsBinding.instance.removeObserver(this);
  }

  // Optional: pause checking when app is in background
  @override
  void didChangeAppLifecycleState(AppLifecycleState state) {
    if (state == AppLifecycleState.paused || state == AppLifecycleState.inactive) {
      _tokenCheckTimer?.cancel();
    } else if (state == AppLifecycleState.resumed) {
      _startTokenMonitor();
    }
  }
}
