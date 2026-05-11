
import 'package:flutter/material.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_manager.dart';

class SplashScreen  extends StatefulWidget{
  const SplashScreen({super.key});

  @override
  State<SplashScreen> createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> {

  late AuthManager _authManager;

  @override
  void initState() {
    super.initState();

    _checkAuthStatus();
    // Delay init until context is available
    WidgetsBinding.instance.addPostFrameCallback((_) {
      _authManager = AuthManager(context);
    });
  }

  @override
  void dispose() {
    _authManager.dispose();
    super.dispose();
  }

  Future<void> _checkAuthStatus() async {
    await Future.delayed(const Duration(seconds: 2)); // splash delay

    final access = await AuthService.getAccessToken();
    final isExpired = await AuthService.isTokenExpired();
    final role = await AuthService.getRole();

    if (access == null || isExpired) {
      await AuthService.logout();
      if (mounted) context.go('/login');
      return;
    }

    if (role == "student") {
      if (mounted) context.go('/student/home');
    } else if (role == "teacher") {
      if (mounted) context.go('/teacher/dashboard');
    } else {
      if (mounted) context.go('/login');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Image.asset(
          'assets/image/loading.gif',
          width: 120,
          height: 120,
        ),
      ),
    );
  }
}