import 'package:flutter/material.dart';
import 'package:mobile_app/theme.dart';

class CustomContainer extends StatelessWidget {
  final Widget? child;
  final EdgeInsetsGeometry? padding;
  final BorderRadiusGeometry? borderRadius;
  final Border ? border;
  final Color ? color;
  final double ? height;
  final double ? width;

  const CustomContainer({
    super.key,
    this.child,
    this.padding,
    this.color,
    this.borderRadius,
    this.border,
    this.height,
    this.width
  });

  @override
  Widget build(BuildContext context) {
      final customColors = Theme.of(context).extension<CustomColors>()!;
    return Container(
      height: height,
      width: width,
      padding: padding ?? const EdgeInsets.all(10),
      decoration: BoxDecoration(
        color: color ?? customColors.lightBg,
        borderRadius: borderRadius ?? BorderRadius.circular(12),
        border: border 
      ),
      child: child,
    );
  }
}
