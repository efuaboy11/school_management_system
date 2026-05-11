
import 'package:flutter/material.dart';
import 'package:mobile_app/models/scheme.dart';
import 'package:mobile_app/theme.dart';
import 'package:mobile_app/utils.dart';
import 'package:mobile_app/widgets/student/menu.dart';
import 'package:mobile_app/widgets/platform_back_button.dart';

class SchemeOfWorkScreen extends StatefulWidget{
  const SchemeOfWorkScreen({super.key, required this.schemeDetails,  required this.className});
  final List<Scheme> schemeDetails;
  final String className;

  @override
  State<SchemeOfWorkScreen> createState() => _SchemeOfWorkScreenState();
}

class _SchemeOfWorkScreenState extends State<SchemeOfWorkScreen> {
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
    final customColors = Theme.of(context).extension<CustomColors>()!;
    return Scaffold(
      key: scaffoldKey,
      appBar: AppBar(
        leading: IconButton(
          icon: PlatformBackButton(),
          onPressed: () => Navigator.of(context).pop(),
        ),
        title: Text('Scheme of work', style: TextStyle(fontSize: 18)),
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
              children: [

                Text('Scheme of work for  ${widget.className}', textAlign: TextAlign.center, style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold,),),

                SizedBox(height: 10,),


                Expanded(
                  child: ListView.builder(
                    
                    itemCount: widget.schemeDetails.length,
                    itemBuilder: (ctx, index){
                      final scheme = widget.schemeDetails[index];


                      return Padding(
                        padding: const EdgeInsets.only(bottom: 12),
                        child: InkWell(
                          onTap: (){
                            _onDownloadFile(scheme.scheme);
                          },
                        
                          
                          child: Container(
                            decoration: BoxDecoration(
                              border: Border.all(
                                color: customColors.lightBorder,// border color
                                width: 1.0, // border thickness
                              ),
                              borderRadius: BorderRadius.circular(10), // rounded corners
                              boxShadow: [
                                BoxShadow(
                                  color: Colors.black12,
                                  blurRadius: 8,
                                  offset: Offset(0, 2), // subtle shadow for depth
                                ),
                              ],
                            ),
                            padding: const EdgeInsets.all(15),
                            child: Row(
                              mainAxisAlignment: MainAxisAlignment.spaceBetween,
                              children: [
                                Text(
                                  scheme.subjectName,
                                  style: const TextStyle(fontSize: 16),
                                ),
                                const Icon(Icons.download),
                              ],
                            ),
                          ),

                        ),
                      );
                    },
                  ),
                ),  

              ],
            )
          
        ),
      ),
      
    );
  }
}