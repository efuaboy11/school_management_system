import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:mobile_app/theme.dart';
import 'routes/routes.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';





void main() async {
  WidgetsFlutterBinding.ensureInitialized();


  // Initialize Paystack with your public key

  // Lock orientation to portrait only
  await SystemChrome.setPreferredOrientations([
    DeviceOrientation.portraitUp,
    DeviceOrientation.portraitDown,
  ]);

  runApp(const ProviderScope(child: MyApp()));
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});
  

  @override
  Widget build(BuildContext context) {
    // Seed colors
    const primarySeed = Color(0xFF783EBC);
    const secondarySeed = Color(0xFF414ACA);
    const tertiarySeed = Color(0xFF268EC0);

    const lightSuccessful = Color.fromRGBO(30, 58, 47, 1.0);
    const lightPending = Colors.yellow;
    const lightDeclined = Colors.red;

    const darkSuccessful = Color.fromRGBO(30, 58, 47, 1.0);
    const darkPending = Color.fromRGBO(58, 51, 0, 1.0);
    const darkDeclined = Color.fromRGBO(58, 31, 31, 1.0);


    final baseTextTheme = GoogleFonts.interTextTheme().copyWith(
  bodyLarge: GoogleFonts.inter(fontWeight: FontWeight.w500),
  bodyMedium: GoogleFonts.inter(fontWeight: FontWeight.w500),
  bodySmall: GoogleFonts.inter(fontWeight: FontWeight.w500),
  titleLarge: GoogleFonts.inter(fontWeight: FontWeight.w500),
  titleMedium: GoogleFonts.inter(fontWeight: FontWeight.w500),
  titleSmall: GoogleFonts.inter(fontWeight: FontWeight.w500),
  labelLarge: GoogleFonts.inter(fontWeight: FontWeight.w500),
  labelMedium: GoogleFonts.inter(fontWeight: FontWeight.w500),
  labelSmall: GoogleFonts.inter(fontWeight: FontWeight.w500),
);// global font

    return MaterialApp.router(
      debugShowCheckedModeBanner: false,
      routerConfig: appRouter,
      title: 'School Management System',
      themeMode: ThemeMode.system, // Follows system theme (default light)
      theme: ThemeData(
        useMaterial3: true,
        extensions: <ThemeExtension<dynamic>>[
          const CustomColors(
            successful: lightSuccessful,
            pending: lightPending,
            declined: lightDeclined,
            lightBorder: Color.fromRGBO(204, 204, 204, 1.0),
            lightText: Color.fromRGBO(115, 123, 125, 1),
            lightBg: Color.fromRGBO(240, 240, 240, 1.0)
          )
        ],
        colorScheme: ColorScheme.fromSeed(
          seedColor: primarySeed,
          primary: primarySeed,
          secondary: secondarySeed,
          tertiary: tertiarySeed,
          brightness: Brightness.light,
        ),
        textTheme: baseTextTheme.apply(
          bodyColor: Colors.black,
          displayColor: Colors.black,
        ),
      ),
      darkTheme: ThemeData(
        useMaterial3: true,
        extensions: <ThemeExtension<dynamic>>[
          
          const CustomColors(
            successful: darkSuccessful,
            pending: darkPending,
            declined: darkDeclined,
            lightBorder: Color.fromRGBO(51, 51, 51, 1.0),
            lightText: Color.fromRGBO(160, 160, 160, 1),
            lightBg: Color(0xFF1C1C1E)
          )
        ],
        colorScheme: ColorScheme.fromSeed(
          seedColor: primarySeed,
          primary: primarySeed,
          secondary: secondarySeed,
          tertiary: tertiarySeed,
          brightness: Brightness.dark,
        ),
        textTheme: baseTextTheme.apply(
          bodyColor: Colors.white,
          displayColor: Colors.white,
        ),
      ),
      
    );
  }
}

