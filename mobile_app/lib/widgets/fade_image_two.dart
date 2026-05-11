import 'dart:async';
import 'package:flutter/material.dart';

class FadeCarouselTwo extends StatefulWidget {
  const FadeCarouselTwo({super.key,
    required this.duration,
    required this.images  
  });
  final int duration;

  final List<dynamic> images;

  @override
  State<FadeCarouselTwo> createState() => _FadeCarouselTwoState();
}

class _FadeCarouselTwoState extends State<FadeCarouselTwo> {
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
    return  SizedBox.expand(
    child: ClipRRect(
      child: AnimatedSwitcher(
        duration: const Duration(seconds: 1),
        child: Image.network(
          imgList[_currentIndex],
          key: ValueKey(imgList[_currentIndex]),
          fit: BoxFit.contain, // or BoxFit.fill
        ),
        transitionBuilder: (child, animation) =>
            FadeTransition(opacity: animation, child: child),
      ),
    ),
  );
  }
}
