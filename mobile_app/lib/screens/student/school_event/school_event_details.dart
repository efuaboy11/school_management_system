

import 'package:flutter/material.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';

class SchoolEventDetails extends StatelessWidget{
  const SchoolEventDetails({super.key,
    required this.title,
    required this.description,
    required this.startDate,
    required this.endDate,

  });

  final String title;
  final String description;
  final String startDate;
  final String endDate;



  @override
  Widget build(BuildContext context) {
        final customColors = Theme.of(context).extension<CustomColors>()!;
    return DraggableScrollableSheet(
      expand: false,
      builder: (context, scrollController){
        return Container(
          padding: EdgeInsets.all(20),
          decoration: BoxDecoration(
            color: Theme.of(context).canvasColor,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),

          ),
          child: SingleChildScrollView(
            controller: scrollController,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Center(
                  child: Container(
                    width: 40,
                    height: 4,
                    margin: const EdgeInsets.only(bottom: 16),
                    decoration: BoxDecoration(
                      color: Colors.grey[400],
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),

                SizedBox(height: 12,),

                Text(formatName(title),
                  style: Theme.of(context).textTheme.headlineSmall!.copyWith(fontWeight: FontWeight.bold), 
                ),

                SizedBox(height: 12,),

                Text(
                  formatName(description),
                  style: Theme.of(context).textTheme.bodyMedium!.copyWith(fontSize: 16),
                ),

                SizedBox(height: 24,),

                Row(
                  children: [
                    Icon(Icons.calendar_today, size: 18, color: customColors.lightText,),
                    SizedBox(width: 8,),
                    Text('from: ${formatDateTime(startDate)}')
                  ],
                ),

                SizedBox(height: 4,),
                    
                Row(
                  children: [
                    Icon(Icons.event, size: 16, color: customColors.lightText,),
                    SizedBox(width: 6,),
                    Text('To: ${formatDateTime(endDate)}')
                  ],
                )

              ],
            ),
          ),
        );
      }
    );
  }
}