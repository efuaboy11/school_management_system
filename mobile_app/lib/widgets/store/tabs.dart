import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/screens/store/products/all_product.dart';

class StoreTab extends StatelessWidget {
  const StoreTab({super.key});

  @override
  Widget build(BuildContext context) {
    final String location = GoRouterState.of(context).uri.toString();

    int currentIndex = 0;
    if (location.startsWith('/store/home')) currentIndex = 0;
    if (location.startsWith('/store/product')) currentIndex = 1;
    if (location.startsWith('/store/favourite')) currentIndex = 2;
    if (location.startsWith('/store/orders')) currentIndex = 3;

    return BottomNavigationBar(
      type: BottomNavigationBarType.fixed,
      currentIndex: currentIndex,
      onTap: (index) {
        switch (index) {
          case 0:
            context.go('/store/home');
            break;
          case 1:
            Navigator.of(context).push(
              MaterialPageRoute(builder: (context) => AllProductScreen()),
            );
            break;
          case 2:
            context.push('/store/favourite');
            break;
          case 3:
            context.push('/store/orders');
            break;
        }
      },
      items: const [
        BottomNavigationBarItem(
          icon: Icon(Icons.dashboard),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.store),
          label: 'Shooping',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.favorite),
          label: 'Favourite',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.bar_chart),
          label: 'Orders',
        ),
      ],
    );
  }
}
