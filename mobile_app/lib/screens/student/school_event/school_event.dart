
import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/providers/event.dart';
import 'package:mobile_app/screens/student/school_event/school_event_details.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/student/tabs.dart';
import 'package:mobile_app/widgets/platform_back_button.dart';

class SchoolEventScreen extends ConsumerStatefulWidget{
  const SchoolEventScreen({super.key});

  @override
  ConsumerState<SchoolEventScreen> createState() => _SchoolEventScreenState();
}

class _SchoolEventScreenState extends ConsumerState<SchoolEventScreen> {
  bool _loading = true;
  String? _error;
  final _searchController = TextEditingController();
  Timer? _debounce;

  Future<void> _loadDetails(String query, context) async{
    try{
      final respose = await ref.read(eventProvider.notifier).fetchEvent(query, context);
      if(respose != 'success'){
        _error = respose;
      }
    }finally{
      if(_loading){
        setState(() {
          _loading = false;
        });
      }
      
    }
  }

  @override
  void initState() {
    super.initState();
    AuthService.isTokenExpired().then((isExpired){
      if(isExpired) {
        if(!mounted) return;
        context.go('/login');
        AuthService.logout();
      }
    });

    _loadDetails('', context);
  }

  @override
  void dispose() {
    _searchController.dispose();
    _debounce?.cancel();
    super.dispose();
  }


  @override
  Widget build(BuildContext context) {

    void openDetailsOverlay(String title, String description, String startDate, String endDate) {
      showModalBottomSheet(useSafeArea: true, isScrollControlled: true, context: context, builder: (ctx) => SchoolEventDetails(title: title, description: description, startDate: startDate, endDate: endDate),);
    }
    
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
    final customColors = Theme.of(context).extension<CustomColors>()!;

    Widget content = Center(
      child: Text('Welcome'),
    );

    if(_loading){
      content = Center(
        child: Image.asset(
          'assets/image/loading.gif',
          width: 120,
          height: 120,
        )
      );
    }


    if(_error != null){
      content = Center(child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Image.asset(
            'assets/image/error.png',
            width: 300,
            height: 300,
          ),
          Text("Error: $_error", textAlign: TextAlign.center, style: Theme.of(context).textTheme.bodySmall,),
          SizedBox(height: 15,),
          ElevatedButton.icon(
            icon: Icon(Icons.dashboard),
            label: Text('Home'),
            onPressed: () {
              context.go('/student/home');
            },
          ),

        ],
      ));
    }

    if(!_loading && _error == null){
      content = Padding(
        padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 15),
        child: Column(
          children: [
            TextField(
              controller: _searchController,
              decoration: InputDecoration(
                contentPadding: EdgeInsets.symmetric(vertical: 10.0, horizontal: 12.0),
                hintText: 'Search',
                prefixIcon: Icon(Icons.search),
                border: OutlineInputBorder(
                  borderRadius: BorderRadius.circular(12.0),
                ),               
              ),
              onChanged: (value) {
                if (_debounce?.isActive ?? false) _debounce!.cancel();

                _debounce = Timer(const Duration(milliseconds: 500), () {
                  _loadDetails(value, context);
                });
              },
              style: TextStyle(fontSize: 14.0), // smaller text
            ),

            SizedBox(height: 15,),

            Expanded(
              child: Consumer(
                builder: (context, ref, child) {
                  final eventList = ref.watch(eventProvider);
                  if (eventList.isEmpty) {
                    return  Center(child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Image.asset(
                            'assets/image/404.png',
                            width: 300,
                            height: 300,
                          ),
                          Text("Ooops... search not found!", textAlign: TextAlign.center, style: Theme.of(context).textTheme.titleMedium,),
                          

                        ],
                      )
                    );
                  }

                  
                  return ListView.builder(
                    // shrinkWrap: true,
                    // physics: NeverScrollableScrollPhysics(),
                    itemCount: eventList.length,
                    itemBuilder: (ctx, index){
                      final event = eventList[index];
              
                      return InkWell(
                        onTap: () {
                          openDetailsOverlay(event.title, event.description, event.startDate, event.endDate);
                        },
                        child: Card(
                          margin: EdgeInsets.only(bottom: 16),
                          shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                          child: Padding(
                            padding: EdgeInsetsGeometry.all(16),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Text(formatName(event.title), 
                                  style: Theme.of(context).textTheme.titleMedium!.copyWith(fontWeight: FontWeight.bold),
                                ),
                                SizedBox(height: 8,),
                                Text(formatName(event.description), style: TextStyle(color: customColors.lightText,), overflow: TextOverflow.ellipsis, maxLines: 1,),
                                SizedBox(height: 12,),
                                Row(
                                  children: [
                                    Icon(Icons.calendar_today, size: 16, color: customColors.lightText,),
                                    SizedBox(width: 6,),
                                    Text('From ${formatDateTime(event.startDate)}')
                                  ],
                                ),
                        
                                SizedBox(height: 4,),
                        
                                Row(
                                  children: [
                                    Icon(Icons.event, size: 16, color: customColors.lightText,),
                                    SizedBox(width: 6,),
                                    Text('To: ${formatDateTime(event.endDate)}')
                                  ],
                                )
                              ],
                            ),
                          ),
                        ),
                      );
                    },  
                  );
                },
                
                
              ),
            )
        
          ],
        ),
      );
    }

    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(
        leading: IconButton(
          icon: PlatformBackButton(),
          onPressed: () => context.pop(),
        ),
        title: Text('School Events', style: TextStyle(fontSize: 18)),
        actions: [

          IconButton(
            icon: Icon(Icons.menu,),
            onPressed: () {
              scaffoldKey.currentState?.openDrawer();
            },
          ),
        
        ],
        // backgroundColor: Theme.of(context).colorScheme.primary , // 👈 fully transparent
         // 👈 removes shadow

      ),

      drawer: Drawer(
        child: MenuBarWidget()
      ),

      body:content,

      bottomNavigationBar: StudentTab(),
      
    );
  }
}