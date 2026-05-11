
import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:mobile_app/auth_service.dart';
import 'package:mobile_app/providers/timetable.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/student/tabs.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/platform_back_button.dart';

class ClassTimeTableScreen extends ConsumerStatefulWidget{
  const ClassTimeTableScreen({super.key});

  @override
  ConsumerState<ClassTimeTableScreen> createState() => _ClassTimeTableScreenState();
}

class _ClassTimeTableScreenState extends ConsumerState<ClassTimeTableScreen> {

  bool _isloading = true;

  @override
  void initState() {
    super.initState();
    _loadAllDetails();

    AuthService.isTokenExpired().then((isExpired){
      if(isExpired) {
        if(!mounted) return;
        context.go('/login');
        AuthService.logout();
      }
    });

  }


  void _loadAllDetails() async {
    setState(() {
      _isloading = true;
    });

    await Future.wait([
      ref.read(timetableProvider.notifier).fetchTimetablePayment(context),

    ]);

    if (!mounted) return;
    setState(() {
      _isloading = false;
    });
  }


    Future<void> _onDownloadFile(url) async{
    showLoadingDialog(context);
    final response = await downloadFile(url);
    if(!mounted) return;
    hideLoadingDialog(context);
    if(response == 'success'){
      showPlatformDialog(context, 'Download Successful', 'The file has been downloaded successfully.', (){
        Navigator.of(context).pop();
      });

    }else{
      showPlatformDialog(context, 'Download Failed', response, (){
        Navigator.of(context).pop();
      });
    }


  
  }




  @override
  Widget build(BuildContext context) {
    
    final GlobalKey<ScaffoldState> scaffoldKey = GlobalKey<ScaffoldState>();
    // final customColors = Theme.of(context).extension<CustomColors>()!;
    final timetable = ref.watch(timetableProvider);

    if (_isloading) {
      return Scaffold(
        body: Center(
          child: Image.asset(
            'assets/image/loading.gif',
            width: 120,
            height: 120,
          ),
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
        title: Text('Class timetable', style: TextStyle(fontSize: 18)),
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

      body:Padding(
        padding: const EdgeInsets.symmetric(vertical: 30, horizontal: 15),
        child: Center(
          child:
            Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [

                Expanded(
                  child: timetable.isEmpty
                      ? Center(
                          child: Column(
                            mainAxisAlignment: MainAxisAlignment.center,
                            children: [
                              Image.asset(
                                'assets/image/404.png',
                                width: 300,
                                height: 300,
                              ),
                              const SizedBox(height: 16),
                              Text(
                                "No timetable available.",
                                textAlign: TextAlign.center,
                                style: Theme.of(context).textTheme.titleMedium,
                              ),
                            ],
                          ),
                        )
                      : ListView.builder(
                          shrinkWrap: true,
                          itemCount: timetable.length,
                          itemBuilder: (context, index) {
                            final item = timetable[index];
                            return InkWell(
                              onTap: (){
                                _onDownloadFile(item.classTimetable);
                              },
                              child: Card(
                                child: Padding(
                                  padding: const EdgeInsets.all(20),
                                  child: Row(
                                    mainAxisAlignment: MainAxisAlignment.center,
                                    children: [
                                      const Icon(Icons.download),
                                      const SizedBox(width: 10),
                                      Text(
                                        'Click here to download ${item.studentClassName} timetable',
                                      ),
                                    ],
                                  ),
                                ),
                              ),
                            );
                          },
                        ),
                )


                
                
              ],
            )
          
        ),
      ),

      bottomNavigationBar: StudentTab(),
      
    );
  }
}