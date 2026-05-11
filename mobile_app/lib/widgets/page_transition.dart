

import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';

Widget platformPageTransitionBuilder(
  BuildContext context,
  Animation<double> animation,
  Animation<double> secondaryAnimation,
  Widget child,
) {
  if (Theme.of(context).platform == TargetPlatform.iOS) {
    return CupertinoPageTransition(
      primaryRouteAnimation: animation,
      secondaryRouteAnimation: secondaryAnimation,      
      linearTransition: true,
      child: child,
    );
  } else {
    return FadeTransition(
      opacity: animation,
      child: child,
    );
  }
}
