import 'dart:async';
import 'package:flutter/material.dart';

class FadeCarousel extends StatefulWidget {
  const FadeCarousel({super.key,
    required this.width,
    required this.height,
    required this.duration,
    required this.images

  
  });

  final double width;
  final double height;
  final int duration;

  final List<dynamic> images;

  @override
  State<FadeCarousel> createState() => _FadeCarouselState();
}

class _FadeCarouselState extends State<FadeCarousel> {
  int _currentIndex = 0;
  late Timer _timer;

  List<dynamic> get imgList => widget.images;

  @override
  void initState() {
    super.initState();
    // Automatically switch images every widget.duration seconds
    _timer = Timer.periodic(Duration(seconds: widget.duration), (timer) {
      if (!mounted) return;
      setState(() {
        _currentIndex = (_currentIndex + 1) % imgList.length;
      });
    });
  }

  @override
  void dispose() {
    _timer.cancel();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return  ClipRRect(
          child: AnimatedSwitcher(
            duration: const Duration(seconds: 1), // fade speed
            switchInCurve: Curves.easeIn,
            switchOutCurve: Curves.easeOut,
            child: Image.network(
              imgList[_currentIndex].image,
              key: ValueKey<String>(imgList[_currentIndex].id.toString()),
              width: widget.width,
              height: widget.height,
            ),
            transitionBuilder: (Widget child, Animation<double> animation) {
              return FadeTransition(opacity: animation, child: child);
            },
          ),
        );
  }
}
