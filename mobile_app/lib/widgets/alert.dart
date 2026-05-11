import 'package:flutter/material.dart';

void showTopAlert(BuildContext context, String message,
    {Color background = Colors.redAccent}) {
  final overlay = Overlay.of(context);
  late OverlayEntry overlayEntry;

  overlayEntry = OverlayEntry(
    builder: (context) => _TopSlideAlert(
      message: message,
      background: background,
      onDismissed: () => overlayEntry.remove(),
    ),
  );

  overlay.insert(overlayEntry);
}

class _TopSlideAlert extends StatefulWidget {
  final String message;
  final Color background;
  final VoidCallback onDismissed;

  const _TopSlideAlert({
    required this.message,
    required this.background,
    required this.onDismissed,
  });

  @override
  State<_TopSlideAlert> createState() => _TopSlideAlertState();
}

class _TopSlideAlertState extends State<_TopSlideAlert>
    with SingleTickerProviderStateMixin {
  late AnimationController _controller;
  late Animation<Offset> _slideAnimation;

  @override
  void initState() {
    super.initState();

    _controller = AnimationController(
      vsync: this,
      duration: const Duration(milliseconds: 400),
    );

    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, -1), // start from above
      end: const Offset(0, 0), // slide down to visible area
    ).animate(CurvedAnimation(
      parent: _controller,
      curve: Curves.easeOut,
    ));

    _controller.forward(); // show alert

    Future.delayed(const Duration(seconds: 3), () async {
      await _controller.reverse(); // hide alert
      widget.onDismissed();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Positioned(
      top: MediaQuery.of(context).padding.top + 10,
      left: 10,
      right: 10,
      child: SlideTransition(
        position: _slideAnimation,
        child: Material(
          elevation: 8,
          borderRadius: BorderRadius.circular(10),
          color: widget.background,
          child: Padding(
            padding: const EdgeInsets.symmetric(vertical: 12, horizontal: 20),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                const Icon(Icons.info_outline, color: Colors.white),
                const SizedBox(width: 10),
                Expanded(
                  child: Text(
                    widget.message,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 16,
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }
}
