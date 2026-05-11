import 'dart:ui';
import 'package:flutter/material.dart';

class LiquidDisplay extends StatelessWidget {
  final Widget? child;
  final EdgeInsetsGeometry? padding;
  final BorderRadiusGeometry? borderRadius;
  final double ? height;
  final double ? width;
  const LiquidDisplay({
    super.key, 
    this.child,
    this.padding,
    this.borderRadius,
    this.height,
    this.width,
  });

  @override
  Widget build(BuildContext context) {
    final isDark = Theme.of(context).brightness == Brightness.dark;

    // Colors adapt to background brightness
    final gradientColors = isDark
        ? [
            Colors.white.withValues(alpha:0.25),
            Colors.white.withValues(alpha:0.05),
          ]
        : [
            Colors.black.withValues(alpha:0.08),
            Colors.black.withValues(alpha:0.03),
          ];

    final borderColor = isDark
        ? Colors.white.withValues(alpha:0.25)
        : Colors.black.withValues(alpha:0.1);

    return ClipRRect(
      child: BackdropFilter(
        filter: ImageFilter.blur(sigmaX: 10, sigmaY: 10),
        child: Container(
          width: width,
          height: height,
          padding: padding ?? const EdgeInsets.all(10),
          decoration: BoxDecoration(
            gradient: LinearGradient(
              colors: gradientColors,
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
            ),
            border: Border.all(color: borderColor, width: 1.2),
            
            borderRadius: borderRadius ?? BorderRadius.circular(12),
          
          ),
          child: child,
        ),
      ),
    );
  }
}
