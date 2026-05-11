import 'package:flutter/material.dart';

class ResultScoreDetails extends StatelessWidget {
  final String subject;
  final String totalCa;
  final String totalGrade;
  final String exam;
  final String grade;
  final String position;

  const ResultScoreDetails({
    super.key,
    required this.subject,
    required this.totalCa,
    required this.totalGrade,
    required this.exam,
    required this.grade,
    required this.position
  });

  @override
  Widget build(BuildContext context) {
    return DraggableScrollableSheet(
      expand: false,
      builder: (context, scrollController) {
        return Container(
          padding: const EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Theme.of(context).canvasColor,
            borderRadius: const BorderRadius.vertical(top: Radius.circular(20)),
          ),
          child: SingleChildScrollView(
            controller: scrollController,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                // Header line
                Center(
                  child: Container(
                    width: 40,
                    height: 4,
                    margin: const EdgeInsets.only(bottom: 20),
                    decoration: BoxDecoration(
                      color: Colors.grey[400],
                      borderRadius: BorderRadius.circular(2),
                    ),
                  ),
                ),

                // Subject
                Text(
                  subject,
                  style: Theme.of(context).textTheme.titleLarge?.copyWith(fontWeight: FontWeight.bold),
                ),
                const SizedBox(height: 8),

                
                ListTile(
                  title: Text('TOTAL CA'),
                  subtitle: Text('(40%)'),
                  trailing: Text(totalCa),
                ),

                ListTile(
                  title: Text('Exam'),
                  subtitle: Text('(60%)'),
                  trailing: Text(exam),
                ),

                ListTile(
                  title: Text('Total'),
                  subtitle: Text('(100%)'),
                  trailing: Text(totalGrade),
                ),

                ListTile(
                  title: Text('Grade'),
                  trailing: Text(grade),
                ),

                ListTile(
                  title: Text('Position'),
                  trailing: Text(position),
                ),

            
              ],
            ),
          ),
        );
      },
    );
  }
}
