import 'package:flutter/material.dart';
import 'package:flutter/cupertino.dart';
import 'package:flutter/foundation.dart'; // for defaultTargetPlatform

class PlatformBackButton extends StatelessWidget {

  const PlatformBackButton({super.key});

  @override
  Widget build(BuildContext context) {
    final isIOS = defaultTargetPlatform == TargetPlatform.iOS;

    return Icon(
      isIOS ? CupertinoIcons.back : Icons.arrow_back,
    );
  }
}
