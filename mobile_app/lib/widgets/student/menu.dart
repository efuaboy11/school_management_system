

import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
// import 'package:go_router/go_router.dart';


class MenuBarWidget extends StatefulWidget {
  const MenuBarWidget({super.key});

  @override
  State<MenuBarWidget> createState() => _MenuBarWidgetState();
}

class _MenuBarWidgetState extends State<MenuBarWidget> {
  bool _expandedActivity = false;
  bool isLoading = false;


  void _logout() async{
    final repsonse = await AuthService.logout();

    if(repsonse == 'success'){
      if(!mounted) return;
      context.go('/login');
    }
    
  }


  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: Column(
        children: [
          Container(
            width: double.infinity,
            height: 200,
            decoration: BoxDecoration(
              image: DecorationImage(
                image: AssetImage('assets/image/background3.png'),
                fit: BoxFit.cover
              )
            )

          ),

          Expanded(
            child: ListView(
              // padding: EdgeInsets.all(16),
              children: [
                ListTile(
                  leading: const Icon(Icons.dashboard),
                  title: const Text('Home'),
                  onTap: () {
                    context.go('/student/home');
                  },
                ),

                Theme(
                  data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
                  child: ExpansionTile(
                    initiallyExpanded: _expandedActivity,
                    onExpansionChanged:(value) {
                      setState(() {
                        _expandedActivity = value;
                      });
                    },
                  
                    title: Text(
                      'School Fees'
                    ),

                    leading: Icon(Icons.money),
                    backgroundColor: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),

                  
                    children: [
                      ListTile(
                        leading: const Icon(Icons.bar_chart),
                        title: const Text('History'),
                        onTap: () {
                          context.push('/student/fees-history');
                        },
                      ),
                      ListTile(
                        leading: const Icon(Icons.monetization_on),
                        title: const Text('Pay Fees'),
                        onTap: () {
                          context.push('/student/pay-fees');
                        },
                      ),
                     
                    ],
                  ),
                ),

                Theme(
                  data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
                  child: ExpansionTile(
                    initiallyExpanded: _expandedActivity,
                    onExpansionChanged:(value) {
                      setState(() {
                        _expandedActivity = value;
                      });
                    },
                  
                    title: Text(
                      'Bills'
                    ),

                    leading: Icon(Icons.request_quote),
                    backgroundColor: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),

                  
                    children: [
                      ListTile(
                        leading: const Icon(Icons.show_chart),
                        title: const Text('History'),
                        onTap: () {
                          context.push('/student/bills-history');
                        },
                      ),
                      ListTile(
                        leading: const Icon(Icons.credit_card),
                        title: const Text('Pay Bills'),
                        onTap: () {
                          context.push('/student/bills-payment');
                        },
                      ),
                     
                    ],
                  ),
                ),
                Theme(
                  data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
                  child: ExpansionTile(
                    initiallyExpanded: _expandedActivity,
                    onExpansionChanged:(value) {
                      setState(() {
                        _expandedActivity = value;
                      });
                    },
                  
                    title: Text(
                      'Classroom Activity'
                    ),

                    leading: Icon(Icons.book),
                    backgroundColor: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),

                  
                    children: [
                      ListTile(
                        leading: const Icon(Icons.book),
                        title: const Text('Assignment'),
                        onTap: () {
                          context.push('/student/assignment');
                        },
                      ),

                      ListTile(
                        leading: const Icon(Icons.book_outlined),
                        title: const Text('Assignment Submission'),
                        onTap: () {
                          context.push('/student/assignment-submission');
                        },
                      ),
                      ListTile(
                        leading: const Icon(Icons.calendar_today),
                        title: const Text('Class Timetable'),
                        onTap: () {
                          context.push('/student/class-timetable');
                        },
                      ),
                      ListTile(
                        leading: const Icon(Icons.insert_drive_file),
                        title: const Text('Scheme of Work'),
                        onTap: () {
                          context.push('/student/scheme/select-term');
                        },
                      ),
                    ],
                  ),
                ),

                Theme(
                  data: Theme.of(context).copyWith(dividerColor: Colors.transparent),
                  child: ExpansionTile(
                    initiallyExpanded: _expandedActivity,
                    onExpansionChanged:(value) {
                      setState(() {
                        _expandedActivity = value;
                      });
                    },
                  
                    title: Text(
                      'Notice & Event'
                    ),

                    leading: Icon(Icons.notifications),
                    backgroundColor: Theme.of(context).colorScheme.surfaceContainerHighest.withValues(alpha: 0.5),

                  
                    children: [
                      ListTile(
                        leading: const Icon(Icons.campaign),
                        title: const Text('General Notification'),
                        onTap: () {
                          context.push('/student/notification');
                        },
                      ),
                      ListTile(
                        leading: const Icon(Icons.notifications),
                        title: const Text('Class Notification'),
                        onTap: () {
                          context.push('/student/class-notification');
                        },
                      ),
                      ListTile(
                        leading: const Icon(Icons.event),
                        title: const Text('School Event'),
                        onTap: () {
                          context.push('/student/school-event');
                        },
                      ),
                    ],
                  ),
                ),

                ListTile(
                  leading: const Icon(Icons.bookmark_add_outlined),
                  title: const Text('Check result'),
                  onTap: () {
                    context.push('/student/check-result');
                  },
                ),

                ListTile(
                  leading: const Icon(Icons.store),
                  title: const Text('Store'),
                  onTap: () {
                    context.push('/store/home');
                  },
                ),


                 Container(
                  margin: EdgeInsets.symmetric(horizontal: 15),
                  width: double.infinity,
                  height: 50,
                  child: ElevatedButton(
                    onPressed: _logout,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Theme.of(context).colorScheme.primary,
                      shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                    ),
                    child: isLoading  ? CircularProgressIndicator( color: Colors.white,)  : Text(
                      "Sign out",
                      style: TextStyle(
                        fontSize: 16,
                        color: Colors.white,
                      ),
                    ),
                  ),
                ),
              ],
            )
          )
        ],
      ),
    );
  }
}