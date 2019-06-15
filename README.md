This project has two apps in it, one for exporting your campaign from Roll 20, the other for converting it into a Foundry VTT world.

# R20Exporter

For now, this is how you do it, 
* either install the file r20exporter.js as a Tampermonkey script then follow the instructions below, skipping step 4.
* or just follow these instructions : 

1 - Open R20 campaign in chrome (Make sure you have the latest version of chrome, it will not work in Firefox), 
2 - Wait for it to finish loading the page, 
3 - press Ctrl-Alt-J to open the development console. 
4 - copy-paste the whole r20exporter.js file contents into the development console.
7 - Type : R20Exporter.exportCampaignZip()
8 - Wait for it to parse all the data, could take a few seconds as it downloads all of the assets
9 - Zip file will start downloading once it's done.

While downloading, do make sure you have the campaign tab focused in chrome (separate it in its own window if needed), otherwise the download speed of the zip will drop to very very slow transfer speeds since the javascript that generates the zip on the fly will be running as a low priority background process.

# R20Converter

This is a python script that does the entire conversion from a Roll20 campaign into a Foundry VTT world.
You can run it with `python src/tofvtt.py` and use the --help option to see which options are available.

You first need to give it the name of the directory to which you want it to export the world (don't forget that the directory name needs to be url-friendly, so don't use spaces) then you provide it with the path to the zip file generated by R20Exporter, then the .

I personally run it this way on linux : 

```
./src/tofvtt.py --auto-doors --enable-fog --restrict-movement "my-world" "My R20 campaign.zip"
```

If you are on Windows and use the windows binary, open a command prompt (cmd.exe) and go to the directory where the script is, then run tofvtt.exe with the options you want.

```
C:\Users\kakaroto\Downloads\R20Converter\tofvtt.exe --auto-doors --enable-fog --restrict-movement "my-world" "My R20 campaign.zip"

If you see a "Page '<page name>' doesn't have a recognizable map background" message on the console, don't worry about it, it just means that the background image size does not fit exactly the size of the page itself, the background image will then be placed as a Tile instead.

When the script is done, copy the new directory to the app/resources/public/worlds directory in your FVTT installation