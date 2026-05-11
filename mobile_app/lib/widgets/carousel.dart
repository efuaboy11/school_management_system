import 'package:flutter/material.dart';
import 'package:carousel_slider/carousel_slider.dart';
import 'package:smooth_page_indicator/smooth_page_indicator.dart';

class CarouselWithDots extends StatefulWidget {
  const CarouselWithDots({super.key});
  
  @override
  _CarouselWithDotsState createState() => _CarouselWithDotsState();
}

class _CarouselWithDotsState extends State<CarouselWithDots> {
  int activeIndex = 0;
  final controller = CarouselSliderController();


  final List<String> imgList = [
    "assets/image/flyer1.jpg",
    "assets/image/flyer2.jpg",
    "assets/image/flyer3.jpg",
  ];

  @override
  Widget build(BuildContext context) {
    return  Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          CarouselSlider.builder(
            carouselController: controller,
            itemCount: imgList.length,
            itemBuilder: (context, index, realIndex) {
              return Image.asset(imgList[index], fit: BoxFit.cover, width: double.infinity);
            },
            options: CarouselOptions(
              height: 200,
              autoPlay: true,
              enlargeCenterPage: true,
              onPageChanged: (index, reason) => setState(() => activeIndex = index),
            ),
          ),
          const SizedBox(height: 12),
          AnimatedSmoothIndicator(
            activeIndex: activeIndex,
            count: imgList.length,
            effect: ExpandingDotsEffect( // you can change style
              dotHeight: 10,
              dotWidth: 10,
              activeDotColor: Theme.of(context).colorScheme.primary,
              dotColor: Colors.grey,
            ),
            onDotClicked: (index) => controller.animateToPage(index),
          ),
        ],
      );
  }
}
