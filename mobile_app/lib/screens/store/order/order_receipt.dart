
import 'package:flutter/material.dart';
import 'package:mobile_app/models/store/order_history.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
// import 'package:mobile_app/models/bills.dart';
// import 'package:mobile_app/theme.dart';
// import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/custom_container.dart';

class OrdersDetailScreen extends StatefulWidget{
  const OrdersDetailScreen({super.key, required this.order, required this.total});

  final OrderHistory order;
  final double total;

  @override
  State<OrdersDetailScreen> createState() => _OrdersDetailScreenState();
}

class _OrdersDetailScreenState extends State<OrdersDetailScreen> {
  @override
  Widget build(BuildContext context) {
    final customColors = Theme.of(context).extension<CustomColors>()!;
    

    // Widget status = Container(
    //   padding: EdgeInsets.all(10),
    //   decoration: BoxDecoration(
    //     color: customColors.successful,
    //     borderRadius: BorderRadius.circular(10)
    //   ),
    //   child:Row(
    //     mainAxisSize: MainAxisSize.min, // Wraps content instead of taking full width
    //     children: [
    //       Icon(Icons.check, color: Colors.white,), // Use any icon you want
    //       SizedBox(width: 8), // Spacing between icon and text
    //       Text(formatName(billDetails.status), style: TextStyle(color: Colors.white),),
    //     ],
    //   ),
    // );


    // if(billDetails.status == 'pending'){
    //   status = Container(
    //     padding: EdgeInsets.all(10),
    //     decoration: BoxDecoration(
    //       color: customColors.pending,
    //       borderRadius: BorderRadius.circular(10)
    //     ),
    //     child:Row(
    //       mainAxisSize: MainAxisSize.min, // Wraps content instead of taking full width
    //       children: [
    //         Icon(Icons.hourglass_top, color: Colors.white,), // Use any icon you want
    //         SizedBox(width: 8), // Spacing between icon and text
    //         Text(formatName(billDetails.status), style: TextStyle(color: Colors.white),),
    //       ],
    //     ),
    //   );
    // }

    // if(billDetails.status == 'declined'){
    //   status =  Container(
    //     padding: EdgeInsets.all(10),
    //     decoration: BoxDecoration(
    //       color: customColors.declined,
    //       borderRadius: BorderRadius.circular(10)
    //     ),
    //     child:Row(
    //       mainAxisSize: MainAxisSize.min, // Wraps content instead of taking full width
    //       children: [
    //         Icon(Icons.cancel, color: Colors.white,), // Use any icon you want
    //         SizedBox(width: 8), // Spacing between icon and text
    //         Text(formatName(billDetails.status), style: TextStyle(color: Colors.white),),
    //       ],
    //     ),
    //   );
    // }

    

    return Scaffold(
      appBar: AppBar(
        title: Text('Payment receipt', style: TextStyle(fontSize: 18)),
        


      ),

      body: Padding(
        padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 15),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            // --- Header Section ---
            Center(
              child: Column(
                children: [
                  Icon(Icons.receipt_long,
                      size: 50, color: Theme.of(context).colorScheme.primary),
                  const SizedBox(height: 10),
                  Text(
                    "Payment Receipt",
                    style: Theme.of(context).textTheme.titleLarge!
                        .copyWith(fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 5),
                  Text(
                    "Thank you for your purchase!",
                    style: Theme.of(context).textTheme.bodyMedium!
                        .copyWith(color: Colors.grey[600]),
                  ),
                  const SizedBox(height: 20),
                ],
              ),
            ),

            // --- Payment Details ---
            CustomContainer(
              
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children:  [
                  _ReceiptRow(title: "Status", value: formatName(widget.order.status)),
                  _ReceiptRow(title: "Paid To", value: "SchoolMart Online Store"),
                  _ReceiptRow(title: "Paid By", value: "${formatName(widget.order.userDetails['first_name'])}  ${formatName(widget.order.userDetails['last_name'])}"),
                  _ReceiptRow(title: "Order Date", value: formatDateTime(widget.order.createdAt)),
                ],
              ),
            ),

            const SizedBox(height: 30),

            // --- Order Items ---
            Text("Order Items",
                style: Theme.of(context).textTheme.titleMedium!
                    .copyWith(fontWeight: FontWeight.bold)),
            const SizedBox(height: 10),

            Container(
              padding: const EdgeInsets.symmetric(vertical: 10, horizontal: 12),
              decoration: BoxDecoration(
                borderRadius: BorderRadius.circular(10),
                border: Border.all(color: customColors.lightBorder),
              ),
              child: Column(
                children: [
                  ...widget.order.products.map((data) {
                    return _ItemRow(
                      name: data['name'],
                      qty: data['quantity'],
                      price: data['price'],
                    );
                  }),

                  Divider(),

                  _ItemRow(
                    name: "Total Amount",
                    qty: null,
                    price: widget.total,
                    isTotal: true,
                  ),
                ],
              ),

            ),

            const Spacer(),

            // --- Management Signature ---
            Center(
              child: Column(
                children: [
                  const SizedBox(height: 30),
                  Container(
                    width: 120,
                    height: 1,
                    color: customColors.lightBorder,
                  ),
                  const SizedBox(height: 5),
                  Text(
                    "Management Signature",
                    style: Theme.of(context).textTheme.bodySmall!
                        .copyWith(color: Colors.grey[700]),
                  ),
                ],
              ),
            ),
          ],
        ), 
      ),
      
    );
  }
}






class _ReceiptRow extends StatelessWidget {
  final String title;
  final String value;
  const _ReceiptRow({required this.title, required this.value});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title,
              style: const TextStyle(fontWeight: FontWeight.w500, fontSize: 15)),
          Text(value, style: const TextStyle(fontSize: 15)),
        ],
      ),
    );
  }
}

class _ItemRow extends StatelessWidget {
  final String name;
  final int? qty;
  final double price;
  final bool isTotal;
  const _ItemRow({
    required this.name,
    this.qty,
    required this.price,
    this.isTotal = false,
  });

  @override
  Widget build(BuildContext context) {
    final textStyle = isTotal
        ? const TextStyle(fontWeight: FontWeight.bold, fontSize: 16)
        : const TextStyle(fontSize: 15);

    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 6),
      child: Row(
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Expanded(
            child: Text(name, style: textStyle),
          ),
          if (qty != null)
            Text("x$qty", style: textStyle.copyWith(color: Colors.grey[700])),
          const SizedBox(width: 10),
          Text("₦${formatMoney(price.toStringAsFixed(0))}", style: textStyle),
        ],
      ),
    );
  }
}